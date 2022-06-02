const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const { 
    getCompliment,
    getFortuneCookie,
    getFigures,
    deleteFigure,
    createFigure,
    updateFigure
 } = require('./controller')

app.get("/api/compliment/", getCompliment);
app.get("/api/fortune/", getFortuneCookie);
app.get(`/api/figures`, getFigures);
app.delete(`/api/figures/:id`, deleteFigure);
app.post(`/api/figures`, createFigure);
app.put(`/api/figures/:id`, updateFigure);

app.listen(4000, () => console.log("Server running on 4000"));



