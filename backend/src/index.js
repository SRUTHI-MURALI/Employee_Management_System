import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../connection/connection.js";
import employeeRouter from "../routes/employeeRouter.js"
import loanRouter from "../routes/loanRouter.js"
import generateSalariesRouter from "../routes/generateSalariesRouter.js"
import penaltyRouter from "../routes/penaltyRouter.js";
import reportsRouter from "../routes/reportsRouter.js";
import reportsdetailsRouter from "../routes/reportsdetailsRouter.js";


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
dotenv.config();

connectDB();
const port = process.env.port;

app.use('/employee',employeeRouter)
app.use('/loan',loanRouter)
app.use('/generateSalaries',generateSalariesRouter)
app.use('/penalty',penaltyRouter)
app.use('/reports',reportsRouter)
app.use('/reportsdetails',reportsdetailsRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port);