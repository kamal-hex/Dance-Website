const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const bodyparser = require("body-parser")

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

app.engine('pug', require('pug').__express)
// set the views directory
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

//mongoose schema
var contactschema = new mongoose.Schema({
  name: String,
  Age: String,
  Contact: String,
  emailid: String,
});
var Contact = mongoose.model('Contact', contactschema);

app.get('/', (_req, res)=>{
  const params = {}
  res.status(200).render('home.pug', params);
})
app.get('/contact', (_req, res)=>{
  const params = {}
  res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
  var mydata = new Contact(req.body);
  mydata.save().then(()=>{
   res.send("This item has been saved to the database")
  }).catch(()=>{
     res.status(400).send("Item was not found in database")
  })
  //res.status(200).render('contact.pug');
})
app.listen(port, ()=>
{
  console.log(`The application started successfully on port ${port}`);
})