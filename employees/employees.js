const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());

const skills = [
   { id: 1, name: 'skill1' },
   { id: 2, name: 'skill2' },
   { id: 3, name: 'skill3' },
   { id: 4, name: 'skill4'},
   { id: 5, name: 'skill5' }
];

const employees = [
   {
       id: 1,
       displayName: 'employee1',
       skills: [1, 4],
       img: 'emp1.jpg',
       busy: false
   },
   {
       id: 2,
       displayName: 'employee2',
       skills: [2, 5],
       img: 'emp2.jpg',
       busy: false
   },
   {
       id: 3,
       displayName: 'employee3',
       skills: [3, 2],
       img: 'emp3.jpg',
       busy: false
   },
   {
       id: 4,
       displayName: 'employee4',
       skills: [1, 5],
       img: 'emp4.jpg',
       busy: false
   }
];

app.get('/employees', (req, res) => {
   console.log('Returning employees list');
   res.send(employees);
});

app.get('/skills', (req, res) => {
   console.log('Returning skills list');
   res.send(skills);
});

app.post('/employee/**', (req, res) => {
   const employeeId = req.params[0];
   const foundEmployee = employees.find(subject => subject.id == employeeId);

   if (foundEmployee) {
       for (let attribute in foundEmployee) {
           if (req.body[attribute]) {
               foundEmployee[attribute] = req.body[attribute];
               console.log(`Set ${attribute} to ${req.body[attribute]} in employee: ${employeeId}`);
           }
       }
       res.status(202).header({Location: `http://localhost:${port}/employee/${foundEmployee.id}`}).send(foundEmployee);
   } else {
       console.log(`Employee not found.`);
       res.status(404).send();
   }
});

app.use('/img', express.static(path.join(__dirname,'img')));

console.log(`employees service listening on port ${port}`);
app.listen(port);

