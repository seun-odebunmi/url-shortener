import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { AppSettings } from "./app.settings";
import { ISettings } from "./app.settings.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public settings: ISettings;
  constructor(public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    const { skinAccentColor } = this.settings.theme;

    if (skinAccentColor) {
      document.documentElement.style.setProperty(
        "--accent-color",
        skinAccentColor
      );
    }
  }
}
