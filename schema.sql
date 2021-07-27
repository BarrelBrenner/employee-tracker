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
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Brenner", "Wolf", 1, 1);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Raymond", "Beasley", 2, 1);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Isaac", "Caulder", 3, 1);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Otto", "Morris", 4, 1);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Forsythe", "Knight", 5, 1);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Gage", "Sharp", 4, 1);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Sasha", "Bird", 3, 1);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Waylon", "Brothers", 2, 1);
INSERT INTO employee(first_name, last_name, job_id, leader_id) VALUES ("Ruben", "Greyfield", 1, 1);


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