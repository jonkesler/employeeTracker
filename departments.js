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
// Add  **WORKING**
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
        console.table(res);
        console.log("Your department was created successfully!");
        start();
      })
    })
  }

// ===================================================================
// Delete
// ===================================================================
