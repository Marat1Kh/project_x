const {Schema, model} = require('mongoose');

const wordSchema = new Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    word: {
        type: String, 
        required: true
    },
    translation: {
        type: String,
        required: true
    },
    definition: {
        type: String,
    },
    meaning: {
        type: String,
    },
    // createAt: {

    // },
    // createBy: {

    // },
    // modifyAt:{

    // },
    // modifyBy:{

    // }
});

const Words = model('words', wordSchema);
module.exports = Words;