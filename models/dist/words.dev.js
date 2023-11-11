"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var wordSchema = new Schema({
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
    type: String
  },
  meaning: {
    type: String
  } // createAt: {
  // },
  // createBy: {
  // },
  // modifyAt:{
  // },
  // modifyBy:{
  // }

});
var Words = model('words', wordSchema);
module.exports = Words;