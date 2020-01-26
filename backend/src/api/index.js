const apiImports = [require('./url.js')];

const apis = (app, models) => {
  apiImports.forEach(apiImport => {
    apiImport.default(app, models);
  });
};

export default apis;
