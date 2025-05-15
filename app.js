const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
const port = 5000;


// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', true);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

app.get('/us-flights', (req, res) => {
  res.render('travel', { title: 'Travel' });
});

app.get('/disclaimer', (req, res) => {
  res.render('disclaimer', { title: 'Disclaimer' });
});

app.get('/privacy-policy', (req, res) => {
  res.render('privacy-policy', { title: 'Privacy Policy' });
});

app.get('/terms-conditions', (req, res) => {
  res.render('terms-conditions', { title: 'Terms & Conditions' });
});

app.get('/cancellation-refund', (req, res) => {
  res.render('cancellation-refund', { title: 'Cancellation & Refund Policy' });
});

app.get('/uk-flights', (req, res) => {
  res.render('ukflights', { title: 'UK Flights' });
});

// Route for sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

app.get('/mexico-flights', (req, res) => {
  res.render('mexicoflight', { title: 'Mexico Flights' });
});



// Autocomplete endpoint
app.get('/api/airports', async (req, res) => {
    try {
        const { keyword } = req.query;
        
        if (!keyword) {
            return res.status(400).json({ error: 'Keyword is required' });
        }

        const response = await amadeus.referenceData.locations.get({
            keyword: keyword,
            subType: 'CITY,AIRPORT'
        });

        const airports = response.data.map(airport => ({
            code: airport.iataCode,
            name: airport.name,
            city: airport.address.cityName,
            country: airport.address.countryName,
            fullName: `${airport.name} (${airport.iataCode}) - ${airport.address.cityName}, ${airport.address.countryName}`
        }));

        res.json(airports);
    } catch (error) {
        console.error('Error fetching airports:', error);
        res.status(500).json({ error: 'Failed to fetch airports' });
    }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 