export default ({getState}) => dispatch => action =>{
    console.debug("改变前",getState());
    let result = dispatch(action);
    console.debug("改变后",result,"\n");
    return result;
};