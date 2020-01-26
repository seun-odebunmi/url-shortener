import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { PagesComponent } from "./pages.component";

export const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      {
        path: "home",
        loadChildren: () =>
          import("app/pages/home/home.module").then(m => m.HomeModule),
        data: { breadcrumb: "Home" }
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
