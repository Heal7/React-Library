import { message } from 'antd';
import * as RoleService from '../services/RoleService';
import constants from '../utils/constants';

export default {
    namespace:constants.NAMESPACE.RolePage,
    state:{
        loading:false,
        selectedRowKeys:[],
        roles:[],
    },
    effects:{
        *getAll({payload}, { call, put }) {
            yield put({ type: 'showLoading' });
            const result = yield call(RoleService.getAll,payload);
            if(result.status === constants.HttpStatus.OK){
                yield put({
                    type: 'queryComplete',
                    payload: {roles:result.data}
                });
            }else{
                message.error(`获取角色失败：${result.message}`);
            }
        },
        *deleteRoles({payload}, { call, put }) {
            yield put({ type: 'showLoading' });
            const result = yield call(RoleService.deleteRoles,payload.selectedRowKeys);
            if(result.status === constants.HttpStatus.OK){
                message.success(`成功删除角色`);
                yield put({type: 'getAll'});
            }else{
                message.error(`删除角色失败：${result.message}`);
            }
        },
        *addRole({payload}, { call, put }) {
            const result = yield call(RoleService.addRole,payload.role);
            if(result.status === constants.HttpStatus.OK){
                yield put({type: 'getAll'});
            }
            payload.callback(result);
        },
        *updateRole({payload}, { call, put }) {
            const result = yield call(RoleService.updateRole,payload.role);
            if(result.status === constants.HttpStatus.OK){
                yield put({type: 'getAll'});
            }
            payload.callback(result);
        }
    },
    reducers:{
        showLoading(state,action){
            return {...state,loading:true};
        },
        queryComplete(state,action){
            return {...state,...action.payload,loading:false,selectedRowKeys:[]};
        },
        selectRow(state,action){
            return {...state,...action.payload};
        }
    },
    subscriptions:{
        setup({dispatch,history}){
            history.listen(({pathname,query}) =>{
                if(pathname === "/roles"){
                    dispatch({ type:"getAll"});
                }
            });
        }
    }
}