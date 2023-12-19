import { App } from '@/app';
import { TEST_TOKEN } from '@config';
import { DB } from '@database';
import { Role } from '@/interfaces/auth.interface';
import { AuthRoute } from '@/routes/auth.route';
import { UserRoute } from '@/routes/users.route';
import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response findAll users', async () => {
      const usersRoute = new UserRoute();
      const authRoute = new AuthRoute();
      const { User } = DB;

      User.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          email: 'test1@email.com',
          password: await bcrypt.hash('123456', 10),
          fullname: 'Name1',
          phone: '0829440357',
          dob: new Date(),
          isActive: true,
          role: Role.CUSTOMER,
        },
        {
          id: 2,
          email: 'test2@email.com',
          password: await bcrypt.hash('123456', 10),
          fullname: 'Name2',
          phone: '0829440357',
          dob: new Date(),
          isActive: true,
          role: Role.CUSTOMER,
        },
        {
          id: 3,
          email: 'test3@email.com',
          password: await bcrypt.hash('123456', 10),
          fullname: 'Name3',
          phone: '0829440357',
          dob: new Date(),
          isActive: true,
          role: Role.CUSTOMER,
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([authRoute, usersRoute]);
      request(app.getServer()).get(${usersRoute.path}).set('Authorization', Bearer ${token}).expect(200);
    })
  });
});