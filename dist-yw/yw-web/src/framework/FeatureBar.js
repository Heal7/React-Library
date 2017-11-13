import {Link} from 'dva/router';
import { Menu, Icon,Tooltip } from 'antd';
import styles from './MainLayout.css';

export default ({pathname}) => {
    return (
        <Menu selectedKeys={[pathname]} mode="inline" style={{ height: '100%' }}>
            <Menu.Item key="/orgs">
                <Tooltip placement="right" title="组织机构管理">
                    <Link to="/orgs" activeClassName={styles.ActiveFeature}><Icon type="team" /><span>组织机构</span></Link>
                </Tooltip>
            </Menu.Item>
            <Menu.Item key="/roles">
                <Tooltip placement="right" title="角色管理">
                    <Link to="/roles" activeClassName={styles.ActiveFeature}><Icon type="solution" /><span>角色</span></Link>
                </Tooltip>
            </Menu.Item>
            <Menu.Item key="/users">
                <Tooltip placement="right" title="用户管理">
                    <Link to="/users" activeClassName={styles.ActiveFeature}><Icon type="user" /><span>用户</span></Link>
                </Tooltip>
            </Menu.Item>
        </Menu>
    );
}