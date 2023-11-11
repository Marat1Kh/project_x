"use strict";

var fastify = require('fastify')({
  logger: true
});

var _require = require('mongodb'),
    MongoClient = _require.MongoClient; // MongoDB connection string


var mongoURI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/thesaurus'; // Connect to MongoDB

var client = new MongoClient(mongoURI, {
  useUnifiedTopology: true
}); // Start the server

var start = function start() {
  var databaseName, collectionNames, collectionNamesString;
  return regeneratorRuntime.async(function start$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          // Get the database and collection names
          databaseName = client.db().databaseName;
          _context.next = 6;
          return regeneratorRuntime.awrap(client.db().listCollections().toArray());

        case 6:
          collectionNames = _context.sent;
          collectionNamesString = collectionNames.map(function (collection) {
            return collection.name;
          }).join(', ');
          fastify.log.info("Connected to MongoDB: Database - ".concat(databaseName, ", Collections - ").concat(collectionNamesString)); // Register CORS

          fastify.register(require('fastify-cors'), {
            origin: process.env.ORIGIN_URL || 'http://localhost:5000'
          }); // Register your routes

          fastify.register(require('./routes/words')); // Set not found handler

          fastify.setNotFoundHandler(function (req, res) {
            res.code(404).send({
              statusCode: false,
              error: 'Not Found'
            });
          });
          _context.next = 14;
          return regeneratorRuntime.awrap(fastify.listen(process.env.PORT || 5000));

        case 14:
          fastify.log.info("Server listening on ".concat(fastify.server.address().port));
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          fastify.log.error(_context.t0);
          process.exit(1);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

start();