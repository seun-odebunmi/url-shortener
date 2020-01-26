import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule } from "@angular/http";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgProgressModule } from "@ngx-progressbar/core";
import { NgProgressHttpModule } from "@ngx-progressbar/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { routing } from "./app.routing";
import { AppSettings } from "./app.settings";
import { NotFoundComponent } from "./pages/errors/not-found/not-found.component";
import { AppComponent } from "./app.component";

import { HomeService } from "./pages/home/home.service";
import { ApiCallService } from "./services/api-call.service";
import { LoaderService } from "./services/loader.service";
import { HttpRequestInterceptor } from "./services/http.interceptor";

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ preventDuplicates: true }),
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgProgressModule.withConfig({
      spinnerPosition: "right",
      color: "#DD1B16",
      thick: true
    }),
    NgProgressHttpModule,
    routing
  ],
  providers: [
    AppSettings,
    {
      provide: APP_INITIALIZER,
      useFactory: (appSettings: AppSettings) => () => appSettings.load(),
      deps: [AppSettings],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    ApiCallService,
    ToastrService,
    HomeService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
