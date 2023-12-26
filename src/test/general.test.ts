import { App } from '@/app';
import { TEST_TOKEN } from '@/config';
import { DB } from '@/database';
import { GeneralRoute } from '@/routes/general.route';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing general', () => {
  describe('[GET] /statistics', () => {
    it('should return all statistics', async () => {
      const generalRoute = new GeneralRoute();

      const app = new App([generalRoute]);
      return request(app.getServer())
        .get(`${generalRoute.path}/statistics`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const general = response.body.data;
          expect(general).toEqual(
            expect.objectContaining({
              totalProducts: expect.any(Number),
              totalCustomer: expect.any(Number),
              totalOrders: expect.arrayContaining([
                expect.objectContaining({
                  Date: expect.any(String),
                  TotalOrders: expect.any(Number),
                }),
              ]),
              totalProfit: expect.arrayContaining([
                expect.objectContaining({
                  Date: expect.any(String),
                  profit: expect.any(String),
                  revenue: expect.any(String),
                }),
              ]),
            }),
          );
        });
    });
  });

  describe('[GET] /revenue-by-category', () => {
    it('should return all revenue by category', async () => {
      const generalRoute = new GeneralRoute();

      const app = new App([generalRoute]);
      return request(app.getServer())
        .get(`${generalRoute.path}/revenue-by-category`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const revenue = response.body.data;
          expect(revenue).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                Date: expect.any(String),
                ProductModel: expect.objectContaining({ category_id: expect.any(Number) }),
                Revenue: expect.any(String),
              }),
            ]),
          );
        });
    });
  });

  describe('[GET] /order-in-timeline', () => {
    it('should return all order in timeline', async () => {
      const generalRoute = new GeneralRoute();

      const app = new App([generalRoute]);
      return request(app.getServer())
        .get(`${generalRoute.path}/order-in-timeline`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const orders = response.body.data;
          for (const [key, value] of Object.entries(orders)) {
            expect(key).toEqual(expect.any(String));
            expect(value).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  id: expect.any(Number),
                  status: expect.any(String),
                  userId: expect.any(Number),
                  receiptAddress: expect.any(String),
                  receiptName: expect.any(String),
                  receiptPhone: expect.any(String),
                  createdAt: expect.any(String),
                  totalPrice: expect.any(String),
                }),
              ]),
            );
          }
        });
    });
  });
});
