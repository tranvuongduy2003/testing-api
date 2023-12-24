import request from 'supertest';
import { App } from '@/app';
import { CategoryRoute } from '@/routes/categories.route';
import { DB } from '@/database';


describe('Testing categories', () => {
    describe('[GET] /categories', () => {
      it('should return all categories', async () => {
        const categoriesRoute = new CategoryRoute();
        const { Categories } = DB;

        Categories.findAll = jest.fn().mockReturnValue([
          {
            id: 1,
            name: 'Category 1',
            desc: 'Description 1',
          },
          {
            id: 2,
            name: 'Category 2',
            desc: 'Description 2',
          },
          {
            id: 3,
            name: 'Category 3',
            desc: 'Description 3',
          },
        ]);

        const app = new App([categoriesRoute])
        return request(app.getServer()).get(`${categoriesRoute.path}`).expect(200);
      });
    })
  }) 