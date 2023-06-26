const express = require("express");
const app = express();
const connectDb = require("./database/connect");
require("dotenv").config();

//parser for json data
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello world" });
});

app.use('/voter' , require('./routes/voter'));
app.use('/admin' , require('./routes/admin'));

//error handler
app.use((err, req, res, next) => {
  res.status(err.status).json({ success: false, msg: err.message });
});


//function to start the server
const start = async () => {
  try {
    await connectDb(process.env.DB_CONNECT);
    app.listen(process.env.PORT, () => {
      console.log("server online...");
    });
  } catch (error) {
    console.log(error);
  }
};
//calling the function to start the server
start();
