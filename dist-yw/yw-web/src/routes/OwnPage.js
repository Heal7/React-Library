import { Layout,Timeline,Icon,Card } from 'antd';
import MenuBar from '../framework/MenuBar';
import style from '../framework/MainLayout.css';

function OwnPage(){
    return (
        <Layout className={style.BaseLayout} style={{backgroundColor:"white"}}>
            <MenuBar pathname={"/own"}/>
            <Layout>
                   Hello World
            </Layout>
        </Layout>
    );
}

export default OwnPage;