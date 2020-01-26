import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { NotFoundComponent } from "./pages/errors/not-found/not-found.component";

export const routes: Routes = [
  { path: "", loadChildren: "./pages/pages.module#PagesModule" },
  { path: "**", component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
  useHash: true
});
