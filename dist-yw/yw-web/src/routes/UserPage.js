import {connect} from 'dva';
import UserList from '../components/user/UserList';

function UserPage({dispatch,UserPage}){
    const {loading, dataSource, total, current} = UserPage;
    const userListProps={
        dataSource,
		total,
		loading,
		current
    };
    return (
        <div>
            <UserList {...userListProps}></UserList>
        </div>
    );
}

function mapStateToProps({UserPage}){
    return {UserPage};
}

export default connect(mapStateToProps)(UserPage);