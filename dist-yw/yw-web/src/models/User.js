import {query} from '../services/UserService';
import constants from '../utils/constants';

export default {
    namespace:constants.NAMESPACE.UserPage,
    state:{
        dataSource:[],
        total:null,
        loading:false,
        current:null,
    },
    effects:{
        *query({payload}, { select, call, put }) {
            yield put({ type: 'showLoading' });
            let loginUser = yield select(state => state.LoginPage);
            const {data,headers} = yield call(query,payload);
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        dataSource: data,
                        total: headers['total-count'],
                        current: payload.pageIndex
                    }
                });
            }
        },
        *create(){},
        *'delete'(){},
        *update(){}
    },
    reducers:{
        showLoading(state,action){
            return {...state,loading:true};
        },
        showModal(){},
        hideModal(){},
        querySuccess(state,action){
            return {...state,...action.payload,loading:false};
        },
        createSuccess(){},
        deleteSuccess(){},
        updateSuccess(){}
    },
    subscriptions:{
        setup({dispatch,history}){
            history.listen(({pathname,query}) =>{
                if(pathname === "/users"){
                    let pageIndex = query.pageIndex === undefined ? 1: Number.parseInt(query.pageIndex);
                    dispatch({
                        type:"query",
                        payload:{
                            pageIndex:pageIndex,
                            pageSize:constants.PAGESIZE
                        }
                    });
                }
            });
        }
    }
}