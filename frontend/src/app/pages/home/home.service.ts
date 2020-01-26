import { Injectable } from "@angular/core";

import { ApiCallService } from "../../services/api-call.service";
import { IShortenUrl } from "./home.model";

@Injectable()
export class HomeService {
  constructor(private apiCall: ApiCallService) {}

  public shortenUrl: IShortenUrl = body => {
    return this.apiCall.post("shorten", body).map(res => res.data);
  };
}
