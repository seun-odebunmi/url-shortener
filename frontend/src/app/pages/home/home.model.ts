import { Observable } from "rxjs/Observable";

interface IShortenUrlReturn {
  longUrl: string;
  shortUrl: string;
}

interface IShortenUrlBody {
  url: string;
}

export interface IShortenUrl {
  (body: IShortenUrlBody): Observable<IShortenUrlReturn>;
}

interface IUrl {
  shortUrl: string;
  longUrl: string;
}

interface IGetUrlsReturn {
  data: [IUrl];
}

export interface IGetUrls {
  (): Observable<IGetUrlsReturn>;
}
