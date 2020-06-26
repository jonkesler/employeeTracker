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
        "Update Employee",

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

      case "Update Employee":
        updateEmployee();
        break;
      }
    });
}

// *******************************************************************
// EMPLOYEE
// ===================================================================
// Query  **Just Needs Manager Name not ID***
// ===================================================================
function allEmployees() {
  // need to order by last name
  var query = "SELECT employee.first_name, employee.last_name, employee.manager_id, role.title, department.name, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY employee.last_name";
  connection.query(query, function(err, res) {
    console.table(res);
    start();
  });
} 

// ===================================================================
// Add  **WORKING - Need manager name not Id***
// ===================================================================
function addEmployee (){
  connection.query("SELECT employee.first_name, employee.last_name, employee.manager_id, role.title, department.name, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY employee.last_name", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "fName",
          type: "input",
          message: "What is the employee's first name?"
        },
        {
          name: "lName",
          type: "input",
          message: "What is the employee's last name?"
        },
        {
          name: "title",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].title);
            }
            return choiceArray;
          },
          message: "What will the employee's title be?"
        },
        {
          name: "department",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].name);
            }
            return choiceArray;
          },
          message: "What department will the employee be in?"
        },
        {
          name: "salary",
          type: "input",
          message: "What will the employee's salary be?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "manager",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].manager_id);
            }
            return choiceArray;
          },
          message: "Who will be the employee's manager?"
        },
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO employee SET ?",
          { 
            first_name: answer.fName,
            last_name: answer.lName,
            role_id: answer.role_id || 0,
            manager_id: answer.manager_id || 0
          },
          function(err) {
            if (err) throw err;
            console.log("Your employee was created successfully!");
            start();
          }
        );
      });
    })
  }


// ===================================================================
// Update
// ===================================================================

function updateEmployee (){
    // query the database for title, department, and managers
    connection.query("SELECT first_name, last_name, role.title, department.name, role.salary, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for options returned
  inquirer
    .prompt([
      {
        name: "fName",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "lName",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "role",
        type: "rawlist",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].title);
          }
          return choiceArray;
        },
        message: "What would you like the employee's new role to be?"
      },
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "UPDATE auctions SET ? WHERE ?",
        [
          {
            role_id: answer.role_id,
          },
          {
            id: chosenItem.id
          }
        ],
        function(err) {
          if (err) throw err;
          console.log("The employee's role was updated successfully!");
          start();
        }
      );
    });
  })
}

// *******************************************************************
// MANAGER
// ===================================================================
// Query  **Just Needs Manager Name not ID***
// ===================================================================
function allManager (){
  // Order by Manager ID then Last Name
  var query = "SELECT first_name, last_name, role.title, department.name, role.salary, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY employee.manager_id, employee.last_name";
  connection.query(query, function(err, res) {
    console.table(res);
    start();
  });
} 

// *******************************************************************
// ROLES
// ===================================================================
// Query  **Just Needs Manager Name not ID***
// ===================================================================
function allRoles (){
  // Order by Role.Title then Last Name
  var query = "SELECT first_name, last_name, role.title, department.name, role.salary, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY role.title, employee.last_name";
  connection.query(query, function(err, res) {
    console.table(res);
    start();
  });
} 
// ===================================================================
// Add  **WORKING BUT PUTTING DEPARTMENT NAME NOT ID**
// ===================================================================
function addRole(){
  // query the database for title, department, and managers
  connection.query("SELECT role.id, role.title, role.salary, department.name FROM role INNER JOIN department ON role.department_id = department.id", function(err, results) {
    if (err) throw err;
  // once you have the items, prompt the user for options returned
    inquirer
    .prompt([
      {
        name: "rTitle",
        type: "input",
        message: "What role would you like to add?"
      },
      {
        name: "rSalary",
        type: "input",
        message: "What salary would you like to add to that role?"
      },
      {
        name: "department",
        type: "rawlist",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].name);
          }
          return choiceArray;
        },
        message: "What Department will this role be for?"
      },
  ])
  .then(function(answer) {
    // when finished prompting, insert a new item into the db with that info
    console.log(answer.department)
    connection.query(
      "SELECT * FROM department WHERE ?", {name: answer.department}, function(err, res){
      console.log(res[0].id);
      const dId = (res[0].id);
      console.log(dId);
    },
    )
    // .then(function(){
    connection.query(
      "INSERT INTO role SET ?",
      { 
        title: answer.title,
        salary: answer.salary,
        department_id: answer.dId
      },
      function(err) {
        if (err) throw err;
        console.log("Your role was created successfully!");
        start();
      })
      
    })
    })
  }
  // )}

// *******************************************************************
// DEPARTMENTS
// ===================================================================
// Query  **Just Needs Manager Name not ID***
// ===================================================================
function allDepartment() {
  // Order by department.name then Last Name
  var query = "SELECT first_name, last_name, role.title, department.name, role.salary, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY department.name, employee.last_name";
  connection.query(query, function(err, res) {
    console.table(res);
    start();
  });
} 

// ===================================================================
// Add  **WORKING*****************************************************
// ===================================================================
function addDepartment(){
  inquirer
  .prompt([
    {
      name: "dName",
      type: "input",
      message: "What department would you like to add?"
    },
])
.then(function(answer) {
  // when finished prompting, insert a new item into the db with that info
  connection.query(
    "INSERT INTO department SET ?",
    { 
      name: answer.dName,
    },
    function(err) {
      if (err) throw err;
      console.log("Your department was created successfully!");
      start();
    })
  })
}