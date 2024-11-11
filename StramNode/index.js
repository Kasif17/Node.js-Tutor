const express = require('express');
const fs = require('fs');
const status = require('express-status-monitor')
const app = express();


app.use(status())

app.get('/', (req, res) => {
    fs.readFile('simple.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json({ data });
    });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
