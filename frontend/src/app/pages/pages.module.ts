import { NgModule } from "@angular/core";
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from "ngx-perfect-scrollbar";
import { SharedModule } from "./shared.module";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { routing } from "./pages.routing";
import { PagesComponent } from "./pages.component";
import { FooterComponent } from "../theme/components/footer/footer.component";

@NgModule({
  imports: [routing, SharedModule],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  declarations: [PagesComponent, FooterComponent]
})
export class PagesModule {}
