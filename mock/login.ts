// 根据角色动态生成路由
import { faker } from '@faker-js/faker';

export default [
  {
    url: "/api/login",
    method: "get",
    response: ({ body }: any) => {
      if (body.username === "admin") {
        return {
          success: true,
          code: 200,
          data: {
            accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
            roles: ["admin"],
            userId: faker.string.uuid(),
            username: faker.internet.username(), // before version 9.1.0, use userName()
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            password: faker.internet.password(),
            expires: faker.date.birthdate(),
            registeredAt: faker.date.past(),
          }
        };
      } else {
        return {
          success: true,
          code: 200,
          data: {
            roles: ["common"],
            permissions: ["permission:btn:add", "permission:btn:edit"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.common",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.commonRefresh",
            expires: faker.date.birthdate(),
            userId: faker.string.uuid(),
            username: faker.internet.username(), // before version 9.1.0, use userName()
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            password: faker.internet.password(),
            registeredAt: faker.date.past(),
          }
        };
      }
    }
  }
];
