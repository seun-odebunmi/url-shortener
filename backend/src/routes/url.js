import { createShortUrlAndInsert } from '../helpers';
import { ENDPOINT } from '../config/config';

const urlRoute = (router, models) => {
  router.get('/url/:code', (request, response, next) => {
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

  router.post('/shorten', (request, response, next) => {
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
