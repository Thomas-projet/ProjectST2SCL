const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());
const employeesService = 'http://localhost:8081';
const tasks = [
  {
      id: 1,
      displayName: 'I am task 1',
      necessarySkills: ['skill1'],
      assignedEmployee: 0
  },
  {
      id: 2,
      displayName: 'I am task 2',
      necessarySkills: ['skill2'],
      assignedEmployee: 0
  },
  {
      id: 3,
      displayName: 'I am task 3',
      necessarySkills: ['skill3'],
      assignedEmployee: 0
  }
];
app.get('/tasks', (req, res) => {
  console.log('Returning tasks list');
  res.send(tasks);
});
app.post('/assignment', (req, res) => {
  request.post({
      headers: {'content-type': 'application/json'},
      url: `${employeesService}/employee/${req.body.employeeId}`,
      body: `{
          "busy": true
      }`
  }, (err, employeeResponse, body) => {
      if (!err) {
          const taskId = parseInt(req.body.taskId);
          const task = tasks.find(subject => subject.id === taskId);
          task.assignedEmployee = req.body.employeeId;
          res.status(202).send(task);
      } else {
          res.status(400).send({problem: `Employee Service responded with issue ${err}`});
      }
  });
});
app.use('/img', express.static(path.join(__dirname,'img')));
console.log(`Tasks service listening on port ${port}`);
app.listen(port);