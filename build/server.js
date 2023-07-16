"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _routes = _interopRequireDefault(require("./routes"));
const app = (0, _express.default)();
app.get('/', (req, res) => {
  res.json({
    message: 'TESTING...'
  });
});
app.use('/', _routes.default);
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${3000}`);
});