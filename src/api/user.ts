import http from "./http";
export type UserResult = {
    avatar: string;
    username: string;
    password: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** 按钮级别权限 */
    permissions: Array<string>;
    accessToken: string;
    registeredAt: string;
    email: string;
    refreshToken: string;
    userId: string;
    expires: Date;
    name: string
};

export const getLogin = (data?: object) => {
    return http.get<UserResult>("login", { data });
}