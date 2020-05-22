import React, { Component } from 'react';
import isNil from "lodash/fp/isNil";


class ImageModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: props.text
        }
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    componentDidMount() {
        window.addEventListener("keyup", this.handleKeyUp, false);
        document.addEventListener("click", this.handleOutsideClick, false);
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this.handleKeyUp, false);
        document.removeEventListener("click", this.handleOutsideClick, false);
    }

    handleKeyUp(e) {
        const { onCloseRequest } = this.props;
        const keys = {
            27: () => {
                e.preventDefault();
                onCloseRequest();
                window.removeEventListener("keyup", this.handleKeyUp, false);
            }
        };

        if (keys[e.keyCode]) {
            keys[e.keyCode]();
        }
    }

    handleOutsideClick(e) {
        const { onCloseRequest } = this.props;

        if (!isNil(this.modal)) {
            if (!this.modal.contains(e.target)) {
                onCloseRequest();
                document.removeEventListener("click", this.handleOutsideClick, false);
            }
        }
    }

    render() {
        return (
            <div className="modal">
                <div className="modalImage" ref={node => (this.modal = node)}>
                    <img src={this.state.text} className="rounded image" alt="obrazek dixit powiekszony"/>
                </div>
            </div>
        )
    }
}

export default ImageModal;