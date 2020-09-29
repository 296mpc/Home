/*
Sript para concretizar a leitura das faturas (PDF's) do Pingo Doce e extrair informa��o para posteriormente ser analisada

Extra��o para Base dados SQL

Desenvolvido por Nuno Lopes 25-09-2020
*/
const PDFParser = require('pdf2json');
const fs = require('fs');
const src = '../Input';
let index = 1;
var DataLoad = "";
var artigos = [];
console.log('Iniciou processamento');
runSequentially();

function runSequentially (callback) {	
	processpdffiles((err) => {
    if (err) return callback(err)
      console.log('Acabou processamento dos PDFs');
  
    writedataSQL((err) => {
      if (err) return callback(err)
      console.log('Acabou exporta��o para BD SQL');

    })
  })

}

	
function processpdffiles (done) {
	fs.readdir(src, (err, files) => {	 //ler diret�rio Input PDF's
		files.forEach(item => {
			let name="";
			let IVA="";
			let Value=0;
			let qtd=1;
			let valunit=0;
			let desconto=0;
			let descr_desconto="";
			let valor_real=0;
			let valoruni_real=0;
			let datacompra ="dd-mm-aaaa";
			var pdfParser = new PDFParser(this, 1);
			pdfParser.loadPDF(`${src}/${item}`); //ler ficheiro PDF
			pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError)); pdfParser.on('pdfParser_dataReady', () => {
				console.log('Leitura do ' + index.toString() + ' ficheiro');
				let data = pdfParser.getRawTextContent(); //Extrair conte�do
				let arrayOfLines = data.match(/[^\r\n]+/g); //Separar o conte�do numa lista por linhas
				let result = data;
				DataLoad = DataLoad + result;
				//Extrair informa��o que pretendemos tratar Produto, valor, quantidade, pre�o unit�rio, etc...
			for (let i = 0 ;i < arrayOfLines.length;++i){
					if ((['E ', 'C ', 'D '].indexOf(arrayOfLines[i].toString().trim().substring(0,2)) >= 0) && (arrayOfLines[i].toString().trim().substring(6).substring(0,1)!=" ")) {
						name= arrayOfLines[i].toString().substring(6,arrayOfLines[i].toString().length-9).trim();
						IVA=arrayOfLines[i].toString().trim().substring(2,5).replace(',','.').trim();
						qtd=1;
						valunit=0;
						desconto=0;
						if(parseFloat(arrayOfLines[i].toString().substring(arrayOfLines[i].toString().length-9).replace(',','.').trim())>0){ // tudo na mesma linha (unit�rio)
							Value= arrayOfLines[i].toString().substring(arrayOfLines[i].toString().length-9).trim().replace(',','.');
							valunit=Value;
							descr_desconto=arrayOfLines[i+1].toString().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //Devido ao caracter "�" normalizar express�o primeiro
							if(descr_desconto.lastIndexOf("Poupanca Imediata") >=0)
							{
								desconto=descr_desconto.substring(descr_desconto.length-9).replace('(',' ').replace(')',' ').replace(',','.').trim();
							}
						}
						else // existem quantidades
						{
							qtd=arrayOfLines[i+1].toString().substring(arrayOfLines[i+1].toString().lastIndexOf("X")-12,arrayOfLines[i+1].toString().lastIndexOf("X")-1).replace(',','.').trim();
							valunit=arrayOfLines[i+1].toString().substring(arrayOfLines[i+1].toString().lastIndexOf("X")+1,arrayOfLines[i+1].toString().lastIndexOf("X")+10).replace(',','.').trim();
							Value=arrayOfLines[i+1].toString().trim().substring(arrayOfLines[i+1].toString().trim().lastIndexOf(",")-9).trim().replace(',','.');
							descr_desconto=arrayOfLines[i+2].toString().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //Devido ao caracter "�" normalizar express�o primeiro
							if(descr_desconto.lastIndexOf("Poupanca Imediata") >=0)
							{
								desconto=descr_desconto.substring(descr_desconto.length-9).replace('(',' ').replace(')',' ').replace(',','.').trim();
							}
						}
						valoruni_real=valunit;
						valor_real=Value;

						if (parseFloat(desconto)>0) //C�lcular valor real artigo
						{
							valoruni_real=(parseFloat(Value)-parseFloat(desconto))/parseFloat(qtd);
							valor_real=parseFloat(Value)-parseFloat(desconto);
						}
						
						artigos.push([datacompra,name,IVA, parseFloat(qtd).toFixed(2),parseFloat(valunit).toFixed(2),parseFloat(Value).toFixed(2),parseFloat(desconto).toFixed(2),parseFloat(valoruni_real).toFixed(2),parseFloat(valor_real).toFixed(2)]);

					}
					else if (arrayOfLines[i].toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().lastIndexOf("Data de emissao:") >=0)//Data da compra
					{
						datacompra =arrayOfLines[i].toString().trim().substring(arrayOfLines[i].toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().lastIndexOf("Data de emissao:")+16).trim();
					
						for (var j in artigos) { // atualizar data da compra (uma vez que a mesma est� no final do documento)
							if (artigos[j][0] == "dd-mm-aaaa") 
							{
								artigos[j][0] = datacompra;
							}
						}
					
					}
				}
				
				console.log('Terminou o ' + index.toString() + ' ficheiro');
				index++;
				if(index>files.length)
				{
					done()
				}					
				
			});
				
		});
		
	});
	
}

function writedataSQL (done) {
	//Conectar ao SQL Server
	var sql = require("mssql/msnodesqlv8");

	// config for your database
	var config = {
		user: 'sa',
		password: 'olamundo123.',
		server: 'Nuno\\SQLEXPRESS2012', 
		database: 'Testes' 
	};
	
	// connect to your database
	sql.connect(config, function (err) {

		if (err) console.log(err);

		// create Request object
		var sqlrequest = new sql.Request();
		
		// query to the database and get the records

		console.log("Exportar dados para Base Dados");
console.log([artigos[1]])
		var sqlquery = "INSERT INTO PingoDoceInvoice (Date,Product,IVA,Qtd,UnitCost,TotalValue,Discount,UnitCostReal,TotalValueReal) VALUES ?";

		sqlrequest.query(sqlquery, [artigos[1]],function (err, resultado) {
			if (err) throw err;
			console.log("Number of records inserted: " + resultado.rowsAffected);
		});
		
	});

	done()

}
