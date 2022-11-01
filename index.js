// importing and requiring mysql
// const mysql = require("mysql2");
import mysql from "mysql2";
// const ask = require("inquirer");
import ask from "inquirer";

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

// Create a new employee in database
const newEmployee = (data) => {
  const sql = `INSERT INTO employee (employee_first_name, employee_last_name, employee_role, manager) VALUES (?,?,?,?)`;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error in new employee query", err);
      return;
    }
  });
};

const newDepartment = (data) => {
  const sql = `INSERT INTO departments (department_name) VALUES (?)`;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error in new department query", err);
      return;
    }
  });
};

const newRole = (data) => {
  const sql = `INSERT INTO roles (employee_first_name, salary, department_name) VALUES (?,?,?)`;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log(`\n ERROR IN ADDING NEW ROLE`, err.code);
      return;
    }
  });
};

// update employee function
const updateEmployeeRole = (data) => {
  const sql = `UPDATE employee SET employee_role = ? WHERE id = ?`;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error in updating employee:", err.message);
    } else {
      console.log("Employee updated.");
    }
  });
};

const employeeData = [
  "Ethan",
  "DMello",
  "Fullstack Dev",
  "deez",
  "Neha",
  25000,
];

// prompt function for getting data through inquirer for a new employee
const employeePrompt = () => {
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
        type: "input",
        message: "Please input your employee role:",
        name: "employee_role",
      },
      {
        type: "input",
        message: "Please input your employee manager:",
        name: "manager",
      },
    ])
    .then((answers) => {
      newEmployee(Object.values(answers));
      console.log("New employee added!");
      mainMenuPrompt();
    })
    .catch((error) => {
      if (error) {
        console.log("Prompt couldn't be rendered in the current environment");
      } else {
        console.log("Something else went wrong");
      }
      mainMenuPrompt();
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
      mainMenuPrompt();
    });
};

// new roles prompt
const rolePrompt = () => {
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
        type: "input",
        message: "Please input your new department name:",
        name: "department_name",
      },
    ])
    .then((answers) => {
      newRole(Object.values(answers));
      mainMenuPrompt();
    });
};

// update employee prompt
const updateEmployeeRolePrompt = () => {
  ask
    .prompt([
      {
        type: "input",
        message: "Please input the new employee role:",
        name: "employee_role",
      },
      {
        type: "input",
        message: "Please input the employee id:",
        name: "employee_id",
      },
    ])
    .then((data) => {
      updateEmployeeRole(Object.values(data));
      mainMenuPrompt();
    });
};

// main menu prompt
const mainMenuPrompt = () => {
  ask
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
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
          return;
        case "View all roles":
          console.log(response.option);
          break;
        case "View all employees":
          console.log(response.option);
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
