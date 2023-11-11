fastify.register(require('fastify-cors'));

// Route to create a new entry
fastify.post('/thesaurus', async (request, reply) => {
    const { russianWord, translation, definition, meaning } = request.body;
  
    const db = client.db(dbName);
    const collection = db.collection('words_db');
    try {
        const result = await collection.insertOne({
          russianWord,
          translation,
          definition,
          meaning,
        });
      
        if (result.result.ok === 1) {
          reply.send(result.ops[0]);
        } else {
          reply.status(500).send({ error: 'Failed to insert document' });
        }
      } catch (error) {
        console.error('MongoDB error:', error);
        reply.status(500).send({ error: 'Failed to insert document' });
      }
      
  });


// Route to get all entries
fastify.get('/thesaurus', async (request, reply) => {
  const db = client.db(dbName);
  const collection = db.collection('words_db');

  const result = await collection.find().toArray();

  reply.send(result);
});

// Route to get a specific entry by ID
fastify.get('/thesaurus/:id', async (request, reply) => {
  const { id } = request.params;

  const db = client.db(dbName);
  const collection = db.collection('thesaurus');

  const result = await collection.findOne({ _id: new MongoClient.ObjectId(id) });

  if (!result) {
    reply.status(404).send({ error: 'Entry not found' });
  } else {
    reply.send(result);
  }
});

// Route to update an entry by ID
fastify.put('/thesaurus/:id', async (request, reply) => {
  const { id } = request.params;
  const { russianWord, translation, definition, meaning } = request.body;

  const db = client.db(dbName);
  const collection = db.collection('words_db');

  const result = await collection.findOneAndUpdate(
    { _id: new MongoClient.ObjectId(id) },
    { $set: { russianWord, translation, definition, meaning } },
    { returnDocument: 'after' }
  );

  if (!result.value) {
    reply.status(404).send({ error: 'Entry not found' });
  } else {
    reply.send(result.value);
  }
});

// Route to delete an entry by ID
fastify.delete('/thesaurus/:id', async (request, reply) => {
  const { id } = request.params;

  const db = client.db(dbName);
  const collection = db.collection('words_db');

  const result = await collection.findOneAndDelete({ _id: new MongoClient.ObjectId(id) });

  if (!result.value) {
    reply.status(404).send({ error: 'Entry not found' });
  } else {
    reply.send(result.value);
  }
});
