var express = require('express');
var app = express();
//const pdfData = require('./Pdf2Txt.js');
const pdfData2 = require('./Pdf2SQL.js');

app.get('/', function (req, res) {
  res.send('Processamento de ficheiros PDF da pasta Input');
  //pdfData;
  pdfData2;  
});

app.listen(3000, function () {
});
