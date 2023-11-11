const{
    createWord,
    getWords,
    getWord,
    updateWordById,
    deleteWordById
} = require('../../controllers/words');
const wordRoutes = ( route, options, done)=> {
    route.post('/words', createWord);
    route.get('/words', getWords);
    route.get('/words/:id', getWord);
    route.put('/words/:id', updateWordById);
    route.delete('/words/:id', deleteWordById);

    done();
};
module.exports = wordRoutes;
