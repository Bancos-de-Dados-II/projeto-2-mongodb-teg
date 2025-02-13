import express from "express";
import cors from "cors";
import route from "./routes/routes.js";
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/clube', route);

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta: ${port}`);
})