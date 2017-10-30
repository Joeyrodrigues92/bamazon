var mysql = require('mysql');

var inquirer = require('inquirer');

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'coolidge2',
  database : 'bamazon_db',
});



con.connect(function(err) {

   if (err) {

       console.log('Error connecting to Db');
        // return;
    }else{

       console.log('Online')
       showProducts();
    }
 });   
   
	function showProducts(table){

		console.log('##BAMAZON MANAGER MENU##');

		con.query('SELECT id, product_name, stock_quantity FROM products', function (err, results) {
              //loops through results array
              for (var i = 0; i < results.length ; i++) {
              	
              	var prodId = results[i].id;
              	var prodName = results[i].product_name;
              	var prodStock = results[i].stock_quantity;

              	console.log('Product Id #: ' + prodId + ' | Product Name: ' + prodName + ' | Stock Quantity: ' + prodStock);
				

				if (prodStock < 100){
					console.log('		**LOW INVENTORY**')
					
				}
					
			};
				inquirer.prompt([
		          { type: "input",
		            name: "id",
		            message: "Product ID # to be updated?"
		         },
		          
		          {   type: 'input',
		              name: 'quantity',
		              message: 'NUmber of quantity to be re-stocked?'}

		            ]).then(function(data){
		            console.log(table) 
		            var id = data.id;
		            var quantityNEW = data.quantity;

			            con.query('UPDATE products SET stock_quantity = (stock_quantity + ' + quantityNEW + ' WHERE id = ' + id, function (error, results){
			            	
			            	if (error){ console.log('error')}
			            		return
			            	// console.log(results)
			            	
			            });
		        });
		});	
	};

	
//UPDATE [table] SET [column] = '[updated-value]' WHERE [column] = [value]									
// List a set of menu options:

// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product




