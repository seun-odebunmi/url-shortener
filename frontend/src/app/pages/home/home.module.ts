import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared.module";

import { HomeComponent } from "./home.component";

import { HomeService } from "./home.service";

export const routes = [
  { path: "", component: HomeComponent, pathMatch: "full" }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [HomeComponent],
  providers: [HomeService]
})
export class HomeModule {}
