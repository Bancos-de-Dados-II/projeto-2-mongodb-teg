import Clube from "../model/clube.js";

export async function findAllClubs(req, res){
    try {
        const clube = await Clube.find();
        res.status(200).json(clube);
        
    } catch (error) {
        res.status(400).json({message: "Error a buscar todos os clubes"});
        console.log(error);
    }
}

export async function createClub(req, res){
    try {
        const clube = new Clube(req.body);
        await clube.save();
        res.status(201).json({message: "Clube criado com sucesso"});
        
    } catch (error) {
        res.status(400).json({message: "Error ao tentar criar clube"});
        console.log(error);
    }
}