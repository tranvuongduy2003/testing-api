import { App } from '@/app';
import { CategoryRoute } from '@/routes/categories.route';
import request from 'supertest';

describe('Testing categories', () => {
  describe('[GET] /categories', () => {
    it('should return all categories', async () => {
      const categoriesRoute = new CategoryRoute();

      const app = new App([categoriesRoute]);
      return request(app.getServer())
        .get(`${categoriesRoute.path}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const brands = response.body.data;
          expect(brands).toEqual(
            expect.arrayContaining([
              {
                id: expect.any(Number),
                name: expect.any(String),
                desc: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              },
            ]),
          );
        });
    });
  });
});
