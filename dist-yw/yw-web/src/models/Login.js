import { message } from 'antd';
import {hashHistory} from 'dva/router';
import {login,sso,logout} from '../services/UserService';
import constants from '../utils/constants';

let ssoChecked = false;
let ssoRedirect = "/";

export default {
    namespace:constants.NAMESPACE.LoginPage,
    state:{
        loginname:"chenyp",
        password:"pass",
        loading:false,
        status:"登录",
        user:{}
    },
    effects:{
        *validate({payload}, { select, call, put }) {
            yield put({type: 'showLoading',payload});
            const result = yield call(login,payload);
            yield put({
                type:"loginComplete",
                payload:{user:result.data}
            });
            if(result.status === constants.HttpStatus.OK){
                message.success("登录成功",1,() => {hashHistory.push(ssoRedirect)});
            }else{
                message.error(`登录失败：${result.message}`);
            }
        },
        *sso({payload}, { select, call, put }) {
            ssoChecked = true;
            const result = yield call(sso);
            console.log(result)
            if(result.status === constants.HttpStatus.OK){
                yield put({
                    type:"loginComplete",
                    payload:{user:result.data}
                });
                hashHistory.push(payload.redirect);
            }else{
                hashHistory.push("/login?redirect="+payload.redirect);
            }
        },
        *logout({payload}, { select, call, put }) {
            ssoChecked = true;
            yield call(logout);
            hashHistory.push("/login");
        },
    },
    reducers:{
        showLoading(state,action){
            return {...state,...action.payload,loading:true,status:"正在登录"};
        },
        loginComplete(state,action){
            return {...state,...action.payload,loading:false,status:"登录",};
        }
    },
    subscriptions:{
        setup({dispatch,history}){
            history.listen(({pathname,query}) =>{
                ssoRedirect = query.redirect||"/";
                if(pathname === "/login" && ssoChecked === false){
                    dispatch({ type:"sso",payload:{
                        redirect:ssoRedirect
                    }});
                }
            });
        }
    }
}