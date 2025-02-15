import express from "express";
import * as clubeController from "../controller/clubeController.js";
import {upload} from "../config/multer.js";

const route = express.Router();

route.get('/', clubeController.findAllClubs);
route.post('/', upload.single("file"), clubeController.createClub);
route.delete('/:id', clubeController.deleteClub);
route.put('/:id', clubeController.updateClub);


export default route;