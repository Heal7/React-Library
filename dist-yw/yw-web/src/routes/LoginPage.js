import {connect} from 'dva';
import {Form,Layout} from 'antd';
const { Header, Footer, Content } = Layout;
import LoginForm from '../components/login/LoginForm';
import styles from '../framework/MainLayout.css';

function LoginPage({LoginPage}){
    const WrappedLoginForm = Form.create()(LoginForm);
    return (
        <Layout style={{height:"100%"}}>
            <Header>
                <div className={styles.Logo} />
            </Header>
            <Content style={{ backgroundColor: 'white'}}>
                <WrappedLoginForm {...LoginPage} />
            </Content>
            <Footer className={styles.Footer}>上海数慧系统技术有限公司 ● 运维平台V1.0.0</Footer>
        </Layout>
    );
}

function mapStateToProps({LoginPage}){
    return {LoginPage};
}

export default connect(mapStateToProps)(LoginPage);