import { Table, Popconfirm,Button,Icon,message,Modal } from 'antd';
import { connect } from 'dva';
import OrganizationModal from './OrganizationModal';
import EditableCell from '../base/EditableCell';
import constants from '../../utils/constants';

const OrganizationList = ({ dispatch, loading, orgs, selectedRowKeys }) => {
    const columns = [
        {title: 'ID',dataIndex: 'id',key: 'id'}, 
        {title: '名称',dataIndex: 'name',key: 'name',width:"70%",render: (text, record, index) => (
            <EditableCell item={record} value={text} field="name" onChange={updateOrganization} />
        )},
        {title: '操作',key: 'operation',render: (text, record) => (
        <p>
            <a onClick={() => console.log(record)}>添加子机构</a>
            &nbsp;
            <Popconfirm title="确定要删除吗？" onConfirm={()=>deleteSelect(record.id)}>
                <a>删除</a>
            </Popconfirm>
        </p>)
    }];


    function opeOK(name,parent,callback){
        dispatch({
            type:constants.NAMESPACE.OrganizationPage+"/addOrg",
            payload:{org:{name,parent},callback}
        });
    }

    function updateOrganization(item,field,value){
        if(value.length == 0){
            message.error("组织机构名称不允许为空，请重新设置！");
        }else{
            if(item[field] != value && value.length > 0){
                dispatch({
                    type:constants.NAMESPACE.OrganizationPage+"/updateOrgs",
                    payload:{
                        id:item.id,
                        name:value,
                        parent:item.parent,
                        sort:item.sort
                    }
                });
            }
        }
    }

    function confirmDelete(){
        Modal.confirm({
            title: `确定删除这${selectedRowKeys.length}项组织机构吗？`,
            onOk() {
                deleteSelect();
            }
        });
    }

    function deleteSelect(id){
       dispatch({
            type:constants.NAMESPACE.OrganizationPage+"/deleteOrgs",
            payload:{
                selectedRowKeys: isNaN(id) ? selectedRowKeys:[id]
            }
        });
    }


    const rowSelection = {
        selectedRowKeys,
        onChange: function(keys){
            //TODO: 找出新增的key、删除的key，用于动态设置选中项
            console.log(selectedRowKeys)
            console.log(keys);
            dispatch({
                type:constants.NAMESPACE.OrganizationPage+"/updateState",
                payload:{ selectedRowKeys:keys}
            });
        }
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div>
            <div style={{ marginBottom: 10 }}>
                <OrganizationModal key={constants.getKey()} orgs={orgs} record={{}} onOk={opeOK}>
                    <Button type="primary" icon="plus" >添加组织机构</Button>
                </OrganizationModal>
                <Button type="primary" style={{ marginLeft: 8 }} icon="delete" onClick={confirmDelete} disabled={!hasSelected}>删除组织机构</Button>
                <span style={{ marginLeft: 8 }}>{hasSelected ? `选中了 ${selectedRowKeys.length} 项` : ''}</span>
            </div>
            <Table columns={columns} 
                rowSelection={rowSelection} 
                pagination={false}
                dataSource={orgs} 
                rowKey={record => record.id} />
        </div>
    );
}

export default connect()(OrganizationList);