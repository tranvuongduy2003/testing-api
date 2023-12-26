import { App } from '@/app';
import { DB } from '@/database';
import { BrandRoute } from '@/routes/brands.route';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Brands', () => {
  describe('[GET] /brands', () => {
    it('should return all brands', async () => {
      const brandsRoute = new BrandRoute();

      const app = new App([brandsRoute]);
      return request(app.getServer())
        .get(`${brandsRoute.path}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const brands = response.body.data;
          expect(brands).toEqual(
            expect.arrayContaining([
              {
                id: expect.any(Number),
                name: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              },
            ]),
          );
        });
    });
  });
});
