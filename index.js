// importing and requiring mysql
import mysql from "mysql2";
import ask from "inquirer";
// import promise mysql2
import mysql2 from "mysql2/promise";

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

// Create a new employee query
const newEmployee = (data) => {
  const sql = `INSERT INTO employee (employee_first_name, employee_last_name, role_id, manager) VALUES (?,?,?,?)`;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error in new employee query", err);
      return;
    }
    console.log("New employee added!");
    mainMenuPrompt();
  });
};

// create new department query
const newDepartment = (data) => {
  const sql = `INSERT INTO departments (department_name) VALUES (?)`;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error in new department query", err, "\n Please try again");
      departmentPrompt();
      return;
    }
    mainMenuPrompt();
  });
};

// create new role query
const newRole = (data) => {
  // create new role
  const sql = `INSERT INTO roles (role_name, salary, department_id) VALUES (?,?,?)`;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log(
        `\n ERROR IN ADDING NEW ROLE`,
        err.code,
        "\n Please try again"
      );
      rolePrompt();
      return;
    }
    console.log("New role added!");
    mainMenuPrompt();
  });
};

// update employee function
const updateEmployeeRole = (data) => {
  const sql = `UPDATE employee SET employee_role = ? WHERE id = ?`;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log(
        "error in updating employee:",
        err.message,
        "\n Please try again"
      );
      updateEmployeeRolePrompt();
    } else {
      console.log("Employee updated.");
      mainMenuPrompt();
    }
  });
};

// function to view all employees
const viewEmployees = () => {
  const sql = `SELECT employee.id, employee.employee_first_name, employee.employee_last_name, roles.role_name, roles.salary, departments.department_name, employee.manager
  FROM employee
  INNER JOIN roles ON employee.role_id = roles.id
  inner join departments on roles.department_id = departments.id ;`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(
        "error in viewing employees:",
        err.message,
        "\n Please try again"
      );
      mainMenuPrompt();
    } else {
      console.table(result);
      mainMenuPrompt();
    }
  });
};

// function to view all roles
const viewRoles = () => {
  const sql = `SELECT * FROM roles;`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(
        "error in viewing roles:",
        err.message,
        "\n Please try again"
      );
      mainMenuPrompt();
    } else {
      console.table(result);
      mainMenuPrompt();
    }
  });
};

// function to view all departments
const viewDepartments = () => {
  const sql = `SELECT * FROM departments;`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(
        "error in viewing departments:",
        err.message,
        "\n Please try again"
      );
      mainMenuPrompt();
    } else {
      console.table(result);
      mainMenuPrompt();
    }
  });
};

// PROMPTS
// prompt function for getting data through inquirer for a new employee
const employeePrompt = () => {
  let roles = [];
  // get all departments
  db.query(`SELECT id, role_name FROM roles;`, (err, result) => {
    if (err) {
      console.log(
        "error in fetching role ids:",
        err.message,
        "\n Please try again"
      );
      mainMenuPrompt();
    }
    result.forEach((roleId) => {
      roles.push(Object.values(roleId).join(" "));
    });
  });
  ask
    .prompt([
      {
        type: "input",
        message: "Please input your employee first name:",
        name: "employee_first_name",
      },
      {
        type: "input",
        message: "Please input your employee last name:",
        name: "employee_last_name",
      },
      {
        type: "list",
        message: "Please choose your employee role id:",
        name: "role_id",
        choices: roles,
      },
      {
        type: "input",
        message: "Please input your employee manager:",
        name: "manager",
      },
    ])
    .then((answers) => {
      const newId = answers.role_id.split(" ");
      answers.role_id = newId[0];
      newEmployee(Object.values(answers));
    })
    .catch((error) => {
      if (error) {
        console.log("Error is making new employee:", error);
      }
      employeePrompt();
    });
};

// new department prompt
const departmentPrompt = () => {
  ask
    .prompt([
      {
        type: "input",
        message: "Please input your new department name:",
        name: "department_name",
      },
    ])
    .then((answers) => {
      newDepartment(Object.values(answers));
    });
};

// new roles prompt
const rolePrompt = () => {
  let departments = [];
  // get all departments
  db.query(`SELECT id, department_name FROM departments;`, (err, result) => {
    if (err) {
      console.log(
        "error in fetching departments:",
        err.message,
        "\n Please try again"
      );
      mainMenuPrompt();
    }
    result.forEach((departmentName) => {
      departments.push(Object.values(departmentName).join(" "));
    });
  });
  ask
    .prompt([
      {
        type: "input",
        message: "Please input your new role name:",
        name: "role_name",
      },
      {
        type: "input",
        message: "Please input your new salary:",
        name: "salary",
      },
      {
        type: "list",
        message: "Please input your new department id:",
        name: "department_id",
        choices: departments,
      },
    ])
    .then((answers) => {
      const newId = answers.department_id.split(" ");
      answers.department_id = newId[0];
      newRole(Object.values(answers));
    });
};

// update employee prompt
async function updateEmployeeRolePrompt() {
  let foundEmployees = [];
  // create the connection
  const connection = await mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db",
  });
  // query database and wait
  const [employees] = await connection.execute(
    `SELECT id, employee_first_name, employee_last_name FROM employee;`
  );
  // format results from query
  employees.forEach((employeeName) => {
    foundEmployees.push(Object.values(employeeName).join(" "));
  });
  console.log(foundEmployees, "before ask");
  ask
    .prompt([
      {
        type: "list",
        message: "Please choose the employee to update:",
        name: "employee_id",
        choices: foundEmployees,
      },
      {
        type: "list",
        message: "Please choose the new employee role:",
        name: "employee_role",
      },
    ])
    .then((data) => {
      updateEmployeeRole(Object.values(data));
    });
}

// main menu prompt
const mainMenuPrompt = () => {
  ask
    .prompt([
      {
        type: "list",
        message:
          "What would you like to do? \n To add employee please add department -> add role -> add employee",
        name: "option",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((response) => {
      switch (response.option) {
        case "View all departments":
          console.log(response.option);
          viewDepartments();
          return;
        case "View all roles":
          console.log(response.option);
          viewRoles();
          break;
        case "View all employees":
          console.log(response.option);
          viewEmployees();
          break;
        case "Add a department":
          console.log(response.option);
          departmentPrompt();
          break;
        case "Add a role":
          console.log(response.option);
          rolePrompt();
          break;
        case "Add an employee":
          console.log(response.option);
          employeePrompt();
          break;
        case "Update an employee role":
          console.log(response.option);
          updateEmployeeRolePrompt();
          break;
      }
    });
};

mainMenuPrompt();

// // Read all movies
// app.get("/api/movies", (req, res) => {
//   const sql = `SELECT id, movie_name AS title FROM movies`;

//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

// // Delete a movie
// app.delete("/api/movie/:id", (req, res) => {
//   const sql = `DELETE FROM movies WHERE id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "Movie not found",
//       });
//     } else {
//       res.json({
//         message: "deleted",
//         changes: result.affectedRows,
//         id: req.params.id,
//       });
//     }
//   });
// });

// // Read list of all reviews and associated movie name using LEFT JOIN
// app.get("/api/movie-reviews", (req, res) => {
//   const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });
