import { TEST_TOKEN } from '@/config';
import { BrandRoute } from './../routes/brands.route';
import { App } from '@/app';
import { DB } from '@/database';
import { ProductRoute } from '@/routes/products.route';
import request from 'supertest';

afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
  });

describe('Testing products', () => {
    describe('[GET] /products', () => {
        it('should return all products', async () => {
            const productRoute = new ProductRoute()
            const { Product } = DB 


            const app = new App([productRoute]);
            return request(app.getServer())
            .get(`${productRoute.path}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.message).toEqual('findAll');
                const products = response.body.data;
                expect(products).toEqual(
                  expect.arrayContaining([
                    {
                        id: expect.any(Number),
                        name: expect.any(String),
                        desc: expect.any(String),
                        price: expect.any(String),
                        brandId: expect.any(Number),
                        categoryId: expect.any(Number),
                        inventory: expect.any(Number),
                        sold: expect.any(Number),
                        images: expect.arrayContaining([
                            expect.any(String)
                        ]),
                        avgRating: expect.any(Number)
                    },
                  ]),
                );
              });
        })
    }),

    describe('[GET] products/search', () => {
        it('Should return products if search successfully', async () => {
            const productRoute = new ProductRoute()
            const { Product } = DB

            const nameSearch = "Elegant Steel Chair"

            const app = new App([productRoute]);
            return request(app.getServer())
            .get(`${productRoute.path}/search`)
            .query({ keyword: nameSearch })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.message).toEqual('search');
                const products = response.body.data;
                expect(products).toEqual(
                  expect.arrayContaining([
                    {
                        id: expect.any(Number),
                        name: nameSearch,
                        desc: expect.any(String),
                        price: expect.any(String),
                        brandId: expect.any(Number),
                        categoryId: expect.any(Number),
                        inventory: expect.any(Number),
                        sold: expect.any(Number),
                        images: expect.arrayContaining([
                            expect.any(String)
                        ]),
                        avgRating: expect.any(Number)
                    },
                  ]),
                );
              });
        }),
        it('Should return all products with empty search', async () => {
            const productRoute = new ProductRoute()
            const { Product } = DB 

            const nameSearch = ""

            const app = new App([productRoute]);
            return request(app.getServer())
            .get(`${productRoute.path}/search`)
            .query({ keyword: nameSearch })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.message).toEqual('search');
                const products = response.body.data;
                expect(products).toEqual(
                  expect.arrayContaining([
                    {
                        id: expect.any(Number),
                        name: expect.any(String),
                        desc: expect.any(String),
                        price: expect.any(String),
                        brandId: expect.any(Number),
                        categoryId: expect.any(Number),
                        inventory: expect.any(Number),
                        sold: expect.any(Number),
                        images: expect.arrayContaining([
                            expect.any(String)
                        ]),
                        avgRating: expect.any(Number)
                    },
                  ]),
                );
              });
        }),
        it('Should return nothing if search does not match any product', async () => {
            const productRoute = new ProductRoute()
            const { Product } = DB 

            const nameSearch = "01234"

            const app = new App([productRoute]);
            return request(app.getServer())
            .get(`${productRoute.path}/search`)
            .query({ keyword: nameSearch })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.message).toEqual('search');
                const products = response.body.data;
                expect(products).toEqual(
                  expect.arrayContaining([])
                );
              });
        })
    }),

    describe('[GET] /products/:id', () => {
        it('Should return product with valid id', async () => {
            const productRoute = new ProductRoute()
            const { Product } = DB

            const id = 1;

            const app = new App([productRoute]);
            return request(app.getServer())
            .get(`${productRoute.path}/${id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.message).toEqual('findOne');
                const product = response.body.data;
                expect(product).toEqual(
                    {
                        id: id,
                        name: expect.any(String),
                        desc: expect.any(String),
                        price: expect.any(String),
                        brandId: expect.any(Number),
                        categoryId: expect.any(Number),
                        inventory: expect.any(Number),
                        sold: expect.any(Number),
                        images: expect.arrayContaining([
                            expect.any(String)
                        ]),
                        createdAt: expect.any(String),
                        deletedAt: null,
                        importPrice: expect.any(String),
                        updatedAt: expect.any(String),
                    },
                );
              });
        }),
        
        it('Should not return if id does not match any product', async () => {
            const productRoute = new ProductRoute()
            const { Product } = DB

            const id = 90;

            const app = new App([productRoute]);
            return request(app.getServer())
            .get(`${productRoute.path}/${id}`)
            .expect('Content-Type', /json/)
            .expect(409)
            .then(response => {
                expect(response.body.message).toEqual('Product doesn\'t exist');
                const product = response.body.data;
                expect(product).toEqual(undefined);
              });
        }),
        it('Should not return if id is not valid', async () => {
            const productRoute = new ProductRoute()
            const { Product } = DB

            const id = 'abc';

            const app = new App([productRoute]);
            return request(app.getServer())
            .get(`${productRoute.path}/${id}`)
            .expect(404)
            .then(response => {
                expect(response.body.message).toEqual(undefined);
              });
        })
    })
})