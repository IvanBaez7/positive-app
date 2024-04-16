const http = require('http');
const mysql = require('mysql2');
const cors = require('cors');

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'lorem',
  user: 'lorem',
  password: 'lorem',
  database: 'quotes',
});

// Create HTTP server
const server = http.createServer((req, res) => {
  // Enable CORS for all origins
  cors()(req, res, () => {
    if (req.url === '/randomQuote' && req.method === 'GET') {
      getRandomQuote()
        .then((randomQuote) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(randomQuote));
        })
        .catch((error) => {
          console.error('Error fetching random quote:', error);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
});

// Function to retrieve a random quote from the database
function getRandomQuote() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM bible ORDER BY RAND() LIMIT 1';

    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        const randomQuote = results[0];
        resolve({
          quote: randomQuote.saying,
          verse: randomQuote.verse,
        });
      }
    });
  });
}

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
