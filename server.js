const path = require("path");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const restaurantRoute = require("./routes/restaurantRoute");
const orderRoute = require("./routes/orderRoute");

const cors=require("cors")
const stripe = require("stripe")("sk_test_51MOH8zSB0s2EMORR2teTn6oEUFDXL7d0QB9pOZMMReYJ3jvzvhj4MLB2SLAelSW9U8ZdkAbngNUWqXhGIdD26cEG00y7bfkZda");

dotenv.config();
const app = express();
mongoose
  .connect("mongodb+srv://sivaram:sivaram@cluster0.tnzuwlu.mongodb.net/restaurant?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to DB"));

app.use(express.json());

app.use(cors())

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/res", restaurantRoute);
app.use("/api/order", orderRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


app.post("/stripe/charge",async(req,res)=>{

const session = await stripe.checkout.sessions.create({
  success_url: 'https://example.com/success',
  cancel_url: 'https://example.com/cancel',
  line_items: [
    {price: 'price_H5ggYwtDq4fbrJ', quantity: 2},
  ],
  mode: 'payment',
});
  console.log(session)
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});