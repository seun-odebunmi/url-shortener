import {
  Component,
  ViewEncapsulation,
  OnInit,
  AfterViewInit
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormControl,
  AbstractControl,
  FormBuilder
} from "@angular/forms";
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

  returnUrl: string;

  constructor(
    private homeService: HomeService,
    // private route: ActivatedRoute,
    private router: Router,
    public appSettings: AppSettings,
    public loaderService: LoaderService,
    fb: FormBuilder
  ) {
    this.settings = this.appSettings.settings;
    // this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
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
        console.log(response);
      });
    }
  }

  ngOnInit() {
    // if (this.authService.isAuthenticated()) {
    //   this.router.navigateByUrl(this.returnUrl);
    // }
  }

  ngAfterViewInit() {
    document.getElementById("preloader").classList.add("hide");
  }
}
