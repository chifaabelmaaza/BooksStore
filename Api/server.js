const app = require('./app');
const mongoose = require('mongoose');
require('dotenv/config')

//Connect To Database

mongoose
    .connect(process.env.DB_Connection)
    .then((con)=> {
        console.log('DB connection Successfully');
    })



// Start the  Server


const port = process.env.PORT
app.listen(port, ()=> {
    console.log(`Application is running on port ${port}`)
})


