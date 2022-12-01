import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { routes } from "./routes";

const app = express();
const cors = require('cors');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
});

app.listen(3000, () => console.log("Server is running"));