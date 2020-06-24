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
  
// ===================================================================
// Add
// ===================================================================


// **NOT NEEDED*******************************************************


// ===================================================================
// Delete
// ===================================================================


// **NOT NEEDED*******************************************************