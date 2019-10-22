const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
var https = require('https');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.get('/getProducts', (req, res) => {
  const products = require('./libs/products');
  res.send(products);
});

app.get('/convert', async (req, res) => {
  const data = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  res.send({
    price: convert(req.query.price, data['Valute'][req.query.to])
  });
});

app.post('/count', async (req, res) => {
  const data = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  res.send({
    "RUB": req.body.reduce((accum, curr) => accum += +curr.price * +curr.quantity, 0),
    "EUR": req.body.reduce((accum, curr) => accum += convert(+curr.price, data['Valute']["EUR"]) * +curr.quantity, 0),
    "USD": req.body.reduce((accum, curr) => accum += convert(+curr.price, data['Valute']["USD"]) * +curr.quantity, 0),
  });
});

function fetch(url){
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''
      res.on('data', chank => data += chank);
      res.on('end', () => {
        try{
          const parseData = JSON.parse(data);
          resolve(parseData);
        }catch(err){
          reject(Error(err));
        }
      });
    });
  });
}

function convert(price, to){
  if(!to) return price;
  console.log(to.Value);
  
  return price * to.Value;
}
module.exports = app;
