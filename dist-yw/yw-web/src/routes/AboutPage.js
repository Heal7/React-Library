import { Layout,Timeline,Icon,Card } from 'antd';
import MenuBar from '../framework/MenuBar';
import style from '../framework/MainLayout.css';

function AboutPage(){
    return (
        <Layout className={style.BaseLayout} style={{backgroundColor:"white"}}>
            <MenuBar pathname={"/about"} />
            <Layout style={{margin:"auto",padding:"10px ",width:"100%",backgroundColor:"white"}}>
                <Timeline className={style.About}>
                    <Timeline.Item dot={<Icon type="clock-circle" style={{ fontSize: '16px' }} />}>
                        <Card title="进行中" extra={<a href="#">详情</a>}>
                            <ul>
                                <li>1、登录模块；</li>
                                <li>2、统一模块访问权限控制；</li>
                                <li>3、组织机构模块；</li>
                                <li>4、角色管理模块；</li>
                                <li>5、用户管理模块。</li>
                            </ul>
                        </Card>
                    </Timeline.Item>
                    <Timeline.Item color="green" dot={<Icon type="check-circle" style={{ fontSize: '16px' }} />}>
                        <Card title="2017-05-17 V1.0.0" extra={<a href="#">详情</a>}>
                            <ul>
                                <li>1、登录模块；</li>
                                <li>2、统一模块访问权限控制；</li>
                                <li>3、组织机构模块；</li>
                                <li>4、角色管理模块；</li>
                                <li>5、用户管理模块。</li>
                            </ul>
                        </Card>
                    </Timeline.Item>
                </Timeline>
            </Layout>
        </Layout>
    );
}

export default AboutPage;