import multer from "multer";
import Clube from "../model/clube.js";

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

        // Se geocode for uma string, tenta fazer o parse
        if (typeof geocode === "string") {
            try {
                geocodeObjeto = JSON.parse(geocode);
            } catch (error) {
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
        res.status(400).json({message: "Error ao tentar criar clube"});
    }
}
export async function deleteClub(req, res){
    try {
        const id = req.params.id;
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
        const id = req.params.id;
        const clube = await Clube.findOneAndUpdate({_id:id}, req.body, {new:true})
        res.status(200).json(clube);
    } catch (error) {
        res.status(404).json({message: "Error: Clube não encontrado"});
        
    }
}