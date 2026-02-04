const express = require('express');
const path = require('path'); // Add this line
const bodyParser = require('body-parser');
const cors = require('cors');
const { BigQuery } = require('@google-cloud/bigquery');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- ADD THIS: Serve static files from the 'public' directory ---
app.use(express.static(path.join(__dirname, '../public')));

// Your existing API route
app.get('/api/mounika', async (req, res) => {
  // ... existing code ...
});

// --- ADD THIS: Handle Angular routing by serving index.html for all other routes ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`backend listening on ${port}`));
