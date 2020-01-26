import { createShortUrlAndInsert } from '../helpers';

const urlApi = (app, models) => {
  app.get('/url/:code', (request, response, next) => {
    const shortUrl = request.params.code;

    models.Url.getLongUrl(shortUrl)
      .then(result => {
        if (result !== null) {
          const { longUrl } = result;
          response.json({ data: { url: longUrl } });
        } else {
          response.json({ data: 'Not Found!' });
        }
      })
      .catch(next);
  });

  app.post('/shorten', (request, response, next) => {
    const longUrl = request.body.url;

    createShortUrlAndInsert(longUrl)
      .then(result => {
        response.json({ data: result });
      })
      .catch(next);
  });
};

export default urlApi;
