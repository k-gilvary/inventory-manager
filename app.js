const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Hello'
    });
});

app.listen(3000, () => {
    console.log('server up', 3000);
});