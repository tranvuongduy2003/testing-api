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

            const nameSearch = "a"

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
                        name: expect.stringContaining(nameSearch),
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
    }),

    describe('[POST] /products', () => {
      it('Should create new product with valid data and existed brand', async () => {
          const productRoute = new ProductRoute()
          const { Product, Brands } = DB 
          const newProduct = {
              name: "New Product",
              desc: "Desc New",
              price: 1,
              importPrice: 1,
              brandName: 'Brand',
              categoryId: 1,
              inventory: 1,
              sold: 1,
              images: ["image1", "image2"],
          }

            Product.findOne = jest.fn().mockReturnValue(null)
            Brands.findOne = jest.fn().mockReturnValue({
                id: 1,
                name: 'Brand',
                createdAt: "12/12/2023",
                updatedAt: "12/12/2023",
            })

            Product.create = jest.fn().mockReturnValue({
                id: 10,
                name: "New Product",
                desc: "Desc New",
                price: 1,
                importPrice: 1,
                brandId: 1,
                categoryId: 1,
                inventory: 1,
                sold: 1,
                images: ["image1", "image2"],
                cratedAt: "12/12/2023",
                updatedAt: "12/12/2023"
            })

          const app = new App([productRoute]);
          return request(app.getServer())
          .post(`${productRoute.path}`)
          .set('Authorization', `Bearer ${TEST_TOKEN}`)
          .send(newProduct)
          .expect('Content-Type', /json/)
          .expect(201)
          .then(response => {
              expect(response.body.message).toEqual('created');
              const products = response.body.data;
              expect(products).toEqual({
                  id: 10,
                  name: "New Product",
                  desc: "Desc New",
                  price: 1,
                  importPrice: 1,
                  brandId: expect.any(Number),
                  categoryId: 1,
                  inventory: 1,
                  sold: 1,
                  images: ["image1", "image2"],
                  cratedAt: expect.any(String),
                  updatedAt: expect.any(String)
              }
              );
            });
      }),
      it('Should create new product with valid data and non-existed brand', async () => {
        const productRoute = new ProductRoute()
          const { Product, Brands } = DB 
          const newProduct = {
              name: "New Product",
              desc: "Desc New",
              price: 1,
              importPrice: 1,
              brandName: 'Brand',
              categoryId: 1,
              inventory: 1,
              sold: 1,
              images: ["image1", "image2"],
          }

            Product.findOne = jest.fn().mockReturnValue(null)
            Brands.findOne = jest.fn().mockReturnValue(null)
            Brands.create = jest.fn().mockReturnValue({
                id: 10,
                name: 'Brand',
                createdAt: "12/12/2023",
                updatedAt: "12/12/2023",
            })

            Product.create = jest.fn().mockReturnValue({
                id: 10,
                name: "New Product",
                desc: "Desc New",
                price: 1,
                importPrice: 1,
                brandId: 10,
                categoryId: 1,
                inventory: 1,
                sold: 1,
                images: ["image1", "image2"],
                cratedAt: "12/12/2023",
                updatedAt: "12/12/2023"
            })

          const app = new App([productRoute]);
          return request(app.getServer())
          .post(`${productRoute.path}`)
          .set('Authorization', `Bearer ${TEST_TOKEN}`)
          .send(newProduct)
          .expect('Content-Type', /json/)
          .expect(201)
          .then(response => {
              expect(response.body.message).toEqual('created');
              const products = response.body.data;
              expect(products).toEqual({
                  id: 10,
                  name: "New Product",
                  desc: "Desc New",
                  price: 1,
                  importPrice: 1,
                  brandId: 10,
                  categoryId: 1,
                  inventory: 1,
                  sold: 1,
                  images: ["image1", "image2"],
                  cratedAt: expect.any(String),
                  updatedAt: expect.any(String)
              }
              );
            });
      }),
      it('Should not create existed product', async () => {
            const productRoute = new ProductRoute()
            const { Product, Brands } = DB 
            const newProduct = {
                name: "New Product",
                desc: "Desc New",
                price: 1,
                importPrice: 1,
                brandName: 'Brand',
                categoryId: 1,
                inventory: 1,
                sold: 1,
                images: ["image1", "image2"],
            }
  
              Product.findOne = jest.fn().mockReturnValue({
                name: "New Product",
                desc: "Desc New",
                price: 1,
                importPrice: 1,
                brandName: 'Brand',
                categoryId: 1,
                inventory: 1,
                sold: 1,
                images: ["image1", "image2"],
              })
  
            const app = new App([productRoute]);
            return request(app.getServer())
            .post(`${productRoute.path}`)
            .set('Authorization', `Bearer ${TEST_TOKEN}`)
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(409)
            .then(response => {
                expect(response.body.message).toEqual(`This product ${newProduct.name} already exists`);
              });
      }),
      it('Should not create with empty data', async () => {
        const productRoute = new ProductRoute()
            const { Product, Brands } = DB 
            const newProduct = {
                name: null,
                desc: null,
                price: null,
                importPrice: null,
                brandName: null,
                categoryId: null,
                inventory: null,
                sold: null,
                images: null,
            }
  
            const app = new App([productRoute]);
            return request(app.getServer())
            .post(`${productRoute.path}`)
            .set('Authorization', `Bearer ${TEST_TOKEN}`)
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body.message).toEqual("name should not be empty,name must be a string, desc should not be empty,desc must be a string, price must be a number conforming to the specified constraints, importPrice must be a number conforming to the specified constraints, brandName should not be empty,brandName must be a string, sold must be a number conforming to the specified constraints, each value in images must be a string, inventory must be a number conforming to the specified constraints");
              });
      })
  }),

  describe('[PUT] /products/:id', () => {
      it('Should update product with valid data', async () => {
          const productRoute = new ProductRoute()
          const { Product } = DB 
          const productData = {
              name: "Product new",
          }

          Product.findByPk = jest.fn().mockReturnValue({
              id: 1,
              name: "Product old",
              desc: "Desc",
              price: 1,
              importPrice: 1,
              brandId: 1,
              categoryId: 1,
              inventory: 1,
              sold: 1,
              images: ["image1", "image2"],
          })

          Product.update = jest.fn().mockImplementation(() => {
            Product.findByPk = jest.fn().mockReturnValue({
                id: 1,
                name: "Product new",
                desc: "Desc",
                price: 1,
                importPrice: 1,
                brandId: 1,
                categoryId: 1,
                inventory: 1,
                sold: 1,
                images: ["image1", "image2"],
            })
          })

          const app = new App([productRoute]);
          return request(app.getServer())
          .put(`${productRoute.path}/1`)
          .set('Authorization', `Bearer ${TEST_TOKEN}`)
          .send(productData)
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
              expect(response.body.message).toEqual('updated');
              const products = response.body.data;
              expect(products).toEqual({
                  id: 1,
                  name: "Product new",
                  desc: "Desc",
                  price: 1,
                  importPrice: 1,
                  brandId: 1,
                  categoryId: 1,
                  inventory: 1,
                  sold: 1,
                  images: ["image1", "image2"],
              }
              );
            });

      }),
      it('Should not update non-existed product', async () => {
        const productRoute = new ProductRoute()
        const { Product } = DB 
        const productData = {
            name: "Product new",
        }

        Product.findByPk = jest.fn().mockReturnValue(null)

        const app = new App([productRoute]);
        return request(app.getServer())
        .put(`${productRoute.path}/1`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send(productData)
        .expect('Content-Type', /json/)
        .expect(409)
        .then(response => {
            expect(response.body.message).toEqual('Product doesn\'t exist');
          });
        }),

      it('Should not update with empty data', async () => {
        const productRoute = new ProductRoute()
        const { Product } = DB 
        const productData = {
            name: "",
            desc: "",
            price: "",
            categoryId: "",
            inventory: "",
            sold: "",
            images: "",
        }

        Product.findByPk = jest.fn().mockReturnValue({
            id: 1,
            name: "Product",
            desc: "Desc",
            price: 1,
            importPrice: 1,
            brandId: 1,
            categoryId: 1,
            inventory: 1,
            sold: 1,
            images: ["image1", "image2"],
        })

        const app = new App([productRoute]);
        return request(app.getServer())
        .put(`${productRoute.path}/1`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send(productData)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
            expect(response.body.message).toEqual('name should not be empty, desc should not be empty, price must be a number conforming to the specified constraints, categoryId must be a number conforming to the specified constraints, sold must be a number conforming to the specified constraints, images must be an array, inventory must be a number conforming to the specified constraints');
          });
      })
})
})