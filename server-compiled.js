"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.get('/', (req, res) => res.json({
  'tutorial': 'Builddddddd REST API with node.js'
}));
app.listen(3000, () => console.log('Node eeeserver listening on port 3000'));
