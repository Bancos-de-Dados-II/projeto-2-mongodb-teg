import express from "express";
import * as clubeController from "../controller/clubeController.js";

const route = express.Router();

route.get('/', clubeController.findAllClubs);
route.post('/', clubeController.createClub);
route.delete('/:id', clubeController.deleteClub);


export default route;