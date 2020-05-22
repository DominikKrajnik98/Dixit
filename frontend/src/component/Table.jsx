import React, { Component } from 'react';
import ImagesDisplay from './imagesDisplay/ImagesDisplay'
import WaitingRoomService from '../service/WaitingRoomService'
import ShowOtherPlayers from './ShowOtherPlayers';
import GameService from '../service/GameService';

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            owner: false,
            active: false,
            yourName: localStorage.getItem("Name"),
            countOfPlayers: 0,
            visibility: false
        }
        this.startGame = this.startGame.bind(this)
        this.checkForStart = this.checkForStart.bind(this)
        this.countPlayers = this.countPlayers.bind(this)
    }

    componentDidMount() {
        WaitingRoomService.retriveTable(this.props.match.params.id)
            .then((response) => {
                if(response.data.owner.name === this.state.yourName){
                    this.setState({
                        owner: true
                    })
                }
            })
        this.timer = setInterval(() => this.checkForStart(), 1000);
    }

    countPlayers(number){
        this.setState({countOfPlayers: number});
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    startGame(){
        if(this.state.countOfPlayers>2){
            GameService.startGame(this.props.match.params.id);
        }
        else{
            this.setState({visibility: true})
        }
    }

    async checkForStart(){
        GameService.checkForStart(this.props.match.params.id)
        .then((response) => {
            this.setState({active : response.data});
        });
        if(this.state.active){
            clearInterval(this.timer);
        }
    }

    render() {
        return (
            <div className="long">
                {this.state.active && <ImagesDisplay tableId = {this.props.match.params.id} />}
                {(!this.state.active ) && (
                <div className="row long">
                    <div className="col-md-10" >
                        {this.state.visibility &&
                            <div className="alert alert-info alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                <strong>Info!</strong> There have to be at least 3 players befor game can starts
                            </div>
                        } 
                        {(this.state.owner) ?
                            <button type="button" className="btn btn-info" onClick={()=>this.startGame()}>Start game</button> :
                            <h1 className="alert alert-success"><strong>INFO!</strong> The owner must start the game!</h1>
                        }
                    </div>
                    <div className="col-md-2 left-border long">
                        <ShowOtherPlayers tableId={this.props.match.params.id} countPlayers={this.countPlayers}/>
                    </div>
                </div>
                )}
            </div>
        )
    }
}

export default Table