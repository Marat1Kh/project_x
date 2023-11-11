const Word = require('../models/words');
const mongoose = require("mongoose");

const createWord = async (req,res) => {
    try{
        const word = await Word.create(req.body);
        res.code(201).send(word);
        return(result);
    } catch(error) {
        console.error(error);
        res.code(500).send({error: "internal server error"});
    }
};
const getWords = async (req, res) => {
    try{
        const word = await Word.find();
        res.code(200).send(word);
        return(result);
    } catch(error){
        console.error(error);
        res.status(500).send({message: 'Error creating the new word'});
    }
};
const getWord = async (req,res) =>{
   try{
    const word = await Word.findById(req.params.id);
    if(!word){
        return res.status(404).json({ message: "Word not found" });
   }
   res.code(200).send(word);
   return(result);
} catch(error){
    console.error(error);
    res.status(500).send({message:"Error getting the word"})
}
};
const updateWordById = async (req, res) =>{
    try{
        const word = await Word.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!word){
            return res.status(404).send({ error: "word not found"});
            }
         res.status(200).send(word);
         return(result);
     }catch(error){
        console.error(error);
        res.status(500).send({error : "internal server error"});
        }
    };
    const deleteWordById = async (req, res)=>{
    try{
        const word = await Word.findByIdAndDelete(req.params.id);
        if(!word){
            return res.status(404).send({ error: "word not found"});
            }
        res.code(204).send();
        return(result);
        }catch(error){
        console.log(error);
        res.status(500).send({error: "internal server error"});
        }
    };
module.exports = {
    createWord,
    getWords,
    getWord,
    updateWordById,
    deleteWordById
}

