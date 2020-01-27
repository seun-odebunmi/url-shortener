import {
  Component,
  ViewEncapsulation,
  OnInit,
  AfterViewInit
} from "@angular/core";
import { FormGroup, AbstractControl, FormBuilder } from "@angular/forms";
import { HomeService } from "./home.service";
import { LoaderService } from "../../services/loader.service";
import { AppSettings } from "../../app.settings";
import { ISettings } from "../../app.settings.model";
import { trimSpacesValidate } from "../../validators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  public url: AbstractControl;
  public settings: ISettings;

  shortUrl: any;
  displayUrl = false;
  urls = [];

  constructor(
    private homeService: HomeService,
    public appSettings: AppSettings,
    public loaderService: LoaderService,
    fb: FormBuilder
  ) {
    this.settings = this.appSettings.settings;
    this.form = fb.group({
      url: ["", [trimSpacesValidate]]
    });
    Object.keys(this.form.controls).map(key => {
      this[key] = this.form.controls[key];
    });
  }

  public onSubmit(values): void {
    if (this.form.valid) {
      this.homeService.shortenUrl(values).subscribe(response => {
        this.displayUrl = true;
        this.shortUrl = response.shortUrl;
        this.loadUrls();
      });
    }
  }

  loadUrls = () => {
    this.homeService.getUrls().subscribe(response => {
      this.urls = response.data;
    });
  };

  ngOnInit() {
    this.loadUrls();
  }

  ngAfterViewInit() {
    document.getElementById("preloader").classList.add("hide");
  }
}
