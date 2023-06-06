const express = require("express");
var cors = require('cors')



const app = express();
const userRoute = require("./router/userRouter");
const productRoute = require("./router/productRouter");
const reviewRoute = require("./router/reviewRouter");

const bodyParser = require('body-parser')
const port = 5000;
console.log(process.env.SECRET_KEY);
const db = require("./models/index");
const user = db.User;
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.raw({
    type: 'image/jpg' | 'image/png' | 'image/jpeg'
}))
app.use('/Images', express.static('./Images'))
app.use(cors({ origin: true }));
app.use("/", userRoute);
app.use("/", productRoute);
app.use("/", reviewRoute);
// app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));