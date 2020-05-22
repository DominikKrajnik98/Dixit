import React, {Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogIn from './LogIn';
import WaitingRoom from './WaitingRoom';
import CreateTable from './CreateTable';
import Table from './Table';

class DixitApp extends Component {

    render() {
        return (
            <Router>
                <>
                    <h1>Dixit App created by Czajnik</h1>
                    <Switch>
                        <Route path="/" exact component={LogIn} />
                        <Route path="/waitingroom" exact component={WaitingRoom} />
                        <Route path="/createtable" exact component={CreateTable} />
                        <Route path="/table/:id" exact component={Table} />
                        <Route component={LogIn}/>
                    </Switch>

                </>
            </Router>
        )
    }
}

export default DixitApp