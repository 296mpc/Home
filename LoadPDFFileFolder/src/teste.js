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
        var request = new sql.Request();
           
		// query to the database and get the records

		console.log("Connected!");

		var sql = "INSERT INTO PingoDoceInvoice (Date, Product,IVA,Qtd,UnitCost,TotalValue,Discount,UnitCostReal,TotalValueReal) VALUES ?";

		request.query(sql, , function (err, result) 
		{
			if (err) throw err;
			console.log("Number of records inserted: " + result.affectedRows);
		});

        request.query('select * from PingoDoceInvoice', function (err, recordset) {
            
            if (err) console.log(err)

			// send records as a response
			console.log(recordset);
            
        });
	});
	
function runSequentially (callback) {
  fastFunction((err, data) => {
    if (err) return callback(err)
    console.log(data)   // results of a
  
    slowFunction((err, data) => {
      if (err) return callback(err)
      console.log(data) // results of b
  
      // here you can continue running more tasks
    })
  })
}
