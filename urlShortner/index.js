const express = require("express");
const path = require('path');
const { connectToMongoDB } = require("./connection");
const URL = require("./models/url");
const cookieParser = require('cookie-parser')
const { restrictToLoggedinUserOnly, chechAuth } = require('./middlewares/auth')

const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter');
const userRouter = require('./routes/user')

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb+srv://developer786kasif:9794975553@cluster0.wqbnhut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.error("Failed to connect to MongoDB", err));

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use("/url",restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRouter)
app.use('/', chechAuth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId; 

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true } // Return the updated document
    );

    if (!entry) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error('Error finding URL:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
