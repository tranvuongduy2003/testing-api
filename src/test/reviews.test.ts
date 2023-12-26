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
    it('should return all review with id', async () => {
      return request(app.getServer())
        .get(`${reviewsRoute.path}:id(\\d+)`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .expect(200)
        .then(response => {
          const reviews = response.body.data;
          expect(reviews).toEqual(
            expect.arrayContaining([
              {
                id: expect.any(Number),
                userId: expect.any(Number),
                content: expect.any(String),
                rating: expect.any(Number),
                productId: expect.any(Number),
              },
            ]),
          );
        });
    });
  });
});
