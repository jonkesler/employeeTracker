var mysql = require("mysql");
var inquirer = require("inquirer");
// var console.table = require("console.table");
const cTable = require("console.table");

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
        "View All Employees by Role",
        "View All Employees by Manager",
        "Add Employee",
        "Add Department",
        "Add Role",
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

      case "View All Employees by Role":
        allRoles();
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

      case "Update Employee Role":
        updateEmployee();
        break;

      // case "Remove Employee":
      //   removeEmployee();
      //   break;

      // case "Update Employee Manager":
      //   updateManager();
      //   break;
      
      // case "View Budget of department":
      //   viewBudget();
      //   break;
      }
    });
}

// ===================================================================
// Functions
// ===================================================================

// function addEmployee (){
//     // query the database for title, department, and managers
//     connection.query("SELECT first_name, last_name, role.title, department.name, role.salary, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id", function(err, results) {
//       if (err) throw err;
//       // once you have the items, prompt the user for options returned
//   inquirer
//     .prompt([
//       {
//         name: "fName",
//         type: "input",
//         message: "What is the employee's first name?"
//       },
//       {
//         name: "lName",
//         type: "input",
//         message: "What is the employee's last name?"
//       },
//       {
//         name: "title",
//         type: "rawlist",
//         choices: function() {
//           var choiceArray = [];
//           for (var i = 0; i < results.length; i++) {
//             choiceArray.push(results[i].title);
//           }
//           return choiceArray;
//         },
//         message: "What will the employee's title be?"
//       },
//       // {
//       //   name: "department",
//       //   type: "rawlist",
//       //   choices: function() {
//       //     var choiceArray = [];
//       //     for (var i = 0; i < results.length; i++) {
//       //       choiceArray.push(results[i].department.id);
//       //     }
//       //     return choiceArray;
//       //   },
//       //   message: "What department will the employee be in?"
//       // },
//       {
//         name: "role_id",
//         type: "input",
//         message: "What is the role ID?"
//       },
//       {
//         name: "department_id",
//         type: "input",
//         message: "What is the department ID?"
//       },
//       {
//         name: "salary",
//         type: "input",
//         message: "What will the employee's salary be?",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       },
//       {
//         name: "manager",
//         type: "rawlist",
//         choices: function() {
//           var choiceArray = [];
//           for (var i = 0; i < results.length; i++) {
//             choiceArray.push(results[i].manager_id);
//           }
//           return choiceArray;
//         },
//         message: "Who will be the employee's manager?"
//       },
//     ])
//     .then(function(answer) {
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(
//         "INSERT INTO employee SET ?",
//         { 
//           first_name: answer.fName,
//           last_name: answer.lName,
//           role_id: answer.role_id,
//           manager_id: answer.manager
//         },
//         function(err) {
//           if (err) throw err;
//         }
//       );
//       connection.query(
//         "INSERT INTO role SET ?",
//         { 
//           title: answer.title,
//           salary: answer.salary,
//           department_id: answer.department_id
//         },
//         function(err) {
//           if (err) throw err;
//           console.log("Your employee was created successfully!");
//           start();
//         }
//       );
//     });
//   })
// }

var addRole = function(){
  // query the database for title, department, and managers
  connection.query("SELECT role.id, role.title, role.salary, department.name, department.id FROM role INNER JOIN department ON role.department_id = department.id", function(err, res) {
    console.log(res);
  // once you have the items, prompt the user for options returned
    inquirer
    .prompt(
      {
      //   name: "rTitle",
      //   type: "input",
      //   message: "What department would you like to add?"
      // },
      // {
      //   name: "rSalary",
      //   type: "input",
      //   message: "What salary would you like to add to that role?"
      // },
      // {
        name: "department",
        type: "rawlist",
        choices: function(value) {
          var choiceArray = [];
          for (var i=0;i<res.length;i++){
            choiceArray.push(res[i].name);
          }
          return choiceArray;
        },
        message: "What Department will this role be for?"
      }).then(function(answer){
        for(var i=0;i<res.length;i++){
        if(res[i].name==answer.choice){
        var chosenName = res[i];
        }
        } 
  }).then(function(answer){
    connection.query(
      "INSERT INTO role SET ? WHERE ?",  
      [{ 
        // title:answer.rtitle},{
        // salary: answer.rSalary},{
        department_id: chosenName.id}],
        function(err,res){
          console.log("Your role was added correctly!");
          start();
        })
    })
  })
  }




