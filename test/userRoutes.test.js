import  request from 'supertest';
import app from '../server.js';


describe('Test GET requests for User', () => {
  test('GET /api/games should return 200', async () => {
    const response = await request(app).get('/api/games');
    expect(response.status).toBe(200);
  });

 
});