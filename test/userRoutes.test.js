const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;


let server;
let port =0;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });


  server = app.listen(port, () => {
    port = server.address().port;
    console.log(`Test server is running on port ${port}`);
  })
});

afterAll(async () => {
  // Close MongoDB connection
  await mongoose.connection.close();

  // Close the server after tests
  await new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err); // Reject the promise on error
      console.log('Test server closed');
      resolve(); // Resolve the promise when closed
    });
  });
});

describe('Test GET requests for All Users', () => {
  test('GET /api/user should return 200', async () => {
    const response = await request(server).get('/api/user');
    expect(response.status).toBe(200);
  });

 
});


 

