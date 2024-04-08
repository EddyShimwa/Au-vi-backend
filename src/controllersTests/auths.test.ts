import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';
import authRoutes from '../../src/routes/authRoutes';
import User from '../../src/models/User';
import app from '../../src/app' ;
import dotenv from 'dotenv';
dotenv.config();

let mongoServer: MongoMemoryServer;

let server: any;

// beforeEach(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const mongoUri = mongoServer.getUri();
//   await mongoose.disconnect(); 
//   await mongoose.connect(mongoUri);
//   server = app.listen(); 
// });

// afterEach(async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongoServer.stop();
//   await server.close();
// });

// beforeEach(async () => {
//   await mongoose.connection.dropDatabase();
// });

beforeAll(async () => {  
  try {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error('Failed to create MongoMemoryServer', error);
  }  
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('POST /auth/login', () => {
  it('should login a user and return a token', async () => {
    const user = await User.create({ username: 'test', email: 'test2@test.com', password: 'password', role: 'admin' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test2@test.com', password: 'password' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.response).toHaveProperty('token');
    expect(res.body.response.user.username).toEqual('test');
    expect(res.body.response.user.email).toEqual('test@test.com');
  });    
});   

describe('POST /auth/signup', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'test', email: '123@test.com', password: 'password', role: 'admin' });

    expect(res.statusCode).toEqual(201);
    expect(res.body.user.username).toEqual('test');
    expect(res.body.user.email).toEqual('123@test.com');
});
});