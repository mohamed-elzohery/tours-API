const app = require('./app');
const connectDB = require('./DB/connectDB');

const {PORT, HOST} = process.env;

//Start Connection to database
connectDB();

//start server
app.listen(PORT, HOST, () => console.log(`server is runinng on port ${PORT}`))