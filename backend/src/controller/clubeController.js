import multer from "multer";
import mongoose from 'mongoose';

import Clube from "../model/clube.js";

function convertToUUID(hexString) {
  let paddedHex = hexString.padEnd(32, '0');
  return `${paddedHex.slice(0, 8)}-${paddedHex.slice(8, 12)}-${paddedHex.slice(12, 16)}-${paddedHex.slice(16, 20)}-${paddedHex.slice(20, 32)}`;
}

export async function findByIdClub(req, res){
    try {
        const id = req.params.id;
        const clube = await Clube.findById(id);
        res.status(200).json(clube);
        
    } catch (error) {
        res.status(404).json({message: "Error: clube não encontrado"});
    }
}

export async function findAllClubs(req, res){
    try {
        const clubes = await Clube.find();
        res.status(200).json(clubes);
        
    } catch (error) {
        res.status(400).json({message: "Error a buscar todos os clubes"});
    }
}

export async function createClub(req, res){
    try {
        const {id, nome, tecnico, nomeCurto, anoFundacao, estadio, liga,
            nomeLocalizacao, pais, titulos, rivais, geocode, imageurl } = req.body;
        
        let geocodeObjeto = null;

    console.log("-------------------------------------")
    console.log(req.body)
    console.log("-------------------------------------")

        // Se geocode for uma string, tenta fazer o parse
        if (typeof geocode === "string") {
            try {
                geocodeObjeto = JSON.parse(geocode);
            } catch (error) {
              console.log("here")
                return res.status(400).json({ error: "Formato de geocode inválido" });
            }
        } else if (typeof geocode === "object" && geocode !== null) {
            geocodeObjeto = geocode; // geocode já é um objeto, então não precisa de parse
        }
        const clube = new Clube({
            id,
            nome,
            imageurl,
            tecnico,
            nomeCurto,
            anoFundacao,
            estadio,
            liga,
            nomeLocalizacao,
            pais,
            titulos, 
            rivais,
            geocode: geocodeObjeto
        });
        await clube.save();
        res.status(201).json(clube);
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Error ao tentar criar clube"});
    }
}
export async function deleteClub(req, res){
    try {
        let id = req.params.id;
        id = id.trim()
        await Clube.deleteOne({_id: id})
        .then(resultado =>{
            if(resultado.deletedCount > 0){
               res.status(200).json({message: "Clube deletado com sucesso"});
               return;
            }
         })
    } catch (error) {
        res.status(404).json({message: "Error: Clube não encontrado"});
    }
}

export async function updateClub(req, res){
    try {
        let id = req.params.id;
        const objectId = new mongoose.Types.ObjectId(id);
        req.body._id = undefined
        req.body.id = undefined
        const clube = await Clube.findOneAndUpdate({_id:objectId}, req.body, {new:true})
        res.status(200).json(clube);
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Error: Clube não encontrado"});
        
    }
}
