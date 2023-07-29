const fs = require('fs');
const traineeFile = "./trainees.json";

// Read all Trainees
function readAllTrainees(req, res) {
    fs.readFile(traineeFile, 'utf8', (err, data) => {
        if(err) console.log(err);

        // res.send(JSON.stringify(data));
        res.json(data);
    });
}
// readAllTrainees();

// Read specific Trainee by Name/Email
function readTrainee(req, res) {
    fs.readFile(traineeFile, 'utf8', (err, data) => {
        if(err) console.log(err);

        // querystring
            // let qry = req.query;
            // res.send(qry.name + " - " + qry.email);

        // form body / req body (urlencoded)
            // let qry = req.body;
            // res.send(qry.nameTEST + " - " + qry.emailTEST);

        // form body (JSON) / req body (JSON)
            let {name, email} = req.body;
            
            let result = JSON.parse(data);
            let output = result.filter(v => v.name === name && v.email === email);
            (output.length > 0) 
                ?
                res.send(JSON.stringify(output))
                : 
                res.send("No Trainees Found!");
    });
}
// readTrainee("Tony", "tony@gmail.com");

// Add a new Trainee
function addTrainee(req, res) {

    const traineeObj = req.body;

    fs.readFile(traineeFile, 'utf8', (err, data) => {
        if(err) console.log(err);

        let result = JSON.parse(data);
        let output = result.filter(v => v.email === traineeObj.email);
        if(output.length > 0) {
            res.send("Trainee already exists!");
        } else {
            result.push(traineeObj);
            fs.writeFile(traineeFile, JSON.stringify(result), (err) => {
                if(err) console.log(err);
                res.send("Trainee has been created!");
            });
        }
    });
}
// addTrainee("Raju", "raju@gmail.com", "January", "2023", "7-9pm");

// Update a specific Trainee
function updateTrainee(req, res) {
    const traineeObj = req.body;

    fs.readFile(traineeFile, 'utf8', (err, data) => {
        if(err) console.log(err);

        let flag = false;

        let result = JSON.parse(data);
        let traineeData = result.map(v => {
            if(v.email === traineeObj.email) {
                let temp = {...v};
                for(let temp1 in traineeObj) {
                    temp[temp1] = traineeObj[temp1];
                }
                flag = true;
                return temp;
            }
            return v;
        });
        if(flag) {
            fs.writeFile(traineeFile, JSON.stringify(traineeData), (err) => {
                if(err) console.log(err);
                res.send("Trainee has been updated!");
            });
        } else {
            res.send("Trainee not found!");
        }
    });
}
// updateTrainee("Dinesh", "srinanoo@gmail.com", "January", 2023, "7-9pm");

// Delete a specific Trainee
function deleteTrainee(req, res) {
    fs.readFile(traineeFile, 'utf8', (err, data) => {
        if(err) console.log(err);

        const traineeObj = req.body;

        let result = JSON.parse(data);
        let output = result.filter(v => v.email !== traineeObj.email);
        if(output.length < result.length) {
            fs.writeFile(traineeFile, JSON.stringify(output), (err) => {
                if(err) console.log(err);
                res.send("Trainee has been deleted!");
            });
        } else {
            res.send("Trainee not found!");
        }
    });
}
// deleleteTrainee("raju@gmail.com");

module.exports = {
    readAllTrainees,
    readTrainee,
    addTrainee,
    updateTrainee,
    deleteTrainee
}