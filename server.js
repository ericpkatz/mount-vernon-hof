const express = require('express');
const app = express();
const people = require('./people');


app.use((req, res, next)=> {
  console.log(`${req.method} - ${req.url}`)
  next();
});
app.use(express.static('public'));

const port = process.env.PORT || 3000;

app.get('/', (req, res)=> {
  res.send(`
    <html>
      <head>
        <title>Mount Vernon Hall of Fame</title>
        <link rel='stylesheet' href='/styles.css' />
      </head>
      <body>
        <h1>Mount Vernon Hall of Fame</h1>
        <ul>
          ${
            people.map( person => {
              return `<li>
                <a href='/people/${person.id}'>${person.name}</a>
              </li>`;
            }).join('')
          }
        </ul>
      </body>
    </html>
  `);
});

app.get('/people/:id', (req, res) => {
  const person = people.find( person => person.id === req.params.id*1);

  if(person){
    res.send(`
      <html>
        <head>
          <title>Mount Vernon Hall of Fame</title>
          <link rel='stylesheet' href='/styles.css' />
        </head>
        <body>
          <h1>Mount Vernon Hall of Fame</h1>
          <h2>${ person.name}</h2>
          <a href='/'>Back to All People</a>
          <p>
            ${ person.bio }
          </p>
        </body>
      </html>
    `);
  }
  else {
    res.status(404).send(`
      <html>
        <head>
        </head>
        <body>
          No user found for ${req.params.id} <a href='/'>Try Again</a>
        </body>
      </html>
    `);
  }
});

app.listen(port, ()=> {
  console.log(`listening on port ${port}`);
});