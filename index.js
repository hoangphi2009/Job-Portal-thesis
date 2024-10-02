import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
dotenv.config({});
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extendedL:true}));
app.use(cookieParser());

// app.get("/home", (req, res) => {
//     return res.status(200).json({
//         message: "Welcome to home page",
//         success: true
//     });
// });
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
// api
app.use("/api/v1/user", userRoute);

app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is listening at port ${PORT}`);
})
