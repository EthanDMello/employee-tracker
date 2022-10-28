CREATE DATABASE IF NOT EXISTS employee_db;

USE employee_db;

CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
  employee_first_name VARCHAR(30) NOT NULL,
  employee_last_name VARCHAR(30) NOT NULL,
  job_title VARCHAR(30) NOT NULL,
  department VARCHAR(30) NOT NULL,
  manager VARCHAR(30) NOT NULL,
  salery INT NOT NULL,
);

CREATE TABLE departments(
  id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
  id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL
);
