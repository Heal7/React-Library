import { request, get, post } from '../utils/request';

export function query({ pageIndex, pageSize }) {
    return request(`users?_page=${pageIndex}&_limit=${pageSize}`);
}

export function login(loginUser) {
    return post(`yw/login`, loginUser);
}

export function sso() {
    return get(`yw/sso`);
}

export function logout() {
    return get(`yw/logout`);
}
