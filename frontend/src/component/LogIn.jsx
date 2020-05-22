import React,{Component} from 'react';
import { Formik, Form, Field } from 'formik';
import LogInFormService from '../service/LogInFormService';

class LogIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: ''
        }
        this.onConfirme = this.onConfirme.bind(this)
    }

    onConfirme(values){
        LogInFormService.sendNewUser(values.name)
        .then(()=> this.props.history.push('/waitingroom'))
        .catch(error => {
            console.log(error.response)
        });
        localStorage.setItem('Name',values.name)
    }

    render() {
        let name = this.state
        return (
            <div>
                <div className="container">
                    <Formik 
                    initialValues={name}
                    onSubmit={this.onConfirme}
                    >
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>Enter User Name</label>
                                        <Field className="form-control" type="text" name="name" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Confirme</button>
                                </Form>
                            )}
                    </Formik>
                </div>
            </div>
        )
    }
}

export default LogIn