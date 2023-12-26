import { App } from '@/app';
import { DB } from '@/database';
import { ProductRoute } from '@/routes/products.route';
import request from 'supertest';

afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
  });

describe('Testing products', () => {
    describe('[GET] /', () => {
        it('should return all products', async () => {
            const productRoute = new ProductRoute()
            const { Product } = DB 

            Product.findAll = jest.fn().mockReturnValue([
                { 
                    id: 1,
                    name: "Fantastic Fresh Ball",
                    desc: "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
                    price: 928643.00,
                    brandId: 1,
                    categoryId: 2,
                    inventory: 56,
                    sold: 24,
                    images: ['image1'],
                    avgRating: 10,
                }
            ]);
            const app = new App([productRoute]);
            return request(app.getServer()).get(`${productRoute.path}`).expect(200);
        })

    })
})