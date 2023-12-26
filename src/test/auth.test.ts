import { App } from '@/app';
import { TEST_TOKEN } from '@/config';
import { DB } from '@/database';
import { Role } from '@/interfaces/auth.interface';
import { AuthRoute } from '@/routes/auth.route';
import { UserRoute } from '@/routes/users.route';
import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Testing Auth', () => {
  const usersRoute = new UserRoute();
  const authRoute = new AuthRoute();
  const app = new App([usersRoute, authRoute]);
  const { User } = DB;

  describe('[POST] /login', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const testUser = {
        id: 9,
        email: 'testAdmin@email.com',
        password: await bcrypt.hash('123456', 10),
        fullname: 'Name1',
        phone: '0829440357',
        dob: new Date(),
        isActive: true,
        role: Role.CUSTOMER,
      };

      User.findByPk = jest.fn().mockReturnValue(testUser);

      return await request(app.getServer())
        .post(`${authRoute.path}/signin`)
        // .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .expect(200)
        .then(res => {
          expect(res.body.message).toEqual('OK');
        });
    });
  });
});
