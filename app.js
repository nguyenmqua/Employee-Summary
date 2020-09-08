const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = []

const questions = [
   {
    type: "input",
    message: "What is your manager's name?",
    name: "managerName"
  },
  {
    type: "input",
    message: "What is manager's ID?",
    name: "managerId"
  },
  {
    type: "input",
    message: "what is your's email",
    name: "email"
  },
  {
    type: "input",
    message: "What is your manger office number?",
    name: "officeNumber"
  },
  {
    type: "list",
    message: "What type of team memeber would like to add?",
    name: "add",
    choices: [
      "Engineer",
      "Intern",
      "Done adding"
    ]
  },
]

const internQuestions = [
  {
    type: "input",
    message: "What is your intern's name?",
    name: "internName"
  },
  {
    type: "input",
    message: "What is intern's ID?",
    name: "internId"
  },
  {
    type: "input",
    message: "what is intern's email",
    name: "internEmail"
  },
  {
  type: "input",
  message: "What school are you attending?",
  name: "school"
},
  {
    type: "list",
    message: "What type of team memeber would like to add?",
    name: "add",
    choices: [
      "Engineer",
      "Intern",
      "Done adding"
    ]
  },
]

const engineerQuestions = [
  {
    type: "input",
    message: "What is your engineer's name?",
    name: "engineerName"
  },
  {
    type: "input",
    message: "What is engineer's ID?",
    name: "engineerId"
  },
  {
    type: "input",
    message: "what is engineer's email",
    name: "engineerEmail"
  },
  {
    type: "input",
    message: "What is engineer's Github username?",
    name: "github"
  },
  {
    type: "list",
    message: "What type of team memeber would like to add?",
    name: "add",
    choices: [
      "Engineer",
      "Intern",
      "Done adding"
    ]
  }
  
]

function promptUser() {
    return inquirer.prompt(questions)
  }

function internPrompt(){
  return inquirer.prompt(internQuestions)
}

function engineerPrompt(){
  return inquirer.prompt(engineerQuestions)
}

async function intern(){
  try {
  const intern = await internPrompt()
  const internInfo = new Intern(intern.internName, intern.internId, intern.internEmail, intern.school)
  employees.push(internInfo)  
  add(intern.add)
  }
  catch(err) {
    console.log(err);
  }
}

async function engineer(){
  try {
  const engineer = await engineerPrompt()
  const engineerInfo = new Engineer(engineer.engineerName, engineer.engineerId, engineer.engineerEmail, engineer.github)
  employees.push(engineerInfo) 
  add(engineer.add)
  }
  catch(err) {
    console.log(err);
  }
}

async function doneAdding(){
  try {
    const data = await render(employees) 
  fs.writeFile(outputPath, data, "utf8", function(err){
    if (err){
      return console.log(err);
    }
    console.log("File Appended")
  });
}
catch(err) {
  console.log(err);
}
}

function add(add){
  switch (add) {
  case "Intern":
   intern()
   break;
  case 'Engineer':
     engineer()
    break;
  case 'Done adding':
    doneAdding()
    break;
  } 
}

async function init(){
    try {
      const manager = await promptUser();
      add(manager.add)
      const managerInfo = new Manager(manager.managerName, manager.managerId, manager.managerEmail, manager.github)
      employees.push(managerInfo)
    } catch(err) {
      console.log(err);
    }
}
 
  init()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
