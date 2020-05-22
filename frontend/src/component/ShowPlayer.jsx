import React, { Component } from 'react';


class ShowPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }

    render() {
        const name = localStorage.getItem("Name")
        if (name != null) {
            return (
                <div className="container bottom">
                    <p>{name}</p>
                </div>
            )
        }

        return (
            <div className="bottom">
                <button type="button" class="btn btn-info" onClick={() => this.props.history.push('/')}>
                    Please log in
                </button>
            </div>
        )

    }
}

export default ShowPlayer