import { models } from '../models';
import { generateShortURL } from './urlShortner';

const incrementSize = 6;

const storeUrl = (longUrl, startIndex, endIndex) => {
  const shortCode = generateShortURL(longUrl, startIndex, endIndex);

  return models.Url.createObject(shortCode, longUrl).then(result => {
    const [createdObject, created] = result;

    if (!created && createdObject.dataValues.longUrl !== longUrl) {
      return storeUrl(longUrl, endIndex + 1, endIndex + incrementSize); // use next 6 chars
    }

    return { longUrl: createdObject.dataValues.longUrl, code: createdObject.dataValues.code };
  });
};

export const createShortUrlAndInsert = longUrl => {
  const insertPromise = storeUrl(longUrl, 0, 5);

  return insertPromise.then(result => result);
};
