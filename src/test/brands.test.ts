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
      const { Brands } = DB;

      Brands.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          name: 'Brand Test 1',
        },
        {
          id: 2,
          name: 'Brand Test 2',
        },
        {
          id: 3,
          name: 'Brand Test 3',
        },
      ]);

      const app = new App([brandsRoute]);
      return request(app.getServer()).get(`${brandsRoute.path}`).expect(200);
    });
  });
});
