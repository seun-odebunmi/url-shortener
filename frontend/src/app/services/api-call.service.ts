import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { throwError } from "rxjs";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { AppSettings } from "../app.settings";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ApiCallService {
  public baseUrl: string = this.appSettings.baseUrl;

  private contentType = [
    "application/json",
    "application/x-www-form-urlencoded"
  ];

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private appSettings: AppSettings
  ) {}

  formParams(obj) {
    let dataStr = "";
    const newObj = { ...obj };
    Object.keys(newObj).forEach(key => {
      if (newObj[key] === "" || newObj[key] === null) {
        delete newObj[key];
      }
    });

    for (const key in newObj) {
      if (newObj.hasOwnProperty(key)) {
        dataStr +=
          dataStr === "" ? `${key}=${newObj[key]}` : `&${key}=${newObj[key]}`;
      }
    }

    return dataStr;
  }

  public get(path: string, getBody?: any): Observable<any> {
    const actionUrl = this.baseUrl + path,
      headers = new HttpHeaders({ "Content-Type": this.contentType[0] });
    let params = null;

    if (getBody) {
      params = this.formParams(getBody);
    }

    return this.http
      .get(actionUrl, {
        observe: "response",
        headers,
        params
      })
      .map(response => this.extractData(response, "get"))
      .catch(error => this.handleError(error));
  }

  public post(path: string, postBody: any): Observable<any> {
    const actionUrl = this.baseUrl + path,
      headers = new HttpHeaders({
        "Content-Type": this.contentType[0]
      });

    return this.http
      .post(actionUrl, postBody, {
        headers,
        observe: "response"
      })
      .map(response => this.extractData(response, "post"))
      .catch(error => this.handleError(error));
  }

  public put(path: string, putBody: any): Observable<any> {
    const actionUrl = this.baseUrl + path,
      headers = new HttpHeaders({
        "Content-Type": this.contentType[0]
      });

    return this.http
      .put(actionUrl, putBody, {
        headers,
        observe: "response"
      })
      .map(response => this.extractData(response, "put"))
      .catch(error => this.handleError(error));
  }

  public delete(path: string, getBody?: any): Observable<any> {
    const actionUrl = this.baseUrl + path,
      headers = new HttpHeaders({
        "Content-Type": this.contentType[1]
      });
    let params = null;

    if (getBody) {
      params = this.formParams(getBody);
    }

    return this.http
      .delete(actionUrl, {
        observe: "response",
        headers,
        params
      })
      .map(response => this.extractData(response, "delete"))
      .catch(error => this.handleError(error));
  }

  public extractData(res: any, method: string) {
    console.log("res", res);

    if (res.status < 200 || res.status >= 300) {
      throw new Error("This request has failed " + res.status);
    } else {
      const response = res.body; // JSON.parse(res.body)

      if (res.status == 200 || res.status == 201 || res.status == 204) {
        // console.log('res', response)
        if (method !== "get" && response && response.description) {
          this.toastrService.success(response.description);
        }

        return response || {};
      } else {
        if (res.status == 30) {
          // session expired
          setTimeout(() => {
            localStorage.removeItem("currentUser");
            window.location.reload(true);
          }, 1000);
        }
        throw new Error(response.description);
      }
    }
  }

  private handleError(error: any): any {
    // console.dir(error)
    const { networkError } = error;

    if (networkError instanceof HttpErrorResponse) {
      if (Array.isArray(networkError.error.errors)) {
        networkError.error.errors.forEach(({ extensions: { code }, message }) =>
          this.toastrService.error(message)
        );
      }
    }

    if (error instanceof ErrorEvent) {
      const { message } = error.error;
      this.toastrService.error(message);
    } else if (error instanceof HttpErrorResponse) {
      const { message } = error;
      this.toastrService.error(message);
    } else {
      this.toastrService.error(error);
    }

    return throwError(error);
  }
}
