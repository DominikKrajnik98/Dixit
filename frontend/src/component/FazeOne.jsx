import React, { Component } from 'react';

class FazeOne extends Component{
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        this.props.onDescription(event.target.value)
    }

    render(){
        return(
            <div className="form-group container">
                <label>Enter the description of the image:</label>
                <input type="text" className="form-control" id="description" onChange={this.handleChange}/>
            </div>
        )
    }
}

export default FazeOne;