import { App } from '@/app';
import { DB } from '@/database';
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
      const { Order } = DB;

      Order.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          status: 'PENDING',
          userId: 1,
          receiptAddress: '22986 Freddy Way',
          receiptName: 'Miranda Crona',
          receiptPhone: '+84 85 392 27 95',
          createdAt: '2023-12-15T17:39:32.000Z',
          updatedAt: '2023-12-22T17:39:32.000Z',
          deletedAt: null,
          OrderItemModels: [
            {
              id: 1,
              quantity: 2,
              productId: 5,
              orderId: 1,
              sumPrice: '1909120.00',
              createdAt: '2023-12-16T17:39:32.000Z',
              updatedAt: '2023-12-22T17:39:32.000Z',
            },
            {
              id: 2,
              quantity: 5,
              productId: 10,
              orderId: 1,
              sumPrice: '4639185.00',
              createdAt: '2023-12-20T17:39:32.000Z',
              updatedAt: '2023-12-22T17:39:32.000Z',
            },
            {
              id: 3,
              quantity: 4,
              productId: 15,
              orderId: 1,
              sumPrice: '3985832.00',
              createdAt: '2023-12-19T17:39:32.000Z',
              updatedAt: '2023-12-22T17:39:32.000Z',
            },
            {
              id: 4,
              quantity: 5,
              productId: 20,
              orderId: 1,
              sumPrice: '4551500.00',
              createdAt: '2023-12-21T17:39:32.000Z',
              updatedAt: '2023-12-22T17:39:32.000Z',
            },
            {
              id: 5,
              quantity: 4,
              productId: 23,
              orderId: 1,
              sumPrice: '3630920.00',
              createdAt: '2023-12-20T17:39:32.000Z',
              updatedAt: '2023-12-22T17:39:32.000Z',
            },
          ],
        },
        {
          id: 2,
          status: 'PENDING',
          userId: 1,
          receiptAddress: '22986 Freddy Way',
          receiptName: 'Miranda Crona',
          receiptPhone: '+84 85 392 27 95',
          createdAt: '2023-12-15T17:39:32.000Z',
          updatedAt: '2023-12-22T17:39:32.000Z',
          deletedAt: null,
          OrderItemModels: [
            {
              id: 6,
              quantity: 2,
              productId: 5,
              orderId: 1,
              sumPrice: '1909120.00',
              createdAt: '2023-12-16T17:39:32.000Z',
              updatedAt: '2023-12-22T17:39:32.000Z',
            },
            {
              id: 7,
              quantity: 5,
              productId: 10,
              orderId: 1,
              sumPrice: '4639185.00',
              createdAt: '2023-12-20T17:39:32.000Z',
              updatedAt: '2023-12-22T17:39:32.000Z',
            },
            {
              id: 8,
              quantity: 4,
              productId: 15,
              orderId: 1,
              sumPrice: '3985832.00',
              createdAt: '2023-12-19T17:39:32.000Z',
              updatedAt: '2023-12-22T17:39:32.000Z',
            },
            {
              id: 9,
              quantity: 5,
              productId: 20,
              orderId: 1,
              sumPrice: '4551500.00',
              createdAt: '2023-12-21T17:39:32.000Z',
              updatedAt: '2023-12-22T17:39:32.000Z',
            },
            {
              id: 10,
              quantity: 4,
              productId: 23,
              orderId: 1,
              sumPrice: '3630920.00',
              createdAt: '2023-12-20T17:39:32.000Z',
              updatedAt: '2023-12-22T17:39:32.000Z',
            },
          ],
        },
      ]);

      const app = new App([ordersRoute]);
      return request(app.getServer()).get(`${ordersRoute.path}`).expect(200);
    });
  });
});
