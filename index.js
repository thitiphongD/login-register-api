const express = require('express');
const routes = require('./routes');
const app =  express();
const port = 8080;
app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server error";
    res.status(error.statusCode).json({
      message: error.message,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
