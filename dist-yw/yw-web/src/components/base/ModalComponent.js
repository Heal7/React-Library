import React from 'react';

class ModalComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false
        };
    }

    showModelHandler = (e) => {
        if (e) e.stopPropagation();
        this.setState({
            visible: true,
        });
    };

    hideModelHandler = () => {
        this.setState({
            visible: false,
            loading: false
        });
    };

    okHandler = () => {};

    render() {
        return (
            <div>Hello，ModalComponent</div>
        );
    }
}

export default ModalComponent;