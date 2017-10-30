
var mysql = require('mysql');

var inquirer = require('inquirer');

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'coolidge2',
  database : 'bamazon_db',
});


var order = [];

con.connect(function(err) {

   if (err) {

       console.log('Error connecting to Db');
        // return;
    }else{

       console.log('Online')
        selectTable();
    }
   
});
    


    function selectTable(table) {
      
        console.log('**WELCOME TO BAMAZAON! HAPPY SHOPPING!**');
      
        con.query('SELECT id, product_name, price, stock_quantity FROM  products', function (err, results) {
              //loops through results array
              for (var i = 0; i < results.length ; i++) {
              
           
              var product_id = results[i].id;
              var productName = results[i].product_name;
              var productPrice = results[i].price;
           
            console.log('ID #: ' + product_id + ' Product Name: ' + productName + ' Price: $' + productPrice);

            }
          

           inquirer.prompt([
              { type: "input",
                name: "id",
                message: "Enter ID number of product to purchase.?"
             },
              
              {   type: 'input',
                  name: 'quantity',
                  message: 'How many would you like to purchase?'}

                ]).then(function(data){
                     
                    var id = data.id;
                    var quantity = data.quantity;
                  

                   //make item an obj, to throw in orderArray
                    var item = {};
                    //line 71-75 explains[id-1]
                    var itemName = results[id - 1].product_name;
                    var itemPrice = results[id - 1].price;
                   
                   
  
                    //results is an array. for loop through it
                    // do [id-1] b/c w/o -1, id will not = the resultsArray index
                    //itll make it so the index and id are =
                    //* id # 3 is, index # 2 in resultsArray
                    //[3-1] = index in results Array *
                    if(results[id - 1].stock_quantity - quantity < 0){
                      console.log('Product Out of Stock');
                  
                    } else {
                      //update stock_quantity query 
                      con.query("UPDATE products SET stock_quantity = (stock_quantity - " + quantity + ")WHERE id = " + id, function (error, results){
                      
                        if (error){ 
                          
                          console.log('Error Updating Table')
                        };
                        //record the sale in sales table query
                      con.query("INSERT sales(product_id, quantity_purchased) VALUES(" + id + ", " +quantity + ")", function(error, results){
                       
                        if (error) {

                          console.log('Error Updating Table')
                        };
                      });

                    }); 
                 }  

              
                      //creating keys for item obj. with var above
                      item["item"] = itemName;
                      item["price"] = itemPrice;
                      item["quantity"] = quantity;

                      // console.log(item);
                     
                      //pushing item to order  array
                      order.push(item);
                      contShopping();
             
          });
      });
    };




function contShopping(){
  inquirer.prompt([
  {
    type: 'confirm',
    name: 'contShopping',
    message: 'Ready to chekout?'}  
  ]).then(function(data){

      //if no
      if(!data.contShopping){
        selectTable();
      }else{
        checkout();
      }
  }

  )};


  function checkout(){
  
    for (var i = 0;i< order.length;i++) {

       console.log("Item " + (i + 1) + ": " + order[i].item + " Quantity: " + order[i].quantity + " Price: " + order[i].price);

       var total = (order[i].price * order[i].quantity);
         console.log(total)
    }
   } 
    

/*Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
However, if your store does have enough of the product, you should fulfill the customer's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.
Also insert a record into the sales table with the product_id and quantity purchased and current timestamp*/
