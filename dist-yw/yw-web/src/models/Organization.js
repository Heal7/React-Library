import { message } from 'antd';
import * as OrganizationService from '../services/OrganizationService';
import constants from '../utils/constants';

export default {
    namespace:constants.NAMESPACE.OrganizationPage,
    state:{
        loading:false,
        selectedRowKeys:[],
        orgs:[]
    }, 
    effects:{
        *getAll({payload}, { call, put }) {
            yield put({ type: 'updateState',payload:{loading:true} });
            const result = yield call(OrganizationService.getAll);
            console.log(result)
            if(result.status === constants.HttpStatus.OK){
                yield put({ type: 'queryComplete', payload: {orgs:result.data} });
            }else{
                message.error(`获取组织机构失败：${result.message}`);
            }
        },
        *addOrg({payload}, { call, put }) {
            const result = yield call(OrganizationService.addOrg,payload.org);
            if(result.status === constants.HttpStatus.OK){
                yield put({type: 'getAll'});
            }
            payload.callback(result);
        },
        *updateOrgs({payload}, { call, put }) {
            yield put({ type: 'updateState',payload:{loading:true} });
            const result = yield call(OrganizationService.updateOrg,payload);
            if(result.status === constants.HttpStatus.OK){
                message.success(`组织机构修改成功`);
                yield put({type: 'getAll'});
            }else{
                message.error(`组织机构修改失败：${result.message}`);
            }
        },
        *deleteOrgs({payload}, { call, put }) {
            yield put({ type: 'updateState',payload:{loading:true} });
            const result = yield call(OrganizationService.deleteOrgs,payload.selectedRowKeys);
            if(result.status === constants.HttpStatus.OK){
                message.success(`成功删除组织机构`);
                yield put({type: 'getAll'});
            }else{
                message.error(`组织机构删除失败：${result.message}`);
            }
        },
    },
    reducers:{
        queryComplete(state,action){
            return {...state,...action.payload,loading:false,selectedRowKeys:[]};
        },
        updateState(state,action){
            return {...state,...action.payload};
        }
    },
    subscriptions:{
        setup({dispatch,history}){
            history.listen(({pathname,query}) =>{
                if(pathname === "/orgs"){
                    dispatch({ type:"getAll"});
                }
            });
        }
    }
}