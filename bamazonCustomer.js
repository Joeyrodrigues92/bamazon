
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
        selectTable();
    }
    function selectTable(table) {
      
        console.log('*WELCOME TO BAMAZAON! HAPPY SHOPPING!*');
      
        con.query('SELECT * FROM  products', function (err, results, fields) {
            if (err) throw err;

           console.log('The solution is: ', results);

           inquirer.prompt([
                {type: "input",
                name: "id",
               message: "Enter ID number of product to purchase.?"}
                ]).then(function(data){
               
                   var prod = data.id;
                   console.log(prod);

                }).then(function(){
                inquirer.prompt([
                    {type: 'input',
                     name: 'quantity',
                     message: 'How many would you like to purchase?'}
                     ])
                    
               })
        })
    }
});

