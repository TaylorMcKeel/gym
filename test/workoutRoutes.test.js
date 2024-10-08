const request = require('supertest');
const jwt = require('jsonwebtoken');
const {startServer} = require('../server');
const mongoose = require('mongoose');
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

let userId;
let workoutId;
let server;
let port =0;
let token;

jest.setTimeout(10000); 

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });

  server = startServer(port);
  port = server.address().port;
  console.log(`Test server is running on port ${port}`);
  

  const testUser = {
    _id: new mongoose.Types.ObjectId(),
    userName: 'testUser',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@user.com',
    password: 'password'
  }
  userId = testUser._id;
  token = jwt.sign(testUser, process.env.JWT_SECRET, { expiresIn: '1d' });

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

describe('Test GET request for all workouts', () => {
  test('GET /api/workout should return 200', async () => {
    const response = await request(server)
      .get('/api/workout')
      .set('Cookie', `token=${token}`);

    expect(response.status).toBe(200);
  });

  
  test('DELETE /api/workout should return 202', async () => {
    const response = await request(server)
      .delete('/api/workout')
      .set('Cookie', `token=${token}`);

    expect(response.status).toBe(202);
  });
  

  test('POST /api/workout should return 200', async () => {
    const response = await request(server)
      .post('/api/workout')
      .set('Cookie', `token=${token}`)
      .send({
        title: 'Test Workout',
        creator: userId
      });

    workoutId = response.body._id
    expect(response.status).toBe(200);
  });
  
  test('GET /api/workout/uuserWorkouts should return 200', async () => {
    const response = await request(server)
      .get('/api/workout/userWorkouts')
      .set('Cookie', `token=${token}`)

    expect(response.status).toBe(200);
  });
  
  test('GET /api/workout/:id should return 200', async () => {
    const response = await request(server)
      .get(`/api/workout/${workoutId}`)
      .set('Cookie', `token=${token}`);

    expect(response.status).toBe(200);
  });

  //update
  test('PUT /api/workout/:id should return 200', async () => {
    const response = await request(server)
      .put(`/api/workout/${workoutId}`)
      .set('Cookie', `token=${token}`)
      .send({
        title: 'Updated Test Workout',
        creator: userId
      });

    expect(response.status).toBe(200);
  });
  //delete one
});

