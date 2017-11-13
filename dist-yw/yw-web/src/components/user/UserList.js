import { Table, message, Popconfirm } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import constants from '../../utils/constants';

const UserList = ({
    dispatch,
    total,
    current,
    loading,
    dataSource,
}) => {
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a href="#">{text}</a>,
  }, {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
  },{
      title: '网站',
      dataIndex: 'website',
      key: 'website',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={()=>{}}>编辑</a>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={()=>{}}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }];

function pageChangeHandler(pageIndex) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { pageIndex },
    }));
  }

	// 定义分页对象
  const pagination = {
    total:total,
    current:current,
    pageSize: constants.PAGESIZE,
    onChange: (pageIndex)=>{pageChangeHandler(pageIndex)}
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={pagination}
      />
    </div>
  );
}

export default connect()(UserList);