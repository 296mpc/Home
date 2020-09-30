var express = require('express');
var app = express();
const pdfData = require('./Module');

app.get('/', function (req, res) {
  pdfData;
  res.send(pdfData.resultadoresposta);
});

app.listen(3000, function () {
});
