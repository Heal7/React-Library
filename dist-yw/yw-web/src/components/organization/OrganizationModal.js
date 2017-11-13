import React from 'react';
import { Modal, Form, Input, message,Cascader } from 'antd';
import ModalComponent from '../base/ModalComponent';
import constants from '../../utils/constants';

const FormItem = Form.Item;

class OrganizationModal extends ModalComponent {

    constructor(props) {
        super(props);
        this.state = {
            name:this.props.record.name||"",
            orgs:this.props.orgs
        };
    }

    okHandler = () => {
        const that = this;
        this.props.form.validateFields((err, item) => {
            if (!err) {
                that.setState({loading: true});
                that.props.onOk(item.name,item.parent[item.parent.length-1],(result) =>{
                   if(result.status === constants.HttpStatus.OK){
                        that.hideModelHandler();
                        message.success(`组织机构添加成功`); 
                    }else{
                        message.error(`组织机构添加失败：${result.message}`);
                    }
                });
            }
        });
    };

    generatorOrgTree = (children) => {
         let data = [];
         children.forEach(item => {
            if(item.children == null){
                data.push({
                    value:item.id,
                    label:item.name
                });
            }else{
                data.push({
                    value:item.id,
                    label:item.name,
                    children:this.generatorOrgTree(item.children)
                });
            }
        })
        return data;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let data = this.generatorOrgTree(this.state.orgs);
        data.unshift({value:constants.ROOT,label:"根组织"});

        return (
            <span>
                <span onClick={this.showModelHandler}>
                    {this.props.children}
                </span>
                <Modal title="添加组织机构"
                    visible={this.state.visible}
                    confirmLoading={this.state.loading}
                    onOk={this.okHandler}
                    onCancel={this.hideModelHandler}
                    maskClosable={false} >
                        <Form>
                            <FormItem label="名称" hasFeedback>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true ,message:"请输入名称！"}],
                                    initialValue:this.state.name
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="所属组织">
                                {getFieldDecorator('parent', {
                                    initialValue: [constants.ROOT],
                                    rules: [{ type: 'array', required: true, message: '请输入此机构的所属机构!' }],
                                })( <Cascader showSearch changeOnSelect options={data} />)}
                            </FormItem>
                        </Form>
                </Modal>
            </span>
        );
    }
}

export default Form.create()(OrganizationModal);