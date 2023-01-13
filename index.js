import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoute.js"
import bodyParser from "body-parser";

//Konfigurasi file .env
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/assets', express.static('public/images'))

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Welcome to My API"
    })
})

// Routes for user
app.use("/api/user", userRoutes);

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

app.listen(process.env.APP_PORT, () => {
    console.log('Server Running')
})
