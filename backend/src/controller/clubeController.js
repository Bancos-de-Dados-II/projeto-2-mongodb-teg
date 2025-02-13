import Clube from "../model/clube.js";

export async function findAllClubs(req, res){
    try {
        const clubes = await Clube.find();
        res.status(200).json(clubes);
        
    } catch (error) {
        res.status(400).json({message: "Error a buscar todos os clubes"});
        console.log(error);
    }
}

export async function createClub(req, res){
    try {
        const clube = new Clube(req.body);
        await clube.save();
        res.status(201).json({message: "Clube criado com sucesso", clube});
        
    } catch (error) {
        res.status(400).json({message: "Error ao tentar criar clube"});
        console.log(error);
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
        console.log(error);
    }
}
export async function updateClub(req, res){
    try {
        const id = req.params.id;
        await Clube.updateOne({_id: id}, req.body)
        .then(resultado =>{
            if(resultado.modifiedCount > 0){
                res.status(200).json({message: "Clube atualizado com sucesso"});
            }
        })
    } catch (error) {
        res.status(404).json({message: "Error: Clube não encontrado"});
        console.log(error);
        
    }
}