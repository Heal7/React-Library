import {connect} from 'dva';
import RoleList from '../components/role/RoleList';

function RolePage({RolePage}){
    return ( <RoleList {...RolePage} />);
}

function mapStateToProps({RolePage}){
    return {RolePage};
}

export default connect(mapStateToProps)(RolePage);