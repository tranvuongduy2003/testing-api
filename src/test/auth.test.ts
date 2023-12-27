import { App } from '@/app';
import { DB } from '@/database';
import { AuthRoute } from '@/routes/auth.route';
import bcrypt from 'bcrypt'; // Import phương thức hash từ bcrypt
import request from 'supertest';
import { Role } from './../interfaces/auth.interface';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /auth/signup', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Should sign up with valid data', async () => {
      const authRoute = new AuthRoute();
      const { User } = DB;
      const userData = {
        email: 'newuser@example.com',
        password: 'password123',
        fullname: 'New User',
        phone: '0123456789',
        dob: new Date(),
        role: Role.CUSTOMER,
      };

      User.findOne = jest.fn().mockReturnValue(null);

      User.create = jest.fn().mockReturnValue({ isActive: true, ...userData });

      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`${authRoute.path}/signup`)
        .send(userData)
        .expect(201)
        .then(res => {
          expect(res.body.message).toEqual('signup');
          const user = res.body.data;
          expect(user).toEqual({
            email: 'newuser@example.com',
            password: 'password123',
            fullname: 'New User',
            phone: '0123456789',
            dob: expect.any(String),
            role: 'CUSTOMER',
            isActive: true,
          });
        });
    }),
      it('Should throw exception with empty data', async () => {
        const authRoute = new AuthRoute();
        const { User } = DB;
        const userData = {
          email: null,
          password: null,
          fullname: null,
          phone: null,
          dob: null,
          role: null,
        };

        const app = new App([authRoute]);
        return request(app.getServer())
          .post(`${authRoute.path}/signup`)
          .send(userData)
          .expect(400)
          .then(res => {
            expect(res.body.message).toEqual(
              'email must be an email, password must be shorter than or equal to 32 characters,password must be longer than or equal to 8 characters,password should not be empty,password must be a string',
            );
          });
      }),
      it('should throw HttpException when email is already in use', async () => {
        const authRoute = new AuthRoute();
        const { User } = DB;
        const userData = {
          email: 'newuser@example.com',
          password: 'password123',
          fullname: 'New User',
          phone: '0123456789',
          dob: new Date(),
          role: Role.CUSTOMER,
        };

        User.findOne = jest.fn().mockReturnValue({
          email: 'newuser@example.com',
          password: await bcrypt.hash('password123', 10),
          fullname: 'New User',
          phone: '0123456789',
          dob: new Date(),
          role: Role.CUSTOMER,
        });

        User.create = jest.fn().mockReturnValue({ isActive: true, ...userData });

        const app = new App([authRoute]);
        return request(app.getServer())
          .post(`${authRoute.path}/signup`)
          .send(userData)
          .expect(409)
          .then(res => {
            expect(res.body.message).toEqual(`This email ${userData.email} already exists`);
          });
      });
  }),
    describe('[POST] /auth/login', () => {
      it('Should login with valid data and active account', async () => {
        const authRoute = new AuthRoute();
        const { User } = DB;

        User.findOne = jest.fn().mockReturnValue({
          id: 9,
          email: 'user@example.com',
          password: await bcrypt.hash('password123', 10),
          fullname: 'Name User',
          phone: '0123456789',
          dob: new Date(),
          role: Role.CUSTOMER,
          isActive: true,
        });

        const app = new App([authRoute]);
        return request(app.getServer())
          .post(`${authRoute.path}/login/`)
          .send({
            email: 'user@example.com',
            password: 'password123',
          })
          .expect(200)
          .then(res => {
            expect(res.body.message).toEqual('login');
          });
      }),
        it('Should throw exception with empty data', async () => {
          const authRoute = new AuthRoute();
          const { User } = DB;
          const userData = {
            email: null,
            password: null,
          };

          const app = new App([authRoute]);
          return request(app.getServer())
            .post(`${authRoute.path}/login`)
            .send(userData)
            .expect(400)
            .then(res => {
              expect(res.body.message).toEqual('email must be an email, password must be a string');
            });
        }),
        it('Should not login with disabled account', async () => {
          const authRoute = new AuthRoute();
          const { User } = DB;

          User.findOne = jest.fn().mockReturnValue({
            id: 9,
            email: 'user@example.com',
            password: await bcrypt.hash('password123', 10),
            fullname: 'Name User',
            phone: '0123456789',
            dob: new Date(),
            role: Role.CUSTOMER,
            isActive: false,
          });

          const app = new App([authRoute]);
          return request(app.getServer())
            .post(`${authRoute.path}/login/`)
            .send({
              email: 'user@example.com',
              password: 'password123',
            })
            .expect(409)
            .then(res => {
              expect(res.body.message).toEqual('This user was disabled');
            });
        }),
        it('Should not login with wrong email', async () => {
          const authRoute = new AuthRoute();
          const { User } = DB;

          const userData = {
            email: 'wronguser@example.com',
            password: 'password123',
          };

          User.findOne = jest.fn().mockReturnValue(null);

          const app = new App([authRoute]);
          return request(app.getServer())
            .post(`${authRoute.path}/login/`)
            .send(userData)
            .expect(409)
            .then(res => {
              expect(res.body.message).toEqual(`This email ${userData.email} was not found`);
            });
        });

      it('Should not login with wrong password', async () => {
        const authRoute = new AuthRoute();
        const { User } = DB;

        User.findOne = jest.fn().mockReturnValue({
          id: 9,
          email: 'user@example.com',
          password: await bcrypt.hash('password', 10),
          fullname: 'Name User',
          phone: '0123456789',
          dob: new Date(),
          role: Role.CUSTOMER,
          isActive: true,
        });

        const app = new App([authRoute]);
        return request(app.getServer())
          .post(`${authRoute.path}/login/`)
          .send({
            email: 'user@example.com',
            password: 'password123',
          })
          .expect(409)
          .then(res => {
            expect(res.body.message).toEqual('Password not matching');
          });
      });
    });
});
