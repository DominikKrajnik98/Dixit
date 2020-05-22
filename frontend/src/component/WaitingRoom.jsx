import React, { Component } from 'react';
import ShowPlayer from './ShowPlayer';
import ShowOtherPlayers from './ShowOtherPlayers';
import WaitingRoomService from '../service/WaitingRoomService';

class WaitingRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tables: [],
            alert:false
        }
        this.handleClick = this.handleClick.bind(this);
        this.refreshTables = this.refreshTables.bind(this);
        this.rowClick = this.rowClick.bind(this);
    }

    handleClick() {
        this.props.history.push(`/createtable`);
    }

    componentDidMount() {
        this.refreshTables()
        this.timer = setInterval(() => this.refreshTables(), 3000)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    async refreshTables() {
        WaitingRoomService.retriveAllTables()
            .then((response) => {
                this.setState({ tables: response.data })
            })
    }

    rowClick(value) {
        this.state.tables.map(
            table => {
                if (table.id === value) {
                    if (table.active) {
                        this.setState({alert:true})
                    }
                    else {
                        WaitingRoomService.addPlayer(value);
                        this.props.history.push(`/table/${value}`);
                    }
                }
                return table
            }
        )
    }

    render() {
        return (
            <div className="row long">
                <div className="col-md-10" >
                    <h2>Waiting Room </h2>{ this.state.alert &&
                    <div className="alert alert-warning alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Warning!</strong> This game has already started!
                    </div>
                    }
                    <div className="container">
                        <table className="table table-hover center">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Players</th>
                                    <th>Owner</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    this.state.tables.map(
                                        table =>
                                            <tr onClick={() => this.rowClick(table.id)} key={table.id} className="trMouseMove">
                                                <th>{table.id}</th>
                                                <th>{table.name}</th>
                                                <th>{table.users.map(
                                                    player =>
                                                        <div key={player.id} className="line">{player.name},&nbsp;</div>
                                                )}
                                                </th>
                                                <th>{table.owner.name}</th>
                                                <th>{table.active ? "Active" : "Not active"}</th>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <button type="button" className="btn btn-secondary" onClick={this.handleClick}> Add new table</button>
                    </div>
                </div>
                <div className="col-md-2 left-border long">
                    <ShowPlayer />
                    <ShowOtherPlayers />
                </div>
            </div>
        )
    }
}

export default WaitingRoom