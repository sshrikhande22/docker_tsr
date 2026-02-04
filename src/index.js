const express = require('express');
const path = require('path'); // Required for path resolution
const bodyParser = require('body-parser');
const cors = require('cors');
const { BigQuery } = require('@google-cloud/bigquery');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- ADDED: Serve Angular static files ---
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.get('/api/mounika', async (req, res) => {
  // ... existing BigQuery logic ...
});

// --- ADDED: Fallback to index.html for Angular Routing ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend listening on ${port}`));
