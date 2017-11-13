import React from 'react';
import { Input, Icon } from 'antd';
import styles from './EditableCell.css';

export default class EditableCell extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            item:this.props.item,
            field:this.props.field,
            value: this.props.value,
            editable: false,
        };
    }
    handleChange = (e) => {
        this.setState({ value:e.target.value });
    }
    updateValue = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.item,this.state.field,this.state.value);
            let temp = this.state.item;
            temp[this.state.field] = this.state.value;
            this.setState({ item: temp });
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }
    render() {
        return (
        <div className={styles["editable-cell"]}>
            {this.state.editable ?
                <div className={styles["editable-cell-input-wrapper"]}>
                    <Input value={this.state.value} onChange={this.handleChange} onPressEnter={this.updateValue}/>
                    <Icon type="check" className={styles["editable-cell-icon-check"]} onClick={this.updateValue} />
                </div>
                :
                <div className={styles["editable-cell-text-wrapper"]}>
                    {this.state.value || ' '}
                    <Icon type="edit" className={styles["editable-cell-icon"]} onClick={this.edit}/>
                </div>
            }
        </div>
        );
    }
}