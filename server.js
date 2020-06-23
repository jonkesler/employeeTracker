var mysql = require("mysql");
var inquirer = require("inquirer");
// var console.table = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "etrackerdb"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

// function which prompts the user for what action they would like to make.
function start() {
    inquirer
      .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees by Department",
        "View All Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View All Employees":
        allEmployees();
        break;

      case "View All Employees by Department":
        allDepartment();
        break;

      case "View All Employees by Manager":
        allManager();
        break;

      case "Add Employee":
        addEmployee();
        break;
      
      case "Add Department":
        addDepartment();
        break;

      case "Add Role":
        addRole();
        break;

      // case "Remove Employee":
      //   removeEmployee();
      //   break;

      case "Update Employee Role":
        updateEmployee();
        break;

      // case "Update Employee Manager":
      //   updateManager();
      //   break;

      
      // case "View Budget of department":
      //   viewBudget();
      //   break;
      }
    });
}

function allEmployees() {
    var query = "SELECT first_name, last_name, department.name, role.salary, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id";
    connection.query(query, function(err, res) {
      console.log(res)
      console.table(res, ["first_name:", "last_name:", "role.title:", "department.name"]);
      start();
    });
  } 

function allDepartment (){
  // not working.  try re writing the query and put department table first.
  var query = "SELECT first_name, last_name, department.name, role.salary, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY role.department";
  connection.query(query, function(err, res) {
    console.log(res)
    console.table(res, ["first_name:", "last_name:", "role.title:", "department.name"]);
    start();
  });
}

function allManager (){
  var query = "SELECT first_name, last_name, department.name, role.salary, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY manager_id";
  connection.query(query, function(err, res) {
    console.log(res)
    console.table(res, ["first_name:", "last_name:", "role.title:", "department.name"]);
    start();
  });
}

function addEmployee (){
  var query = "SELECT first_name, last_name, department.name, role.salary, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY manager_id";
  connection.query(query, function(err, res) {
    console.log("Employee added!")
    console.table(res, ["first_name:", "last_name:", "role.title:", "department.name"]);
    start();
  });
}

