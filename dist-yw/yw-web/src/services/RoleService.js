import {get,post,put,deleteData} from '../utils/request';

export function getAll() {
    return get(`yw/admin/roles`);
}

export function deleteRoles(ids) {
    return deleteData(`yw/admin/roles`,ids);
}

export function addRole(role) {
    return post(`yw/admin/role`,role);
}

export function updateRole(role) {
    return put(`yw/admin/role`,role);
}