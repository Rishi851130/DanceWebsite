const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const port = 8000;


const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    age: String,
    address: String,
    desc: String,
  });
  const Contact = mongoose.model('Contact', contactSchema);

// For serving static files
app.use('/static', express.static('static'));

// Helps to carry the data from the post to the Express
app.use(express.urlencoded());

// set the tempelate engine as pug
app.set('view engine', 'pug');
// set the views directory
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    const params = {  };
    res.status(200).render("home.pug", params);
});
app.get("/contact", (req, res) => {
    const params = {  };
    res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database!!")
    })
    .catch(()=>{
        res.status(400).send("Item was not saved to the database");
    });
    // res.status(200).render("contact.pug");
});



// Start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port} `);
});