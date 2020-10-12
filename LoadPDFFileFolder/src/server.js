console.log('Server-side code running');

const express = require('express');
const app = express();
const pdfData = require('./Module');
// serve files from the public directory
app.use(express.static('../src'));

var bodyParser = require("body-parser"); 
//Set view engine to ejs
app.set("view engine", "ejs"); 
//Tell Express where we keep our index.ejs
app.set("views", __dirname + "/views"); 
//Use body-parser
app.use(bodyParser.urlencoded({ extended: false })); 

app.listen(3000, function () {
	console.log('listening on 3000');
});

var listadocs=pdfData.filespdffolder();
var listarresultadosPDFLoad=[];
var listarresultados=[];

// serve the homepage
app.get('/', async (req,res) => {
    listarresultados=[];
  listarresultados= await pdfData.resultadosSQL();
    res.render("index.ejs", { listadocs: listadocs, listaresultados: listarresultados, listaresultadosPDF: listarresultadosPDFLoad}); 
});

 
  


// Executar procedimento
app.get('/clicked', async(req,res) => {
    listarresultados=[];
  listarresultadosPDFLoad=[];
  listarresultados= await pdfData.resultadosSQL();
  listarresultadosPDFLoad= await pdfData.resultadosPDFLoad();

  res.render("index.ejs", { listadocs: listadocs, listaresultados: listarresultados, listaresultadosPDF: listarresultadosPDFLoad}); 
   // res.sendStatus(201);
});

