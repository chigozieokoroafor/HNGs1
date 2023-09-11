const express = require("express");
const stage1 = require("./stage1/stage1");
const person = require('./stage2/stage2');

const app = express();

app.use(express.json());
app.use("/HNG", stage1);
app.use("/api", person);

app.listen(10000, ()=>{

})