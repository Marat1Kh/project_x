"use strict";

var Word = require('../models/words');

var mongoose = require("mongoose");

var createWord = function createWord(req, res) {
  var word;
  return regeneratorRuntime.async(function createWord$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Word.create(req.body));

        case 3:
          word = _context.sent;
          res.code(201).send(word);
          return _context.abrupt("return", result);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.code(500).send({
            error: "internal server error"
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var getWords = function getWords(req, res) {
  var word;
  return regeneratorRuntime.async(function getWords$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Word.find());

        case 3:
          word = _context2.sent;
          res.code(200).send(word);
          return _context2.abrupt("return", result);

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).send({
            message: 'Error creating the new word'
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var getWord = function getWord(req, res) {
  var word;
  return regeneratorRuntime.async(function getWord$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Word.findById(req.params.id));

        case 3:
          word = _context3.sent;

          if (word) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Word not found"
          }));

        case 6:
          res.code(200).send(word);
          return _context3.abrupt("return", result);

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).send({
            message: "Error getting the word"
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var updateWordById = function updateWordById(req, res) {
  var word;
  return regeneratorRuntime.async(function updateWordById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Word.findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          }));

        case 3:
          word = _context4.sent;

          if (word) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).send({
            error: "word not found"
          }));

        case 6:
          res.status(200).send(word);
          return _context4.abrupt("return", result);

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).send({
            error: "internal server error"
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var deleteWordById = function deleteWordById(req, res) {
  var word;
  return regeneratorRuntime.async(function deleteWordById$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Word.findByIdAndDelete(req.params.id));

        case 3:
          word = _context5.sent;

          if (word) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).send({
            error: "word not found"
          }));

        case 6:
          res.code(204).send();
          return _context5.abrupt("return", result);

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).send({
            error: "internal server error"
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

module.exports = {
  createWord: createWord,
  getWords: getWords,
  getWord: getWord,
  updateWordById: updateWordById,
  deleteWordById: deleteWordById
};