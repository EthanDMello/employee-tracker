DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  employee_first_name VARCHAR(30) NOT NULL,
  employee_last_name VARCHAR(30) NOT NULL,
  employee_role VARCHAR(30) FOREIGN KEY,
  manager VARCHAR(30) NOT NULL,
  salary INT
);

CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(30) NOT NULL,
  salary INT NOT NULL,
  department_id VARCHAR(30) FOREIGN KEY
);

CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);
