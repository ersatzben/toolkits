const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('.'));

// Parse YAML content
app.use(express.text({ type: 'text/yaml' }));

// Get tools.yaml
app.get('/tools.yaml', (req, res) => {
    try {
        if (fs.existsSync('tools.yaml')) {
            const data = fs.readFileSync('tools.yaml', 'utf8');
            res.type('text/yaml').send(data);
        } else {
            res.type('text/yaml').send('tools:\n');
        }
    } catch (err) {
        console.error('Error reading tools.yaml:', err);
        res.status(500).send('Error reading file');
    }
});

// Save tools.yaml
app.put('/tools.yaml', (req, res) => {
    try {
        fs.writeFileSync('tools.yaml', req.body, 'utf8');
        console.log('tools.yaml saved successfully');
        res.send('OK');
    } catch (err) {
        console.error('Error writing tools.yaml:', err);
        res.status(500).send('Error writing file');
    }
});

// Get objectives.yaml
app.get('/objectives.yaml', (req, res) => {
    try {
        if (fs.existsSync('objectives.yaml')) {
            const data = fs.readFileSync('objectives.yaml', 'utf8');
            res.type('text/yaml').send(data);
        } else {
            res.type('text/yaml').send('objectives:\n');
        }
    } catch (err) {
        console.error('Error reading objectives.yaml:', err);
        res.status(500).send('Error reading file');
    }
});

// Save objectives.yaml
app.put('/objectives.yaml', (req, res) => {
    try {
        fs.writeFileSync('objectives.yaml', req.body, 'utf8');
        console.log('objectives.yaml saved successfully');
        res.send('OK');
    } catch (err) {
        console.error('Error writing objectives.yaml:', err);
        res.status(500).send('Error writing file');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Open your browser to http://localhost:3000');
});