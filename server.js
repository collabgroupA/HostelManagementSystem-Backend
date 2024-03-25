const express = require('express');
const bodyParser = require('body-parser');

// Importing the main routers
const authRouter = require("./routes/auth.routes");
const roomRouter = require("./routes/room.routes");

const app = express();
const PORT = process.env.PORT || 3000;


//Simulating the database
global.users = []
 

app.use(bodyParser.json());


// Using the main routers.
app.use("/api",authRouter);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
