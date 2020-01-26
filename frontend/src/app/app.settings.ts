import { Injectable, isDevMode } from "@angular/core";

import { ISettings } from "./app.settings.model";

@Injectable()
export class AppSettings {
  public settings: ISettings;
  public title = "urlshortener";
  public baseUrl = "http://localhost:4000/";

  constructor() {}

  public load() {
    return new Promise((resolve, reject) => {
      try {
        this.settings = {
          title: this.title,
          name: this.title,
          theme: {
            skinAccentColor: "#E22628",
            footerIsFixed: true,
            skinType: this.title,
            mainLogoUrl: ""
          }
        };

        resolve(true);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
}
