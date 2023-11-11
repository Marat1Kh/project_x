"use strict";

var _require = require('../../controllers/words'),
    createWord = _require.createWord,
    getWords = _require.getWords,
    getWord = _require.getWord,
    updateWordById = _require.updateWordById,
    deleteWordById = _require.deleteWordById;

var wordRoutes = function wordRoutes(route, options, done) {
  route.post('/words', createWord);
  route.get('/words', getWords);
  route.get('/words/:id', getWord);
  route.put('/words/:id', updateWordById);
  route["delete"]('/words/:id', deleteWordById);
  done();
};

module.exports = wordRoutes;