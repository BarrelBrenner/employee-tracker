DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  job_id INT,
  leader_id INT,
  PRIMARY KEY (id),
    -- FOREIGN KEY(job_id)
    -- REFERENCES role(id),
    FOREIGN KEY(leader_id)
    REFERENCES employee(id)

);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Brenner", "Wolf", 218514, 2315);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Raymond", "Beasley", 251192, 1819);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Isaac", "Caulder", 312112, 9419);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Otto", "Morris", 131518, 6121);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Forsythe", "Knight", 615181, 1212);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Gage", "Sharp", 717500, 6211);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Sasha", "Bird", 191198, 8910);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Waylon", "Brothers", 231251, 1452);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Ruben", "Greyfield", 718525, 3118);


CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  subtitle VARCHAR(30) NOT NULL,
  rate DECIMAL NOT NULL,
  branch_id INT,
  PRIMARY KEY (id)
  -- FOREIGN KEY(branch_id)
  -- REFERENCES department(id)
);
insert into role(subtitle, rate, branch_id) values('Scientist', 500000, 1);
insert into role(subtitle, rate, branch_id) values('Guard', 350000, 2);
insert into role(subtitle, rate, branch_id) values('Trader', 475000, 3);
insert into role(subtitle, rate, branch_id) values('Technician', 225000, 4);
insert into role(subtitle, rate, branch_id) values('Boss', 200000, 5);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
insert into department(name)
values ('Research'),
       ('Security'),
       ('Finance'),
       ('Technology'),
       ('Project Lead');