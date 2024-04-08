import request from 'supertest';
import { Request, Response, NextFunction } from 'express';
import { UserDocument } from '../models/User'; 
import express from 'express';
import blogRoutes from '../routes/imageRoutes';
import mongoose from 'mongoose';
import Blog from '../models/Image';
import dotenv from 'dotenv';
import app from '../app' 
dotenv.config();
jest.setTimeout(30000);

jest.mock('../../src/Middleware/authsMiddleware.ts', () => ({
  isAuthenticated: (req: Request, res: Response, next: NextFunction) => {
    req.user = {
      id: 'testUserId',
      username: 'testUsername',
      email: 'testEmail@test.com',
      password: 'testPassword',
      role: 'testRole',
    } as unknown as UserDocument; 
  },
  isAdmin: (req: Request, res: Response, next: NextFunction) => next(),
}));

// Connect to the database before running any tests
beforeAll(async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI not defined in .env file');
  }
  try {
    await mongoose.connect(uri);
  } catch (err: any) {
    console.error(err);
    process.exit(1);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});


describe('POST /blogs/createBlog', () => {
  it('should create a new blog and return 201 status', async () => {
    const res = await request(app)
      .post('/blogs/createBlog')
      .send({
        title: 'Test Blog',
        image: 'test.jpg',
        description: 'This is a test blog',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('blog');
  });
});

// Tests for /blogs/editBlog/:id endpoint
describe('PUT /blogs/editBlog/:id', () => {
  it('should edit a blog and return 200 status', async () => {
    const blog = new Blog({
      title: 'Test Blog',
      description: 'This is a test blog',
      image: 'test.jpg',
    });
    await blog.save();

    const res = await request(app)
      .put(`/blogs/editBlog/${blog._id}`)
      .send({
        title: 'Updated Test Blog',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.blog.title).toEqual('Updated Test Blog');
  });
});

// Tests for /blogs/all endpoint
describe('GET /blogs/all', () => {
  it('should get all blogs and return 200 status', async () => {
    const res = await request(app).get('/blogs/all');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.blogs)).toBe(true);
  });
});

// Tests for /blogs/incrementLikes/:id endpoint
describe('POST /blogs/incrementLikes/:id', () => {
  it('should increment likes of a blog and return 200 status', async () => {
    const blog = new Blog({
      title: 'Test Blog',
      description: 'This is a test blog',
      image: 'test.jpg',
    });
    await blog.save();

    const res = await request(app).post(`/blogs/incrementLikes/${blog._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.blog.likesCount).toEqual(1);
  });
});