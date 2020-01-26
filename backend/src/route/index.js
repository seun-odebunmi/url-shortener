const routeImports = [require('./url.js')];

const routes = (app, models) => {
  routeImports.forEach(routeImport => {
    routeImport.default(app, models);
  });
};

export default routes;
