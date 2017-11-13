import {connect} from 'dva';
import OrganizationList from '../components/organization/OrganizationList';

function OrganizationPage({dispatch,OrganizationPage}){
    return (<OrganizationList {...OrganizationPage} />);
}

function mapStateToProps({OrganizationPage}){
    return {OrganizationPage};
}

export default connect(mapStateToProps)(OrganizationPage);