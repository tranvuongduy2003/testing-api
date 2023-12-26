import { App } from '@/app';
import { TEST_TOKEN } from '@/config';
import { DB } from '@/database';
import { Role } from '@/interfaces/auth.interface';
import { AuthRoute } from '@/routes/auth.route';
import { UserRoute } from '@/routes/users.route';
import { match } from 'assert';
import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import request from 'supertest';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});
afterEach(() => {
  jest.resetAllMocks();
});
describe('Testing Users', () => {
  const usersRoute = new UserRoute();
  const authRoute = new AuthRoute();
  const app = new App([usersRoute, authRoute]);
  const { User } = DB;

  describe('[PUT] /users/profile', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    it('invalid token', async () => {
      return await request(app.getServer()).put(`${usersRoute.path}/profile`).set('Authorization', 'Bearer knacjasknc').expect(401);
    });

    it('requirements passed && valid format', async () => {
      // Step 1: Create a testing user
      return await request(app.getServer())
        .put(`${usersRoute.path}/profile`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send({ fullname: 'A new Name', phone: '12323123123123' })
        .expect(200)
        .then(res => {
          expect(res.body.message).toEqual('profile updated');
        });
    });
  });

  describe('[PATCH] /users/change-password', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    it('the old password is not right', async () => {
      User.create = jest.fn().mockReturnValue({
        id: 12,
        email: 'testUser@email.com',
        password: await bcrypt.hash('password', 10),
        fullname: 'Test User',
        phone: '1234567890',
        dob: new Date(),
        isActive: true,
        role: Role.CUSTOMER,
      });

      return await request(app.getServer())
        .patch(`${usersRoute.path}/change-password`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send({ oldPassword: 'wrongPass', newPassword: 'okokokokoko' })
        .expect(409)
        .then(res => {
          expect(res.body.message).toEqual(`Current password doesn't match`);
        });
    });

    it('requirements passed && valid format', async () => {
      User.findByPk = jest.fn().mockReturnValue({
        id: 123,
        email: 'testUser@email.com',
        password: await bcrypt.hash('Customer*123', 10),
        fullname: 'Test User',
        phone: '1234567890',
        dob: new Date(),
        isActive: true,
        role: Role.CUSTOMER,
      });

      bcrypt.compare = jest.fn().mockReturnValue(true);

      // Mocking User.update to simulate a successful update
      User.update = jest.fn().mockReturnValue([1]);

      return await request(app.getServer())
        .patch(`${usersRoute.path}/change-password`)
        .set('Authorization', `Bearer ${TEST_TOKEN}`)
        .send({ oldPassword: 'Customer*123', newPassword: 'okokok1212121' })
        .expect(200)
        .then(res => {
          expect(res.body.message).toEqual('ok');
        });
    });
  });

  // describe('[GET] /users', () => {
  //   // Loại bỏ các mock function đã khởi tạo sau mỗi test case.
  //   // Nếu không loại bỏ các mock function luôn tồn tại làm ảnh hưởng đến những test case khác.
  //   // Ta chỉ cần mock function riêng biệt trong mỗi test case mà thôi.
  //   // Ví dụ:
  //   // Khi gọi [GET] /users, server sẽ truy xuất DB để lấy tất cả user.
  //   // Trong khi đó khi testing ta chỉ cần 1 2 đối tượng user để kiểm tra mà thôi chứ ko cần cả DB.
  //   // Nhưng mà h sửa cái [GET] /users lấy vài cái thì nó sai với chức năng của route. (là lấy hêt)
  //   // Thì cách giải quyết là lúc test mình thay cái hàm get all bằng cái data.
  //   // Cứ gọi get all là cái data đó trả về. không trong môi trường test thì nó quay lại như bth
  //   // Ví dụ:
  //   // Để đăng nhập, ta cần phải gọi [POST] /auth/login r truyền email vs passworđ.
  //   // Nhưng mà khi test thì mình biết trước là nó trả về cái gì rôi. Vậy thì nó đang dư thừa tính toán chỗ login.
  //   // Khi dó mình tạo một cái mock function, nếu gọi route [POST] /auth/login thì trả
  //   // về luôn một cái token sẵn mà mình đặt trước vì mình biết cái token đó dúng rồi
  //   // và mình cũng ko cần kiểm tra cái đó. Công việc mình là đăng nhập để test các route khác nên mình
  //   // không quan tâm thực tế route login ra đúng hay sai.
  //   // Giống kiểu có đáp án sẵn cứ hỏi là trả lời y chang ấy, khỏi phải suy nghĩ.
  //   // Nhưng mà đáp án thì mỗi môn mỗi khác, thì như test case mỗi case mỗi mock khác nhau.
  //   // ĐỂ khỏi ảnh hưởng các mock lẫn nhạu thì mình dùng cái hàm following.
  //   afterEach(() => {
  //     jest.resetAllMocks();
  //   });
  //   it('invalid Token', async () => {
  //     return await request(app.getServer()).get(`${usersRoute.path}`).set('Authorization', `Bearer ${'asncakskcansc'}`).expect(401);
  //   });
  //   it('user not admin', async () => {
  //     // Mock User.findByPk with a testing data
  //     // Mock: when system call to User.findByPk function => User.findByPk immediately return
  //     // data in mockReturnValue without any caculation or DB searching.
  //     // Used in case when known data that we dont need to caculation again.
  //     // Sử dụng trong trường hợp dữ liệu đã được biết trước và không cần tính toán lại.
  //     // Hoặc khi muốn cố định dữ liệu nhằm hỗ trợ các trường hợp testing. (Cần A phải như thê này, cần B phải như
  //     // thế kia)
  //     User.findByPk = jest.fn().mockReturnValue({
  //       id: 9,
  //       email: 'testAdmin@email.com',
  //       password: await bcrypt.hash('123456', 10),
  //       fullname: 'Name1',
  //       phone: '0829440357',
  //       dob: new Date(),
  //       isActive: true,
  //       role: Role.CUSTOMER,
  //     });
  //     return await request(app.getServer())
  //       .get(`${usersRoute.path}`)
  //       .set('Authorization', `Bearer ${TEST_TOKEN}`)
  //       .expect(403)
  //       .then(res => {
  //         expect(res.body.message).toEqual("Cannot access role admin's resource");
  //       });
  //   });
  //   it('requirements passed && valid format', async () => {
  //     User.findByPk = jest.fn().mockReturnValue({
  //       id: 9,
  //       email: 'testAdmin@email.com',
  //       password: await bcrypt.hash('123456', 10),
  //       fullname: 'Name1',
  //       phone: '0829440357',
  //       dob: new Date(),
  //       isActive: true,
  //       role: Role.ADMIN,
  //     });
  //     User.findAll = jest.fn().mockReturnValue([
  //       {
  //         id: 1,
  //         email: 'test1@email.com',
  //         password: await bcrypt.hash('123456', 10),
  //         fullname: 'Name1',
  //         phone: '0829440357',
  //         dob: new Date(),
  //         isActive: true,
  //         role: Role.CUSTOMER,
  //       },
  //       {
  //         id: 2,
  //         email: 'test2@email.com',
  //         password: await bcrypt.hash('123456', 10),
  //         fullname: 'Name2',
  //         phone: '0829440357',
  //         dob: new Date(),
  //         isActive: true,
  //         role: Role.CUSTOMER,
  //       },
  //       {
  //         id: 3,
  //         email: 'test3@email.com',
  //         password: await bcrypt.hash('123456', 10),
  //         fullname: 'Name3',
  //         phone: '0829440357',
  //         dob: new Date(),
  //         isActive: true,
  //         role: Role.CUSTOMER,
  //       },
  //     ]);

  //     (Sequelize as any).authenticate = jest.fn();
  //     return await request(app.getServer())
  //       .get(`${usersRoute.path}`)
  //       .set('Authorization', `Bearer ${TEST_TOKEN}`)
  //       .expect(200)
  //       .then(res => {
  //         expect(res.body.data).toEqual(
  //           expect.arrayContaining([
  //             expect.objectContaining({
  //               id: expect.any(Number),
  //               email: expect.any(String),
  //               password: expect.any(String),
  //               fullname: expect.any(String),
  //               phone: expect.any(String),
  //               dob: expect.any(String),
  //               isActive: expect.any(Boolean),
  //               role: expect.any(String),
  //             }),
  //           ]),
  //         );
  //       });
  //   });
  // });

  // describe('[GET] /users/:id', () => {
  //   afterEach(() => {
  //     jest.resetAllMocks();
  //   });
  //   it('invalid token', async () => {
  //     return await request(app.getServer()).get(`${usersRoute.path}/1`).set('Authorization', 'Bearer knacjasknc').expect(401);
  //   });
  //   it('user not admin', async () => {
  //     User.findByPk = jest.fn().mockReturnValue({
  //       id: 9,
  //       email: 'testAdmin@email.com',
  //       password: await bcrypt.hash('123456', 10),
  //       fullname: 'Name1',
  //       phone: '0829440357',
  //       dob: new Date(),
  //       isActive: true,
  //       role: Role.CUSTOMER,
  //     });
  //     return await request(app.getServer())
  //       .get(`${usersRoute.path}/1`)
  //       .set('Authorization', `Bearer ${TEST_TOKEN}`)
  //       .expect(403)
  //       .then(res => {
  //         expect(res.body.message).toEqual("Cannot access role admin's resource");
  //       });
  //   });
  //   it('requirements passed && valid format', async () => {
  //     const testUser = {
  //       id: 9,
  //       email: 'testAdmin@email.com',
  //       password: await bcrypt.hash('123456', 10),
  //       fullname: 'Name1',
  //       phone: '0829440357',
  //       dob: new Date().toISOString(),
  //       isActive: true,
  //       role: Role.ADMIN,
  //     };
  //     User.findByPk = jest.fn().mockReturnValue(testUser);
  //     return await request(app.getServer())
  //       .get(`${usersRoute.path}/9`)
  //       .set('Authorization', `Bearer ${TEST_TOKEN}`)
  //       .expect(200)
  //       .then(async res => {
  //         expect(res.body.data).toEqual(testUser);
  //       });
  //   });
  // });

  // describe('[POST] /users', () => {
  //   afterEach(() => {
  //     jest.resetAllMocks();
  //   });
  //   it('invalid token', async () => {
  //     return await request(app.getServer()).post(`${usersRoute.path}`).set('Authorization', 'Bearer knacjasknc').expect(401);
  //   });
  //   it('user not admin', async () => {
  //     User.findByPk = jest.fn().mockReturnValue({
  //       id: 9,
  //       email: 'testAdmin@email.com',
  //       password: await bcrypt.hash('123456', 10),
  //       fullname: 'Name1',
  //       phone: '0829440357',
  //       dob: new Date(),
  //       isActive: true,
  //       role: Role.CUSTOMER,
  //     });
  //     return await request(app.getServer())
  //       .post(`${usersRoute.path}`)
  //       .set('Authorization', `Bearer ${TEST_TOKEN}`)
  //       .expect(403)
  //       .then(res => {
  //         expect(res.body.message).toEqual("Cannot access role admin's resource");
  //       });
  //   });
  //   it('email already existed', async () => {
  //     // Mocking the behavior of User.findOne to simulate an existing user with the same email
  //     User.findOne = jest.fn().mockReturnValue({
  //       id: 1,
  //       email: 'existing@email.com',
  //       password: await bcrypt.hash('password', 10),
  //       fullname: 'Existing User',
  //       phone: '1234567890',
  //       dob: new Date(),
  //       isActive: true,
  //       role: Role.ADMIN,
  //     });
  //     User.findByPk = jest.fn().mockReturnValue({
  //       id: 1,
  //       email: 'admin@email.com',
  //       password: await bcrypt.hash('password', 10),
  //       fullname: 'TEST ADMIN',
  //       phone: '1234567890',
  //       dob: new Date(),
  //       isActive: true,
  //       role: Role.ADMIN,
  //     });

  //     // Sending a request with an email that already exists
  //     return await request(app.getServer())
  //       .post(`${usersRoute.path}`)
  //       .set('Authorization', `Bearer ${TEST_TOKEN}`)
  //       .send({
  //         email: 'existing@email.com',
  //         password: 'newpassword',
  //         fullname: 'New User',
  //         phone: '9876543210',
  //         dob: new Date(),
  //         role: Role.ADMIN,
  //       })
  //       .expect(409)
  //       .then(res => {
  //         expect(res.body.message).toEqual('This email existing@email.com already exists');
  //       });
  //   });
  //   it('requirements passed && valid format', async () => {
  //     // Log the token for debugging
  //     console.log('Token:', TEST_TOKEN);

  //     User.findByPk = jest.fn().mockReturnValue({
  //       id: 1,
  //       email: 'admin@email.com',
  //       password: await bcrypt.hash('password', 10),
  //       fullname: 'TEST ADMIN',
  //       phone: '1234567890',
  //       dob: new Date(),
  //       isActive: true,
  //       role: Role.ADMIN,
  //     });
  //     const testUser = {
  //       email: 'testNewUser@email.com',
  //       password: '123456789',
  //       fullname: 'Name4',
  //       phone: '0829440227',
  //       dob: new Date().toISOString(),
  //       role: Role.CUSTOMER,
  //     };
  //     User.create = jest.fn().mockReturnValue({ isActive: true, ...testUser });

  //     await request(app.getServer())
  //       .post(`${usersRoute.path}`)
  //       .set('Authorization', `Bearer ${TEST_TOKEN}`)
  //       .send(testUser)
  //       .expect(201)
  //       .then(async res => {
  //         console.log('Response:', res.body); // Log the response for debugging
  //         expect(res.body.data).toEqual({ isActive: true, ...testUser });
  //       })
  //       .catch(error => {
  //         console.error('Error:', error); // Log any errors for debugging
  //         throw error;
  //       });
  //   });
  // });

  // describe('[PUT] /users/:id(\\d+)', () => {
  //   it('invalid token', async () => {
  //     return await request(app.getServer()).put(`${usersRoute.path}/1`).set('Authorization', 'Bearer knacjasknc').expect(401);
  //   });
  //   it('user not admin', async () => {
  //     User.findByPk = jest.fn().mockReturnValue({
  //       id: 9,
  //       email: 'testAdmin@email.com',
  //       password: await bcrypt.hash('123456', 10),
  //       fullname: 'Name1',
  //       phone: '0829440357',
  //       dob: new Date(),
  //       isActive: true,
  //       role: Role.CUSTOMER,
  //     });
  //     return await request(app.getServer())
  //       .put(`${usersRoute.path}/1`)
  //       .set('Authorization', `Bearer ${TEST_TOKEN}`)
  //       .expect(403)
  //       .then(res => {
  //         expect(res.body.message).toEqual("Cannot access role admin's resource");
  //       });
  //   });
  //   it('requirements passed && valid format', async () => {
  //     // Step 1: Create a testing user
  //     const testUser = {
  //       id: 9090,
  //       email: 'testUser@email.com',
  //       password: 'password',
  //       fullname: 'Test User',
  //       phone: '1234567890',
  //       dob: new Date(),
  //       isActive: true,
  //       role: Role.ADMIN,
  //     };
  //     User.findByPk = jest.fn().mockReturnValue(testUser);
  //     User.update = jest.fn().mockReturnValue([1]);

  //     return await request(app.getServer())
  //       .put(`${usersRoute.path}/9090`)
  //       .set('Authorization', `Bearer ${TEST_TOKEN}`)
  //       .send({ fullname: 'A new Name', phone: '0123421242' })
  //       .expect(200)
  //       .then(res => {
  //         expect(res.body.message).toEqual('updated');
  //       });
  //   });
  // });

  // describe('[DELETE] /users/:id(\\d+)', () => {
  //   it('invalid token', async () => {
  //     return await request(app.getServer()).delete(`${usersRoute.path}/1`).set('Authorization', 'Bearer knacjasknc').expect(401);
  //   });
  //   it('user not admin', async () => {
  //     User.findByPk = jest.fn().mockReturnValue({
  //       id: 9,
  //       email: 'testAdmin@email.com',
  //       password: await bcrypt.hash('123456', 10),
  //       fullname: 'Name1',
  //       phone: '0829440357',
  //       dob: new Date(),
  //       isActive: true,
  //       role: Role.CUSTOMER,
  //     });
  //     return await request(app.getServer())
  //       .delete(`${usersRoute.path}/1`)
  //       .set('Authorization', `Bearer ${TEST_TOKEN}`)
  //       .expect(403)
  //       .then(res => {
  //         expect(res.body.message).toEqual("Cannot access role admin's resource");
  //       });
  //   });
  //   it('requirements passed && valid format', async () => {
  //     // Step 1: Create a testing user
  //     const testUser = {
  //       id: 1818,
  //       email: 'testUser@email.com',
  //       password: 'password',
  //       fullname: 'Test User',
  //       phone: '1234567890',
  //       dob: new Date(),
  //       isActive: true,
  //       role: Role.ADMIN,
  //     };
  //     User.findByPk = jest.fn().mockReturnValue(testUser);
  //     User.destroy = jest.fn().mockReturnValue(1);

  //     return await request(app.getServer())
  //       .delete(`${usersRoute.path}/1818`)
  //       .set('Authorization', `Bearer ${TEST_TOKEN}`)
  //       .send({ fullname: 'A new Name', phone: '0123421242' })
  //       .expect(200)
  //       .then(res => {
  //         expect(res.body.message).toEqual('deleted');
  //       });
  //   });
  // });

  // describe('[PATCH] /users/change-status/:id/:isActive', () => {
  //   it('invalid token', async () => {
  //     return await request(app.getServer())
  //       .patch(`${usersRoute.path}/change-status/:id/:isActive`)
  //       .set('Authorization', 'Bearer knacjasknc')
  //       .expect(401);
  //   });
  //   it('user not admin', async () => {
  //     User.findByPk = jest.fn().mockReturnValue({
  //       id: 9,
  //       email: 'testAdmin@email.com',
  //       password: await bcrypt.hash('123456', 10),
  //       fullname: 'Name1',
  //       phone: '0829440357',
  //       dob: new Date(),
  //       isActive: true,
  //       role: Role.CUSTOMER,
  //     });
  //     return await request(app.getServer())
  //       .patch(`${usersRoute.path}/change-status/:id/:isActive`)
  //       .set('Authorization', `Bearer ${TEST_TOKEN}`)
  //       .expect(403)
  //       .then(res => {
  //         expect(res.body.message).toEqual("Cannot access role admin's resource");
  //       });
  //   });
  //   it('requirements passed && valid format', async () => {
  //     // Step 1: Create a testing user
  //     const testUser = {
  //       id: 1818,
  //       email: 'testUser@email.com',
  //       password: 'password',
  //       fullname: 'Test User',
  //       phone: '1234567890',
  //       dob: new Date(),
  //       isActive: true,
  //       role: Role.ADMIN,
  //     };
  //     User.findByPk = jest.fn().mockReturnValue(testUser);
  //     User.update = jest.fn().mockReturnValue(1);

  //     return await request(app.getServer())
  //       .patch(`${usersRoute.path}/change-status/1818/:isActive`)
  //       .set('Authorization', `Bearer ${TEST_TOKEN}`)
  //       .send({ isActive: false })
  //       .expect(200)
  //       .then(res => {
  //         expect(res.body.message).toEqual('user status updated');
  //       });
  //   });
  // });
});
