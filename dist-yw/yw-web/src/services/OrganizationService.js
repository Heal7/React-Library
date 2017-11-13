import {get,post,put,deleteData} from '../utils/request';

export function getAll() {
    return get(`yw/admin/orgs`);
}

export function deleteOrgs(ids) {
    return deleteData(`yw/admin/orgs`,ids);
}

export function addOrg(org) {
    return post(`yw/admin/org`,org);
}

export function updateOrg(org) {
    return put(`yw/admin/org`,org);
} 