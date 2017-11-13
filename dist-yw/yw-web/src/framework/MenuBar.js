import { connect } from 'dva';
import { IndexLink, Link, hashHistory, routerRedux } from 'dva/router';
import { Layout, Menu, Icon } from 'antd';
import constants from '../utils/constants';
import styles from './MainLayout.css';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

function MenuBar({ dispatch, pathname, LoginPage }) {
    if (LoginPage.user.id === undefined) {
        dispatch({
            type: constants.NAMESPACE.LoginPage + '/sso',
            payload: { redirect: pathname }
        });
    }

    function logout() {
        dispatch({ type: constants.NAMESPACE.LoginPage + '/logout' });
    }

    function getOwnResource() {
        dispatch(routerRedux.push({ pathname: '/own' }));
    }

    return (
        <Header>
            <div className={styles.Logo} />
            <div className={styles.UserInfo} >
                <Menu theme='dark' mode='horizontal' style={{ lineHeight: '64px' }}>
                    <SubMenu title={<span><Icon type='user' />{LoginPage.user.username || '未登录'}</span>}>
                        <Menu.Item><Link to='/own' activeClassName={styles.ActiveFeature}><span>我的资源</span></Link></Menu.Item>
                        <Menu.Item><div>修改信息</div></Menu.Item>
                        <Menu.Item>
                            <div onClick={logout}>退出登录</div>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
            <Menu theme='dark' mode='horizontal' style={{ lineHeight: '64px', border: 'none' }}>
                <Menu.Item>
                    <IndexLink to='/' activeClassName={styles.ActiveFeature}><Icon type='home' />首页</IndexLink>
                </Menu.Item>
                <Menu.Item>
                    <a ><Icon type='appstore' />系统</a>
                </Menu.Item>
                <SubMenu title={<span><Icon type='database' />数据库</span>}>
                    <Menu.Item style={{ textAlign: 'center' }}><a href={`http://localhost:8080/dist-yw/db`} target='_blank'><Icon type='search' />查看</a></Menu.Item>
                    <Menu.Item style={{ textAlign: 'center' }}><a href={`http://localhost:8080/dist-yw/druid/index.html`} target='_blank'><Icon type='line-chart' />监控</a></Menu.Item>
                </SubMenu>
                <Menu.Item>
                    <a href={`http://localhost:8080/dist-yw/swagger-ui.html`} target='_blank'><Icon type='book' />API文档</a>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/about' activeClassName={styles.ActiveFeature}><Icon type='info-circle' /><span>关于</span></Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
}

function mapStateToProps({ LoginPage }) {
    return { LoginPage };
}

export default connect(mapStateToProps)(MenuBar);