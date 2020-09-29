/*
Sript para concretizar a leitura das faturas (PDF's) do Pingo Doce e extrair informação para posteriormente ser analisada

Extração para ficheiro TXT

Desenvolvido por Nuno Lopes 24-09-2020
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
  
    writedatatxt((err) => {
      if (err) return callback(err)
      console.log('Acabou exportação para ficheiros TXT');

    })
  })

}

	
function processpdffiles (done) {
	fs.readdir(src, (err, files) => {	 //ler diretório Input PDF's
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
				let data = pdfParser.getRawTextContent(); //Extrair conteúdo
				let arrayOfLines = data.match(/[^\r\n]+/g); //Separar o conteúdo numa lista por linhas
				let result = data;
				DataLoad = DataLoad + result;
				//Extrair informação que pretendemos tratar Produto, valor, quantidade, preço unitário, etc...
			for (let i = 0 ;i < arrayOfLines.length;++i){
					if ((['E ', 'C ', 'D '].indexOf(arrayOfLines[i].toString().trim().substring(0,2)) >= 0) && (arrayOfLines[i].toString().trim().substring(6).substring(0,1)!=" ")) {
						name= arrayOfLines[i].toString().substring(6,arrayOfLines[i].toString().length-9).trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['\/#!$%\^&\*;:{}=\-_`~()]/g," "); //Devido ao caracter especiais, retirar todos
						IVA=arrayOfLines[i].toString().trim().substring(2,5).replace(',','.').trim();
						qtd=1;
						valunit=0;
						desconto=0;
						if(parseFloat(arrayOfLines[i].toString().substring(arrayOfLines[i].toString().length-9).replace(',','.').trim())>0){ // tudo na mesma linha (unitário)
							Value= arrayOfLines[i].toString().substring(arrayOfLines[i].toString().length-9).trim().replace(',','.');
							valunit=Value;
							descr_desconto=arrayOfLines[i+1].toString().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //Devido ao caracter "ç" normalizar expressão primeiro
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
							descr_desconto=arrayOfLines[i+2].toString().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //Devido ao caracter "ç" normalizar expressão primeiro
							if(descr_desconto.lastIndexOf("Poupanca Imediata") >=0)
							{
								desconto=descr_desconto.substring(descr_desconto.length-9).replace('(',' ').replace(')',' ').replace(',','.').trim();
							}
						}
						valoruni_real=valunit;
						valor_real=Value;

						if (parseFloat(desconto)>0) //Cálcular valor real artigo
						{
							valoruni_real=(parseFloat(Value)-parseFloat(desconto))/parseFloat(qtd);
							valor_real=parseFloat(Value)-parseFloat(desconto);
						}
						
						artigos.push([datacompra,name,IVA, parseFloat(qtd).toFixed(2),parseFloat(valunit).toFixed(2),parseFloat(Value).toFixed(2),parseFloat(desconto).toFixed(2),parseFloat(valoruni_real).toFixed(2),parseFloat(valor_real).toFixed(2)]);

					}
					else if (arrayOfLines[i].toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().lastIndexOf("Data de emissao:") >=0)//Data da compra
					{
						datacompra =arrayOfLines[i].toString().trim().substring(arrayOfLines[i].toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().lastIndexOf("Data de emissao:")+16).trim();
					
						for (var j in artigos) { // atualizar data da compra (uma vez que a mesma está no final do documento)
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

function writedatatxt (done) {
	console.log('Exportar para ficheiros TXT');
	//escrever dois ficheiros: um com a data de interesse para análise, outra com o texto completo.
	fs.writeFileSync('../Output/DataLoadInteresst.txt', artigos.join('\n'), 'binary');
	fs.writeFileSync('../Output/DataLoad.txt', DataLoad, 'binary');
	done()
}



  


