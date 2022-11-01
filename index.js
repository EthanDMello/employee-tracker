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
  const sql = `INSERT INTO employee (employee_first_name, employee_last_name, job_title, department, manager, salary) VALUES (?,?,?,?,?,?)`;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error in new employee query", err);
      return;
    }
    console.log("data added:", result);
  });
};

const newDepartment = (data) => {
  const sql = `INSERT INTO employee (employee_first_name, employee_last_name, job_title, department, manager, salary) VALUES (?,?,?,?,?,?)`;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log("error in new employee query", err);
      return;
    }
    console.log("data added:", result);
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
        message: "Please input your employee job title:",
        name: "job_title",
      },
      {
        type: "input",
        message: "Please input your employee department:",
        name: "department",
      },
      {
        type: "input",
        message: "Please input your employee manager:",
        name: "manager",
      },
      {
        type: "input",
        message: "Please input your employee salary:",
        name: "salary",
      },
    ])
    .then((answers) => {
      newEmployee(Object.values(answers));
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
      } else {
        console.log("Something else went wrong");
      }
    });
};

// main menu prompt
const mainMenu = () => {
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
      }
    });
};

mainMenu();

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

// // BONUS: Update review name
// app.put("/api/review/:id", (req, res) => {
//   const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//   const params = [req.body.review, req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "Movie not found",
//       });
//     } else {
//       res.json({
//         message: "success",
//         data: req.body,
//         changes: result.affectedRows,
//       });
//     }
//   });
// });
