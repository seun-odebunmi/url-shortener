import { Observable } from "rxjs/Observable";

interface IShortenUrlReturn {
  data: { longUrl: string; code: string };
}

interface IShortenUrlBody {
  url: string;
}

export interface IShortenUrl {
  (body: IShortenUrlBody): Observable<IShortenUrlReturn>;
}
