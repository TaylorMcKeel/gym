import  request from 'supertest';
import app from '../server.js';
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;



describe('Test GET requests for User', () => {
  test('GET /api/games should return 200', async () => {
    const response = await request(app).get('/api/user');
    expect(response.status).toBe(200);
  });

 
});

describe('Test POST requests for User', () => {
  test('POST /api/games should return 200 and return user data', async () => {
    const user = {
      username: 'test',
      email: 'test@email.com',
      firstName: 'test',
      lastName: 'test',
      password: 'Test1234'
      }
    const response = await request(app).post('/api/user').send(user);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username');
  });
});
 
