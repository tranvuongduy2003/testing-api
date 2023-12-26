import { App } from '@/app';
import { DB } from '@/database';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

// describe('Testing general', () => {
//     describe('[GET] /statistics', () => {

//     })
//     describe('[GET] /revenue-by-category', () => {

//     })
//     describe('[GET] /order-in-timeline', () => {

//     })
// })
