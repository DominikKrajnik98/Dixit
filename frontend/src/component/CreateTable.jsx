import React, { Component } from 'react';
import { Formik, Form, Field} from 'formik';
import CreateTableService from '../service/CreateTableService'

class CreateTable extends Component{

    constructor(props){
        super(props)
        this.state = {
            tableName: ''
        }
        this.onCreate=this.onCreate.bind(this);
    }

    onCreate(values){
        this.setState({tableName: values.tableName})
        console.log(values.tableName);
        CreateTableService.createNewTable(values.tableName)
        .then(()=>this.props.history.push('/waitingroom'))
    }

    render(){
        let tableName = this.state
        return(
            <div className="container">
                    <Formik 
                    initialValues={tableName}
                    onSubmit={this.onCreate}
                    >
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>Enter name fot the table</label>
                                        <Field className="form-control" type="text" name="tableName"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Create</button>
                                </Form>
                            )}
                    </Formik>
                </div>
        )
    }
}

export default CreateTable