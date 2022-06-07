import "dotenv/config"
import express from "express"
const app = express();
const PORT = process.env.PORT || 8000;

import cors from "cors";
import morgan from "morgan"
import helmet from "helmet"





app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


import { dbCon } from "./src/config/adminDb.js";
dbCon();
import router from "./src/routers/adminRouter.js";
app.use("/api/v1/admin", router);

app.get("/", (req, res) => {

    res.json({
        status: "success",
        message: "you have reached the admin API",
    })
})

//error handling
app.use((error, req, res, next) => {

    res.status(error.status || 400);
    //log in file system or time series db like cloudwatch
    res.json({
        status: "error",
        message: error.message,
    })
})

app.listen(PORT, error => {
    error && console.log(error);

    console.log(`Server is running on port ${PORT}`);
})