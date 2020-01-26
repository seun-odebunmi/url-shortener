import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit
} from "@angular/core";
import { AppSettings } from "../app.settings";
import { ISettings } from "../app.settings.model";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class PagesComponent implements OnInit, AfterViewInit {
  public settings: ISettings;
  constructor(public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    document.getElementById("preloader").classList.add("hide");
  }
}
