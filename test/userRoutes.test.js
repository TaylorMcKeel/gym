const request = require('supertest');
const jwt = require('jsonwebtoken');
const {startServer} = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

let userId;
let token;
let testUser;
let server;
let port =0;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
  await User.deleteMany(); //what is a btter way to set this up without having to erase the database? commented code wwas attempt
//how does being logged in play into this
  server = startServer(port);
  port = server.address().port;
  console.log(`Test server is running on port ${port}`);

  testUser = await User.create({
    userName: 'testUser',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@user.com',
    password: 'Password123.'
  });
  userId = testUser._id;
  token = jwt.sign(testUser.toObject(), process.env.JWT_SECRET, { expiresIn: '1d' });
  
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

  test('DELETE /api/user should return 202', async () => {
    const response = await request(server).delete('/api/user');
    expect(response.status).toBe(202);
  });

  test('GET /api/user/:userId should return 200', async () => {
    const response = await request(server)
      .get(`/api/user/${userId}`)
      .set('Cookie', `token=${token}`)
    
    expect(response.status).toBe(200);
   
  });

  test('POST /api/user should return 201', async () => {
    testUser = {
      userName: 'testUser',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@user.com',
      password: 'Password123!'
    }
    const response = await request(server)
      .post('/api/user')
      .send(testUser);
    
      // userID = response.body._id;
    // testUser = response.body;
    
    expect(response.status).toBe(201);
    })

  test('POST /api/user/login should return 200 for valid password', async () => {
    const response = await request(server)
      .post('/api/user/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });
    expect(response.status).toBe(200);
    
  });

  test('POST /api/user/login should return 401 for invalid password', async () => {
    const response = await request(server)
      .post('/api/user/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword'
      });
    expect(response.status).toBe(401);
  });

  test('POST /api/user/login should return 401 for invalid email', async () => {
    const response = await request(server)
      .post('/api/user/login')
      .send({
        email: 'wrong@email.com',
        password: 'wrongpassword'
      });
    expect(response.status).toBe(401);
  });
   
});


 

