const request = require('supertest');
const app = require('../server');
const {startServer} = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// let testUser;
let server;
let port =0;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
  await User.deleteMany(); //what is a btter way to set this up without having to erase the database? commented code wwas attempt

  server = startServer(port);
  port = server.address().port;
  console.log(`Test server is running on port ${port}`);
});

afterAll(async () => {
  // if(testUser){
  //   await User.findByIdAndDelete(testUser._id);
  // }
  await mongoose.connection.close();
  await new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);
      console.log('Test server closed');
      resolve(); 
    });
  });
});

describe('Test requests for Users', () => {
  test('GET /api/user should return 200', async () => {
    const response = await request(server).get('/api/user');
    expect(response.status).toBe(200);
  });

  test('POST /api/user should return 201', async () => {
    const testUser = {
      userName: 'testUser',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@user.com',
      password: 'Password123!'
    }
    const response = await request(server)
      .post('/api/user')
      .send(testUser);
      
    // testUser = response.body;
    // console.log(testUser);
    expect(response.status).toBe(201);
    })
});


 

