import React, { Component } from 'react';
import ShowPlayersService from '../service/ShowPlayersService';


class ShowOtherPlayers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            players: []
        }
        this.showPlayers = this.showPlayers.bind(this)
        this.showPlayersInGame = this.showPlayersInGame.bind(this)
    }

    componentDidMount() {
        if (this.props.tableId != null)
            this.timer = setInterval(() => this.showPlayersInGame(), 2000);
        else
            this.timer = setInterval(() => this.showPlayers(), 2000);
    }

    async showPlayers() {
        const name = localStorage.getItem("Name")
        ShowPlayersService.getAllUsers(name)
            .then(response => {
                this.setState({ players: response.data })
            }
            )
    }
    async showPlayersInGame() {
        ShowPlayersService.getAllPlayers(this.props.tableId)
            .then(response => {
                this.setState({ players: response.data })
            })
        this.props.countPlayers(this.state.players.length);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div className="container top">
                {((this.props.tableId == null) &&
                    <h5>Other players:</h5>) ||
                    (<div>
                        <h5>Players:</h5>
                        <div>
                            {
                                this.state.players && this.state.players.length > 0 &&
                                this.state.players.map(
                                    (player, i) =>
                                        <div key={player.id}>
                                            {player.name}
                                        </div>
                                )
                            }
                        </div>
                    </div>
                    )
                }
            </div>
        )
    }
}

export default ShowOtherPlayers