const express = require("express");
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express()
const Port = 8000;

// //Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//PUT endpoint for creating new user
app.put('/api/user/create', (req, res) => {
    const newUser = req.body;
    console.log(newUser.user_name)
    console.log(newUser.password)
    const data = fs.readFileSync('./MOCK_DATA.json', 'utf8');
    let users = JSON.parse(data)
    users.push(newUser)
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, newUser) => {
        return res.json ({status: "user created"})
    })
});


// POST endpoint for user login
app.post('/api/user/login', (req, res) => {
    const data = req.body;
    console.log(data.user_name)
    console.log(data.password)
    

    const mock_file = fs.readFileSync('./MOCK_DATA.json', 'utf8');
    let mockData = JSON.parse(mock_file)
    // Check if user_name exists in MOCK_DATA.json
    const user = mockData.find(user => user.user_name === data.user_name && user.password === data.password);
    
    if (user) {
        res.json({ success: 'login' });
    } else {
        res.json({ fail: 'not a user' });
    }
});

app.listen(Port, () => console.log(`Server started at PORT: ${Port}`))
