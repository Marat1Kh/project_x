const fastify = require('fastify')({ logger: true });
const { MongoClient } = require('mongodb');

// MongoDB connection string
const mongoURI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/thesaurus';

// Connect to MongoDB
const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

// Start the server
const start = async () => {
  try {
    await client.connect();

    // Get the database and collection names
    const databaseName = client.db().databaseName;
    const collectionNames = await client.db().listCollections().toArray();
    const collectionNamesString = collectionNames.map(collection => collection.name).join(', ');

    fastify.log.info(`Connected to MongoDB: Database - ${databaseName}, Collections - ${collectionNamesString}`);

    // Register CORS
    fastify.register(require('fastify-cors'), {
      origin: process.env.ORIGIN_URL || 'http://localhost:5000',
    });

    // Register your routes
    fastify.register(require('./routes/words'));

    // Set not found handler
    fastify.setNotFoundHandler((req, res) => {
      res.code(404).send({
        statusCode: false,
        error: 'Not Found',
      });
    });

    await fastify.listen(process.env.PORT || 5000);
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
