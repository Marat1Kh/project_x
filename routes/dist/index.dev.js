"use strict";

var _require = require('../controllers/words'),
    createWord = _require.createWord,
    getWords = _require.getWords,
    getWord = _require.getWord,
    updateWordById = _require.updateWordById,
    deleteWordById = _require.deleteWordById;

var wordRoutes = function wordRoutes(route, options, done) {
  route.post('/words', words.createWord);
  route.get('/words', words.getWords);
  route.get('/words/:id', words.getWord);
  route.put('/words/:id', words.updateWordById);
  route["delete"]('/words/:id', words.deleteWordById);
  done();
};

module.exports = wordRoutes;