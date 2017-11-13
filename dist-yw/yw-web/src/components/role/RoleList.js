import { Table, Popconfirm,Button,Icon,Modal } from 'antd';
import { connect } from 'dva';
import RoleModal from './RoleModal';
import constants from '../../utils/constants';

const RoleList = ({ dispatch, loading,roles,selectedRowKeys }) => {
    const columns = [
        {title: 'ID',dataIndex: 'id',key: 'id'}, 
        {title: '名称',dataIndex: 'name',key: 'name'}, 
        {title: '别名',dataIndex: 'alias',key: 'alias'},
        {title: '操作',key: 'operation',render: (text, record) => (
            <p>
                <RoleModal record={record} onOk={opeOK}>
                    <a>编辑</a>
                </RoleModal>
                &nbsp;
                <Popconfirm title="确定要删除吗？" onConfirm={()=>deleteSelect(record.id)}>
                    <a>删除</a>
                </Popconfirm>
            </p>)
        }
    ];

    function opeOK(id,name,alias,callback){
        if(id == constants.DEFAULT){
            dispatch({
                type:constants.NAMESPACE.RolePage+"/addRole",
                payload:{role:{name,alias},callback}
            });
        }else{
            dispatch({
                type:constants.NAMESPACE.RolePage+"/updateRole",
                payload:{role:{id,name,alias},callback}
            });
        }
    }

    function confirmDelete(){
        Modal.confirm({
            title: `确定删除这${selectedRowKeys.length}项角色吗？`,
            onOk() {
                deleteSelect();
            }
        });
    }

    function deleteSelect(id){
        dispatch({
            type:constants.NAMESPACE.RolePage+"/deleteRoles",
            payload:{
                selectedRowKeys: isNaN(id) ? selectedRowKeys:[id]
            }
        });
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: function(selectedRowKeys){
            dispatch({
                type:constants.NAMESPACE.RolePage+"/selectRow",
                payload:{
                    selectedRowKeys:selectedRowKeys
                }
          });
        }
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div>
            <div style={{ marginBottom: 10 }}>
                <RoleModal key={constants.getKey()} record={{}} onOk={opeOK}>
                    <Button type="primary" icon="plus" >添加角色</Button>
                </RoleModal>
                <Button type="primary" style={{ marginLeft: 8 }} icon="delete" onClick={confirmDelete} disabled={!hasSelected}>删除角色</Button>
                <span style={{ marginLeft: 8 }}>{hasSelected ? `选中了 ${selectedRowKeys.length} 项` : ''}</span>
            </div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={roles}
                loading={loading}
                pagination={false}
                rowKey={record => record.id}/>
        </div>
    );
}

export default connect()(RoleList);