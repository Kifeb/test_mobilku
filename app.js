import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoute.js"
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/assets', express.static('public/images'))

app.use("/user", userRoutes);

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

app.listen(process.env.APP_PORT, () => {
    console.log('Server Running')
})
