// ===================================================================
// Query  **Just Needs Manager Name not ID***
// ===================================================================
function allEmployees() {
  // need to order by last name
  var query = "SELECT first_name, last_name, role.title, department.name, role.salary, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY employee.last_name";
  connection.query(query, function(err, res) {
    console.table(res);
    start();
  });
} 

// ===================================================================
// Add
// ===================================================================
function addEmployee (){
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
              choiceArray.push(results[i].department);
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

// ===================================================================
// Delete  **NOT NEEDED***
// ===================================================================

module.exports = employees;