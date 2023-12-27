import { App } from '@/app';
import { TEST_TOKEN } from '@/config';
import { DB } from '@/database';
import { ReviewRoute } from '@/routes/reviews.route';
import { match } from 'assert';
import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});
afterEach(() => {
  jest.resetAllMocks();
});
describe('Testing Users', () => {
  const reviewsRoute = new ReviewRoute();
  const app = new App([reviewsRoute]);
  const { Reviews } = DB;

  describe('[GET] /reviews/:id(\\d+)', () => {
    it('should return review with id', async () => {
      const id = 1;
      return request(app.getServer())
        .get(`${reviewsRoute.path}/${id}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body.message).toEqual('findAll');
          const review = response.body.data;
          console.log('???', review);
          expect(review).toEqual({
            ratingPoint: expect.arrayContaining([
              {
                level: expect.any(Number),
                percents: expect.any(String),
              },
            ]),
            reviews: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                userId: expect.any(Number),
                content: expect.any(String),
                rating: expect.any(Number),
                productId: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                UserModel: expect.objectContaining({
                  avatar: expect.any(String),
                  fullname: expect.any(String),
                }),
              }),
            ]),
          });
        });
    });
  });

  describe('[POST] /reviews', () => {
    it('should create new review', async () => {
      const reviewData = { rating: 4.0, content: 'This is soooooooo goood', productId: 2 };

      request(app.getServer())
        .post(`${reviewsRoute.path}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send(reviewData)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(response => {
          console.log('Response Body:', response.body);
          expect(response.body.message).toEqual('created');
          // const review = response.body.data;
          // expect(review).toEqual(
          //   expect.objectContaining({
          //     id: expect.any(Number),
          //     userId: expect.any(Number),
          //     rating: reviewData.rating,
          //     content: reviewData.content,
          //     productId: reviewData.productId,
          //     createdAt: expect.any(String),
          //     updatedAt: expect.any(String),
          //   }),
          // );
        });
    });

    it('should return error if content is empty', async () => {
      // Mock data for CreateOrderDto
      const reviewData = {
        userId: 21,
        rating: 4.0,
        productId: 2,
      };
      request(app.getServer())
        .post(`${reviewsRoute.path}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send(reviewData)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toEqual('content should not be empty,content must be a string');
        });
    });

    it('should return error if rating is empty', async () => {
      // Mock data for CreateOrderDto
      const reviewData = {
        userId: 21,
        content: 'This is not good',
        productId: 2,
      };
      request(app.getServer())
        .post(`${reviewsRoute.path}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send(reviewData)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toEqual('rating must be a number conforming to the specified constraints,rating should not be empty');
        });
    });

    it('should return error if productId is empty', async () => {
      // Mock data for CreateOrderDto
      const reviewData = {
        userId: 21,
        content: 'This is not good',
        rating: 2,
      };
      request(app.getServer())
        .post(`${reviewsRoute.path}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send(reviewData)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toEqual('productId must be a number conforming to the specified constraints,productId should not be empty');
        });
    });
  });
});
