import { App } from '@/app';
import { TEST_TOKEN } from '@/config';
import { OrderStatus } from '@/interfaces/orders.interface';
import { OrderRoute } from '@/routes/orders.route';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Orders', () => {
  describe('[GET] /orders', () => {
    it('should return all orders', async () => {
      const ordersRoute = new OrderRoute();

      const app = new App([ordersRoute]);
      return request(app.getServer())
        .get(`${ordersRoute.path}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const orders = response.body.data;
          expect(orders).toEqual(
            expect.arrayContaining([
              {
                id: expect.any(Number),
                status: expect.any(String),
                userId: expect.any(Number),
                receiptAddress: expect.any(String),
                receiptName: expect.any(String),
                receiptPhone: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                deletedAt: null,
                OrderItemModels: expect.arrayContaining([
                  {
                    id: expect.any(Number),
                    quantity: expect.any(Number),
                    productId: expect.any(Number),
                    orderId: expect.any(Number),
                    sumPrice: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                  },
                ]),
              },
            ]),
          );
        });
    });
  });

  describe('[POST] /orders', () => {
    it('should create a new order', async () => {
      const ordersRoute = new OrderRoute();
      const app = new App([ordersRoute]);

      // Mock data for CreateOrderDto
      const orderData = {
        receiptAddress: '123 Main Street',
        receiptName: 'John Doe',
        receiptPhone: '+84 123 456 789',
        products: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 3 },
        ],
      };

      request(app.getServer())
        .post(`${ordersRoute.path}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send(orderData)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(response => {
          const createdOrder = response.body.data;

          expect(createdOrder).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              status: expect.any(String),
              userId: expect.any(Number),
              receiptAddress: orderData.receiptAddress,
              receiptName: orderData.receiptName,
              receiptPhone: orderData.receiptPhone,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            }),
          );
        });
    });

    it('should return error if receiptAddress is empty', async () => {
      const ordersRoute = new OrderRoute();
      const app = new App([ordersRoute]);

      // Mock data for CreateOrderDto
      const orderData = {
        receiptName: 'John Doe',
        receiptPhone: '+84 123 456 789',
        products: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 3 },
        ],
      };

      request(app.getServer())
        .post(`${ordersRoute.path}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send(orderData)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toEqual('receiptAddress must be a string');
        });
    });

    it('should return error if receiptName is empty', async () => {
      const ordersRoute = new OrderRoute();
      const app = new App([ordersRoute]);

      // Mock data for CreateOrderDto
      const orderData = {
        receiptAddress: '123 Main Street',
        receiptPhone: '+84 123 456 789',
        products: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 3 },
        ],
      };

      request(app.getServer())
        .post(`${ordersRoute.path}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send(orderData)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toEqual('receiptName must be a string');
        });
    });

    it('should return error if receiptPhone is empty', async () => {
      const ordersRoute = new OrderRoute();
      const app = new App([ordersRoute]);

      // Mock data for CreateOrderDto
      const orderData = {
        receiptName: 'John Doe',
        receiptAddress: '123 Main Street',
        products: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 3 },
        ],
      };

      request(app.getServer())
        .post(`${ordersRoute.path}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send(orderData)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toEqual('receiptPhone must be a string');
        });
    });

    it('should return error if products is empty', async () => {
      const ordersRoute = new OrderRoute();
      const app = new App([ordersRoute]);

      // Mock data for CreateOrderDto
      const orderData = {
        receiptName: 'John Doe',
        receiptAddress: '123 Main Street',
        receiptPhone: '+84 123 456 789',
      };

      request(app.getServer())
        .post(`${ordersRoute.path}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send(orderData)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toEqual('products is required');
        });
    });
  });

  describe('[PUT] /orders', () => {
    it('should change order status', async () => {
      const ordersRoute = new OrderRoute();
      const app = new App([ordersRoute]);

      // Create a new order to update
      const createOrderResponse = await request(app.getServer())
        .post(`${ordersRoute.path}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send({
          receiptAddress: '123 Main Street',
          receiptName: 'John Doe',
          receiptPhone: '+84 123 456 789',
          products: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 3 },
          ],
        })
        .expect('Content-Type', /json/)
        .expect(201);

      const createdOrder = createOrderResponse.body.data;

      // Define the update payload
      const updatePayload = {
        status: OrderStatus.DELIVERED,
      };

      request(app.getServer())
        .put(`${ordersRoute.path}/${createdOrder.id}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send(updatePayload)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          const updatedOrder = response.body.data;

          expect(updatedOrder).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              status: expect.any(String),
              userId: expect.any(Number),
              receiptAddress: expect.any(String),
              receiptName: expect.any(String),
              receiptPhone: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            }),
          );
        });
    });

    it('should return error if id does not exist', async () => {
      const ordersRoute = new OrderRoute();
      const app = new App([ordersRoute]);

      // Define the update payload
      const updatePayload = {
        status: OrderStatus.DELIVERED,
      };

      request(app.getServer())
        .put(`${ordersRoute.path}/999999`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send(updatePayload)
        .expect('Content-Type', /json/)
        .expect(409)
        .then(response => {
          expect(response.body.message).toEqual("Order doesn't exist");
        });
    });

    it('should return error if status is empty', async () => {
      const ordersRoute = new OrderRoute();
      const app = new App([ordersRoute]);

      // Create a new order to update
      const createOrderResponse = await request(app.getServer())
        .post(`${ordersRoute.path}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send({
          receiptAddress: '123 Main Street',
          receiptName: 'John Doe',
          receiptPhone: '+84 123 456 789',
          products: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 3 },
          ],
        })
        .expect('Content-Type', /json/)
        .expect(201);

      const createdOrder = createOrderResponse.body.data;

      request(app.getServer())
        .put(`${ordersRoute.path}/${createdOrder.id}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send({})
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toEqual('status must be one of the following values: PENDING, CANCELLED, DELIVERED');
        });
    });

    it('should return error if status does not match order status', async () => {
      const ordersRoute = new OrderRoute();
      const app = new App([ordersRoute]);

      // Create a new order to update
      const createOrderResponse = await request(app.getServer())
        .post(`${ordersRoute.path}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send({
          receiptAddress: '123 Main Street',
          receiptName: 'John Doe',
          receiptPhone: '+84 123 456 789',
          products: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 3 },
          ],
        })
        .expect('Content-Type', /json/)
        .expect(201);

      const createdOrder = createOrderResponse.body.data;

      // Define the update payload
      const updatePayload = {
        status: 'Order Status',
      };

      request(app.getServer())
        .put(`${ordersRoute.path}/${createdOrder.id}`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send(updatePayload)
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body.message).toEqual(`status must be one of the following values: PENDING, CANCELLED, DELIVERED`);
        });
    });
  });
});
