"use strict";

fastify.register(require('fastify-cors')); // Route to create a new entry

fastify.post('/thesaurus', function _callee(request, reply) {
  var _request$body, russianWord, translation, definition, meaning, db, collection, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _request$body = request.body, russianWord = _request$body.russianWord, translation = _request$body.translation, definition = _request$body.definition, meaning = _request$body.meaning;
          db = client.db(dbName);
          collection = db.collection('words_db');
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(collection.insertOne({
            russianWord: russianWord,
            translation: translation,
            definition: definition,
            meaning: meaning
          }));

        case 6:
          result = _context.sent;

          if (result.result.ok === 1) {
            reply.send(result.ops[0]);
          } else {
            reply.status(500).send({
              error: 'Failed to insert document'
            });
          }

          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          console.error('MongoDB error:', _context.t0);
          reply.status(500).send({
            error: 'Failed to insert document'
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 10]]);
}); // Route to get all entries

fastify.get('/thesaurus', function _callee2(request, reply) {
  var db, collection, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          db = client.db(dbName);
          collection = db.collection('words_db');
          _context2.next = 4;
          return regeneratorRuntime.awrap(collection.find().toArray());

        case 4:
          result = _context2.sent;
          reply.send(result);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // Route to get a specific entry by ID

fastify.get('/thesaurus/:id', function _callee3(request, reply) {
  var id, db, collection, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = request.params.id;
          db = client.db(dbName);
          collection = db.collection('thesaurus');
          _context3.next = 5;
          return regeneratorRuntime.awrap(collection.findOne({
            _id: new MongoClient.ObjectId(id)
          }));

        case 5:
          result = _context3.sent;

          if (!result) {
            reply.status(404).send({
              error: 'Entry not found'
            });
          } else {
            reply.send(result);
          }

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // Route to update an entry by ID

fastify.put('/thesaurus/:id', function _callee4(request, reply) {
  var id, _request$body2, russianWord, translation, definition, meaning, db, collection, result;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = request.params.id;
          _request$body2 = request.body, russianWord = _request$body2.russianWord, translation = _request$body2.translation, definition = _request$body2.definition, meaning = _request$body2.meaning;
          db = client.db(dbName);
          collection = db.collection('words_db');
          _context4.next = 6;
          return regeneratorRuntime.awrap(collection.findOneAndUpdate({
            _id: new MongoClient.ObjectId(id)
          }, {
            $set: {
              russianWord: russianWord,
              translation: translation,
              definition: definition,
              meaning: meaning
            }
          }, {
            returnDocument: 'after'
          }));

        case 6:
          result = _context4.sent;

          if (!result.value) {
            reply.status(404).send({
              error: 'Entry not found'
            });
          } else {
            reply.send(result.value);
          }

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // Route to delete an entry by ID

fastify["delete"]('/thesaurus/:id', function _callee5(request, reply) {
  var id, db, collection, result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = request.params.id;
          db = client.db(dbName);
          collection = db.collection('words_db');
          _context5.next = 5;
          return regeneratorRuntime.awrap(collection.findOneAndDelete({
            _id: new MongoClient.ObjectId(id)
          }));

        case 5:
          result = _context5.sent;

          if (!result.value) {
            reply.status(404).send({
              error: 'Entry not found'
            });
          } else {
            reply.send(result.value);
          }

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
});