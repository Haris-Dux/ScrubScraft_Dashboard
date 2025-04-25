
import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import  MongoDBStore  from "connect-mongodb-session";
import session from "express-session";
import router from "./routes/routes.js";

const app = express();

app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    console.log("CORS request from:", origin);
    callback(null, true)
  }
}));

app.use(cookieParser());
app.use(express.json({limit:'100mb'}));
const MongoDBStoreSession = MongoDBStore(session);

const store = new MongoDBStoreSession({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false,
    store:store,
    cookie:{
      secure: 'auto',
      httpOnly:true,
      maxAge:1000 * 60 * 60 * 24,
    }
  }));

  app.get("/",(req, res, ) => {
   return res.status(200).json({method:req.method,origin:req.headers.origin})
  });

  app.use("", router);


mongoose
.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Database Connected");
    app.listen(process.env.PORT,console.log(`Server is running on http://localhost:${process.env.PORT}`))
})
.catch((error)=>{
    console.log(error)
});

