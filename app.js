// Get the express package 
const express = require('express');
const mariadb = require('mariadb');

// Instantiate an express (web) app
const app = express();

// Define a port number for the app to listen on
const PORT = 3000;

// Configure the database connection
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'contact'
});

// Connect to the database
async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    } catch (err) {
        console.log('Error connectiong to DB: ' + err);
    }
}

// Tell the app to encode data into JSON format
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Set your view (templating) engine to "EJS"
// (We use a templating engine to create dynamic web pages)
app.set('view engine', 'ejs');

// Define a "default" route, 
app.get('/', (req, res) => {
	// Log message to the server's console
	console.log("Hello, world - server!");

    // Return home page
    res.render('home');
});

// Define a "confirm" route, using the POST method
app.post('/success', async (req, res) => {
    // Get the data from the form that was submitted
    // from the body of the request object
    const data = req.body;

    const conn = await connect();

    // Display the confirm page, pass the data
    await conn.query(`INSERT INTO entries (fname, lname, job, company, 
	linkedin, email, met, message) VALUES ('${data.fname}', '${data.lname}', 
    '${data.job}', '${data.company}', '${data.linkedin}', '${data.email}', 
    '${data.met}', '${data.message}')`);

    res.render('confirmation', { details : data });
})

app.get('/admin', async (req, res) => {
    const conn = await connect();

    const rows = await conn.query(`SELECT * FROM entries ORDER BY date_submitted ASC`);
    
    res.render('entry-summary', { entries : rows });
});

// Tell the app to listen for requests on the designated port
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});
