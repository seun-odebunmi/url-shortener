import { createShortUrlAndInsert } from '../helpers';
import { ENDPOINT } from '../constants';

const urlRoute = (app, models) => {
  app.get('/url/:code', (request, response, next) => {
    const { code } = request.params;

    models.Url.getLongUrl(code)
      .then(result => {
        if (result !== null) {
          response.redirect(result.longUrl);
        } else {
          response.redirect(ENDPOINT);
        }
      })
      .catch(next);
  });

  app.post('/shorten', (request, response, next) => {
    const { url } = request.body;

    createShortUrlAndInsert(url)
      .then(result => {
        response.json({
          data: { longUrl: result.longUrl, shortUrl: `${ENDPOINT}/url/${result.code}` }
        });
      })
      .catch(next);
  });
};

export default urlRoute;
