const express = require('express');
const app = express();

const people = [
  {
    id: 1,
    name: 'Heavy D',
    bio: 'BIO for Heavy D'
  },
  {
    id: 2,
    name: 'Pete Rock',
    bio: 'BIO for Pete Rock'
  },
  {
    id: 5,
    name: 'Denzel Washington',
    bio: 'BIO for Denzel'
  },
  {
    id: 8,
    name: 'Suzie Esman',
    bio: 'BIO for Suzie'
  }
];

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
});

app.listen(port, ()=> {
  console.log(`listening on port ${port}`);
});