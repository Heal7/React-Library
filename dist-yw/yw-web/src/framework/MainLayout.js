import {connect} from 'dva';
import { Layout } from 'antd';
import MenuBar from './MenuBar';
import FeatureBar from './FeatureBar';
import styles from './MainLayout.css';

const { Content, Sider } = Layout;

function MainLayout({location,LoginPage,children}){
    return (
        <Layout className={styles.BaseLayout}>
            <MenuBar pathname={location.pathname} />
            <Layout>
                <Sider collapsible className={styles.FeatureBar}>
                    <FeatureBar pathname={location.pathname} />
                </Sider>
                <Layout style={{ padding: '0 0 0 10px' }}>
                    <Content className={styles.MainContent}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

function mapStateToProps({LoginPage}){
    return {LoginPage};
}

export default connect(mapStateToProps)(MainLayout);