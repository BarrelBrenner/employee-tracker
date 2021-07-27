//Here are list of const packages required
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

//This let statement connects with mySQL database for it to recognize & read.
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "IsabellaWilLin12th$",
  database: "employee_tracker",
});

connection.connect((err) => {
  if (err) throw err;

  runSearch();
});

//This function initiates inquirer to start prompts in list format
function runSearch() {
  inquirer.prompt({
      name: "selection",
      type: "list",
      message: "Hello & Welcome to the Employee Tracker Database. Please select an option from list below.",
      choices: [
        "List Of All Employees",
        "Observe Division",
        "Observe Occupation",
        "New Member",
        "New Division",
        "New Occupation",
        "Adjust Occupation",
      ],
    })
    .then(function (answer) {
      console.log(answer);

      if (answer.selection === "List Of All Employees") {
        teamRoster();
      } else if (answer.selection === "Observe Division") {
        showSpecial();
      } else if (answer.selection === "Observe Occupation") {
        showAssign();
      } else if (answer.selection === "New Member") {
        plusRookie();
      } else if (answer.selection === "New Division") {
        plusSpecial();
      } else if (answer.selection === "New Occupation") {
        plusAssign();
      } else if (answer.selection === "Adjust Occupation") {
        designateAssign();
      } else {
        connection.end();
      }
    });
}

//This function allows user to view current employees in the database
function teamRoster() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, employee.job_id, employee.leader_id, role.subtitle, role.rate, role.id, department.id FROM employee LEFT JOIN role ON employee.job_id = role.id LEFT JOIN department ON role.branch_id = department.id",
    function (err, result, fields) {
      if (err) throw err;
      console.table(result);
      runSearch();
    }
  );
}

//This function allows user to view assigned role of employee(s)
function showAssign() {
  connection.query(
    "SELECT role.id, role.subtitle, role.rate, role.branch_id, department.id, department.name FROM role LEFT JOIN department on role.branch_id = department.id",
    function (err, result, fields) {
      if (err) throw err;
      console.table(result);
      runSearch();
    }
  );
}

//This function shows user which department employee(s) work in.
function showSpecial() {
  connection.query("SELECT * FROM department", function (err, result, fields) {
    if (err) throw err;
    console.table(result);
    runSearch();
  });
}

//These let statements fill out roles, employees & department for new/existing members.
let jobSelect = [];
let memberSelect = [];
let divisionSelect = [];

function researchJob() {
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      jobSelect.push(data[i].id + "-" + data[i].subtitle);
    }
  });
}

function researchMember() {
  connection.query("SELECT * FROM employee", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      memberSelect.push(data[i].id + "-" + data[i].first_name + " " + data[i].last_name);
    }
  });
}

function researchDivision() {
  connection.query("SELECT * FROM department", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      divisionSelect.push(data[i].id + "-" + data[i].name);
    }
  });
}

function plusRookie() {
  researchJob();
  researchMember();

  inquirer.prompt([
      {
        name: "first",
        type: "input",
        message: "Please type in employee's first name.",
      },

      {
        name: "last",
        type: "input",
        message: "Please type in employee's last name.",
      },

      {
        name: "job",
        type: "list",
        message: "Please select employee's role from choices below.",
        choices: jobSelect,
      },

      {
        name: "designateFor",
        type: "list",
        message: "Please select employee's manager from choices below.",
        choices: memberSelect,
      },
    ])
    .then(function (answer) {
      let getJobId = answer.job.split("-");
      let getLeaderId = answer.designateFor.split("-");
      let query = `INSERT INTO employee (first_name, last_name, job_id, leader_id)
     VALUES ('${answer.first}','${answer.last}','${getJobId[0]}','${getLeaderId[0]}')`;
      connection.query(query, function (err, res) {
        console.log(`------Employee ${answer.first} ${answer.last} successfully joined the team!------`);
      });
      runSearch();
    });
}

function plusAssign() {
  researchJob();
  researchMember();
  researchDivision();

  inquirer.prompt([
      {
        name: "job",
        type: "input",
        message: "Please type in role you want to see added:",
      },

      {
        name: "branch",
        type: "list",
        message: "Please select department that you would add this role into.",
        choices: divisionSelect,
      },

      {
        name: "rate",
        type: "number",
        message: "Please type in salary rate for role in question:",
      },
    ])
    .then(function (answer) {
      console.log(`${answer.job}`);
      let getBranchId = answer.branch.split("-");
      let query = `INSERT INTO role (subtitle, rate, branch_id)
   VALUES ('${answer.job}','${answer.rate}','${getBranchId[0]}')`;
      connection.query(query, function (err, res) {
        console.log(`------new role of ${answer.job} successfully added!------`);
      });
      runSearch();
    });
}

function plusSpecial() {
  researchJob();
  researchMember();
  researchDivision();

  inquirer.prompt([
      {
        name: "branch",
        type: "input",
        message: "Please type in department you would like to see added:",
      },
    ])
    .then(function (answer) {
      let query = `INSERT INTO department (name)
   VALUES ('${answer.branch}')`;
      connection.query(query, function (err, res) {
        console.log(`------the following department has been successfully added: ${answer.branch}------`);
      });
      runSearch();
    });
}

function designateAssign() {
  connection.query("SELECT * FROM employee", function (err, result) {
    if (err) throw err;
    inquirer.prompt([
        {
          name: "waiverClaim",
          type: "list",

          message: "Please select the following employees that are changing their roles.",
          choices: function () {
            let rosterArray = [];
            result.forEach((result) => {
              rosterArray.push(result.last_name);
            });
            return rosterArray;
          },
        },
      ])

      .then(function (answer) {
        console.log(answer);
        const name = answer.waiverClaim;

        connection.query("SELECT * FROM role", function (err, res) {
          inquirer.prompt([
              {
                name: "job",
                type: "list",
                message: "Please select what their new role will become.",
                choices: function () {
                  let roleArray = [];
                  res.forEach((res) => {
                    roleArray.push(res.subtitle);
                  });
                  return roleArray;
                },
              },
            ])
            .then(function (jobAnswer) {
              const job = jobAnswer.job;
              console.log(job);
              connection.query(
                "SELECT * FROM role WHERE subtitle = ?",
                [job],
                function (err, res) {
                  if (err) throw err;
                  let jobId = res[0].id;

                  let query = "UPDATE employee SET job_id = ? WHERE last_name =  ?";
                  let values = [parseInt(jobId), name];

                  connection.query(query, values, function (err, res, fields) {
                    console.log(`Success! Updated ${name}'s role to ${job}.`);
                  });
                  teamRoster();
                }
              );
            });
        });
      });
  });
}