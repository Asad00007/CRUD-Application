import "dotenv/config"; //inatialixe dotenv
import express, { urlencoded } from "express";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hey there");
});

//Routes file
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
