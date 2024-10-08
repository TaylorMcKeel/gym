const request = require('supertest');
const app = require('../server');
const {startServer} = require('../server');
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


  server = startServer(port);
  port = server.address().port;
  console.log(`Test server is running on port ${port}`);
});

afterAll(async () => {
 
  await mongoose.connection.close();
  await new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);
      console.log('Test server closed');
      resolve(); 
    });
  });
});

describe('Test GET requests for All Users', () => {
  test('GET /api/user should return 200', async () => {
    const response = await request(server).get('/api/user');
    expect(response.status).toBe(200);
  });

 
});


 

