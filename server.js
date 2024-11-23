import express from "express";
import routes from "./src/routes/postRoutes.js";

const app = express();
app.use(express.static("uploads"));
routes(app);


app.listen(3000, ()=>{
  console.log("Servidor Escutando");
});

app.get("/api", (req, res)=>{
  res.status(200).send("Boas Vindas à Imersão");
});
