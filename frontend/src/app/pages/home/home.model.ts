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
