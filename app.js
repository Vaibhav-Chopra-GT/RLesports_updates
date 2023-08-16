let express = require('express');
const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser');
const session = require('express-session');
// method override is for edit put requests
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');

let expressLayout = require('express-ejs-layouts');

const connectDB = require("./server/config/db.js")

let app = express();
app.set('view engine', 'ejs');

// specifying that ejs files are in views folder
app.use(expressLayout);
app.set("layout","./layout/main");
app.set("views","./views");

connectDB();
// console.log(process.env.MONGODB_URL)

// for search
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

// for editing that require put requests
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  }));
  

app.listen(3000,"localhost");


app.use("/",require("./server/routes/main.js"))
app.use("/",require("./server/routes/admin.js"))