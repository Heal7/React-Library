import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import ModalComponent from '../base/ModalComponent';
import constants from '../../utils/constants';

const FormItem = Form.Item;

class RoleModal extends ModalComponent {

    constructor(props) {
        super(props);
        this.state = {
            id:this.props.record.id||-1,
            name:this.props.record.name||"",
            alias:this.props.record.alias||""
        };
    }

    okHandler = () => {
        const that = this;
        this.props.form.validateFields((err, item) => {
            if (!err) {
                that.setState({loading: true});
                that.props.onOk(that.state.id,item.name,item.alias,(result) =>{
                    if(result.status === constants.HttpStatus.OK){
                        that.hideModelHandler();
                        message.success(`操作成功`); 
                    }else{
                        message.error(`操作失败：${result.message}`);
                    }
                });
            }
        });
    };

    render() {
        const { children } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <span>
                <span onClick={this.showModelHandler}>
                    {children}
                </span>
                <Modal title={this.state.id == constants.DEFAULT ? "添加角色":"编辑角色"}
                    visible={this.state.visible}
                    confirmLoading={this.state.loading}
                    onOk={this.okHandler}
                    onCancel={this.hideModelHandler}
                    maskClosable={false} >
                        <Form>
                            <FormItem label="名称" hasFeedback={this.state.id == constants.DEFAULT}>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true ,message:"请输入名称！"}],
                                    initialValue:this.state.name
                                })(<Input disabled={this.state.id !== constants.DEFAULT} />)}
                            </FormItem>
                            <FormItem label="别名" hasFeedback >
                                {getFieldDecorator('alias', {
                                    rules: [{ required: true,message:"请输入别名！"}],
                                    initialValue:this.state.alias
                                })(<Input  />)}
                            </FormItem>
                        </Form>
                </Modal>
            </span>
        );
    }
}

export default Form.create()(RoleModal);