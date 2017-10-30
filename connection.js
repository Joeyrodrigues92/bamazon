var mysql = require('mysql');
var inquirer = require('inquirer');

if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'coolidge2',
	  database : 'beer_db',
	});
};





connection.connect();

function selectTable(table){
	connection.query('SELECT * from ' + table, function (error, results, fields) {
	  if (error) throw error;
	  console.log(results);
	});
}

connection.query('SELECT * from drankers', function (error, results, fields)
{
	console.log(results);
	console.log('\n');

	inquirer.prompt([
	{type: "input",
	  name: "dranker_id",
	  message: "Put the id of the dranker you are."}
	]).then(function(data){
		var dranker = data.dranker_id;

		connection.query('SELECT * from beers', function (error, results, fields) {
			console.log(results);
			console.log('\n');
			inquirer.prompt([
			{type: "input",
			  name: "beer_id",
			  message: "Put the id of the beer that you want."}
			]).then(function(data){
				//do an insert into mysql 
				connection.query('INSERT into dranken_beers SET ?', {
					beer_id : data.beer_id,
					dranker_id : dranker
				}, function (error, results, fields) {
					console.log('insert complete')
				});
			});
		});

	});
});

// function insertIntoTable(name, type, abv, table){
//   connection.query("INSERT INTO " + table + " SET ?", {
//       name: name,
//       type: type,
//       abv: abv
//     }, function(err, res) { console.log('completed!')});
// }

// function deleteFromTable(id, table){
// 	connection.query("DELETE FROM " + table + " WHERE ?", {
// 	    id: id
// 	  }, function(err, res) { 
// 	  	if (err) return console.log(err);
// 	  	console.log('delete completed!')
// 	  });
// }

// //write update function
// function updateTable(id, table){
// 	connection.query("UPDATE " + table + " SET ? WHERE ?", [{
// 		name : 'bruno beer'
// 	  }, {
// 	  	id : id
// 	  }], function(err, res) { 
// 	  	if (err) return console.log(err);
// 	  	console.log('update completed!')
// 	  });
// }

// //write delete function


// // insertIntoTable('beer', 'i dont know beer', 100, 'beers');
// // deleteFromTable(7, 'beers');
// updateTable(1, 'beers');





