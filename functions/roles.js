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
    .then(function(){
    connection.query(
      "INSERT INTO role SET ?",
      { 
        title: answer.title,
        salary: answer.salary,
        department_id: answer.department
      },
      function(err) {
        if (err) throw err;
        console.log("Your department was created successfully!");
        start();
      })
      
    })
    })
  })
  }


// ===================================================================
// Delete  ***NOT NEEDED***
// ===================================================================

module.exports = roles;





// ===================================================================
// saved code
// ===================================================================
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




