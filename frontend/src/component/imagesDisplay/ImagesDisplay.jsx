import React, { Component } from 'react';
import ImageModal from '../modal/ImageModal'
import ImagesService from '../../service/ImagesService'
import FazeOne from '../FazeOne'

class ImagesDisplay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ownChossenCard: -1,
            cardChoosenFromOthers: -1,
            ownChossenCardName: '',
            tableId: props.tableId,
            images: [],
            otherImages: [],
            imageToSend: '',
            visibility: false,
            imageClassName: [],
            imageClassNameSecond: [],
            yourName: localStorage.getItem("Name"),
            faze: '',
            headName: '',
            end: false,
            description: '',
            myDescription: '',
            answered: false,
            answeredv2: false,
            results: [],
            flag:false,
            playersVotes: [],
            cardsSigns: []
        }
        this.changeVisibility = this.changeVisibility.bind(this)
        this.pickImage = this.pickImage.bind(this)
        this.changeCss = this.changeCss.bind(this)
        this.changeCssSecond = this.changeCssSecond.bind(this)
        this.pickACard = this.pickACard.bind(this)
        this.getInfoTour = this.getInfoTour.bind(this)
        this.sendPick = this.sendPick.bind(this)
        this.updateDescription = this.updateDescription.bind(this)
        this.getPickedImages = this.getPickedImages.bind(this)
        this.sendSecondPick = this.sendSecondPick.bind(this)
        this.getResults = this.getResults.bind(this)
        this.getCardsOwnership = this.getCardsOwnership.bind(this)
    }

    componentDidMount() {
        ImagesService.getImages(this.state.tableId)
        .then((response) => {
            this.setState({
                images: response.data
            })
            this.setState(state => {
                const imageClassName = state.images.map((item) => {
                    return item ="rounded image hover-shadow";
                });
    
                return {
                    imageClassName,
                };
            });
        });
        this.getInfoTour();
        this.getResults();
        this.timer = setInterval(() => this.getInfoTour(), 3000);
    }

    async getInfoTour(){
        ImagesService.getTourInfo(this.state.tableId)
        .then((response)=>{
            this.setState({
                headName: response.data.headName,
                faze: response.data.currentFaze,
                gameEnd: response.data.gameEnd,
                description: response.data.description
            })
        });
        if(this.state.images.length===5){
            this.setState({answered:true})
        }

        if(this.state.faze === 'ONE' && this.state.images.length !== 6){
            ImagesService.getImages(this.state.tableId)
            .then((response) => {
                this.setState({
                    images: response.data
                })
                this.setState(state => {
                    const imageClassName = state.images.map((item) => {
                        return item ="rounded image hover-shadow";
                    });
        
                    return {
                        imageClassName,
                    };
                });
            })
           }

        if((this.state.faze === 'THREE' || this.state.faze === 'FOUR') && !(this.state.otherImages.length)){
            this.getPickedImages();
            this.setState({flag:true})
        }
        if(((this.state.faze === 'FOUR' || this.state.faze === 'ONE') && this.state.flag)){
            this.getResults();
            this.getCardsOwnership();
            this.setState({
                flag:false,
                answered: false,
                answeredv2: false,
                ownChossenCard: -1,
                cardChoosenFromOthers: -1,
            });
       }
       
    }

    getResults(){
        ImagesService.getResults(this.state.tableId)
        .then((response)=>{
            this.setState({
                results: response.data
            })
        })
    }

    getCardsOwnership(){
        ImagesService.getPlayersVotes(this.state.tableId)
        .then((response)=>{
            this.setState({
                playersVotes: response.data
            })
        })
        ImagesService.getCardsSigns(this.state.tableId)
        .then((response)=>{
            this.setState({
                cardsSigns: response.data
            })
        })
    }

    getPickedImages(){
        ImagesService.getPickedImages(this.state.tableId)
        .then((response) => {
            this.setState({
                otherImages: response.data
            })
            this.setState(state => {
                const imageClassNameSecond = state.otherImages.map((item) => {
                    return item ="rounded image hover-shadow";
                });
    
                return {
                    imageClassNameSecond,
                };
            });
        })
    }

    changeVisibility() {
        this.setState({ visibility: !this.state.visibility })
    }

    pickImage(value) {
        this.setState({ imageToSend: value })
    }

    changeCss(index) {
        if(!this.state.answered){
            this.setState(state => {
                const imageClassName = state.imageClassName.map((item, j) => {
                    if (j === index) {
                        return item += ' hover-shadow-aplay';
                    } else {
                        return item ="rounded image hover-shadow";
                    }
                });

                return {
                    imageClassName,
                };
            });
        }
    }

    changeCssSecond(index) {
        console.log(index)
        this.setState(state => {
            const imageClassNameSecond = state.imageClassNameSecond.map((item, j) => {
                if (j === index) {
                    return item += ' hover-shadow-aplay';
                } else {
                    return item ="rounded image hover-shadow";
                }
            });

            return {
                imageClassNameSecond,
            };
        });
        console.log(this.state.imageClassNameSecond)
    }

    pickACard(index){
        if(!this.state.answered){
            this.setState({ownChossenCard:index})
        }
        else{
            this.setState({cardChoosenFromOthers:index})
        }
    }

    sendPick(){
        if(this.state.ownChossenCard === -1){
            console.log("nope")
        }
        else if(!(this.state.myDescription || this.state.description)){
            console.log("nope2")
        }
        else{
        const requestBody = {"name" : this.state.yourName,
                             "description" : this.state.myDescription,
                             "card" : this.state.ownChossenCard
                            };
        ImagesService.sendPick(this.state.tableId,requestBody)
        .then((response)=>{
            if(response.status === 200){
                this.setState({
                    ownChossenCardName: this.state.images[this.state.ownChossenCard],
                    faze:'TWO',
                    images: this.state.images.filter((value,index) => {
                        return index!==this.state.ownChossenCard;
                    }),
                    imageClassName : this.state.imageClassName.map(item =>{
                        return item = "rounded image hover-shadow";
                    }),
                    answered: true,
                    playersVotes: [],
                    cardsSigns: [],
                    otherImages: []
                });
            }
        })
        }
    }

    sendSecondPick(){
        if(this.state.cardChoosenFromOthers===-1){
            console.log("nope")
        }
        else
        {
            const requestBody = {"name" : this.state.yourName,
                             "description" : '',
                             "card" : this.state.cardChoosenFromOthers
                            };
            ImagesService.sendSecondPick(this.state.tableId,requestBody)
            .then((response)=>{
                if(response.status === 200){
                    this.setState({
                        answeredv2: true
                    })
                }
            })
        }
    }

    updateDescription(givenDescription){
        this.setState({myDescription: givenDescription})
    }

    render() {
        const visible = this.state.visibility;
        return (
            <div className="container">
                {   (this.state.gameEnd) ?
                    <div>
                        <div className="alert alert-info alert-dismissible">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>Info!</strong> The game has ended, you can go back to the lobby :)
                        </div>
                        <div className="row">
                            <div className="col">
                                <button type="button" className="btn btn-primary right top-padding" onClick = {() =>this.props.history.push('/waitingroom')} >Go back to lobby</button>
                            </div>
                        </div>
                    </div> :
                    (this.state.faze === 'ONE' || this.state.faze==='FOUR') ? 
                    ((this.state.headName === this.state.yourName) ?
                    <div className="alert alert-info alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Info!</strong> Now it's your turn to pick and describe a card to the others!
                    </div> 
                    : 
                    <div className="alert alert-info alert-dismissible">
                        <strong>Info!</strong> It's {this.state.headName} turn to pick and describe his card
                    </div>)
                : (this.state.faze === 'TWO') ? 
                ((this.state.headName === this.state.yourName) ?
                    <div className="alert alert-info alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Info!</strong> Other players are picking their cards.
                    </div> 
                    : (this.state.headName !== this.state.yourName && !this.state.answered) ?
                    <div>
                        <div className="alert alert-info alert-dismissible">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>Info!</strong> Now it's your turn to pick a card you think best matches the description:
                        </div>
                        <p  className="description">Description: {this.state.description}</p>
                    </div>
                    :
                    <div>
                        <div className="alert alert-info alert-dismissible">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                            <strong>Info!</strong> You are waiting until other players will pick their cards! Be patient it might take a while :)
                        </div>
                        <p  className="description">Description: {this.state.description}</p>
                    </div>
                    )
                : (this.state.faze === 'THREE') ?
                ((this.state.headName === this.state.yourName)?
                    <div className="alert alert-info alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Info!</strong> Now players are guessing which card is yours!
                    </div>
                    : (!this.state.answeredv2) ?
                        <div>
                            <div className="alert alert-info alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                <strong>Info!</strong> Now pick a card, which you think belongs to a {this.state.headName}
                            </div>
                            <p  className="description">Description: {this.state.description}</p>
                        </div> :
                        <div>
                            <div className="alert alert-info alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                <strong>Info!</strong> Wait until other players pick cards!
                            </div>
                            <p  className="description">Description: {this.state.description}</p>
                        </div>)
                :
                <div></div>
                }
                <h5>Your cards:</h5>
                {visible && <ImageModal
                    text={this.state.imageToSend}
                    onCloseRequest={() => this.changeVisibility()} />}
                <div className="row">
                    {
                        this.state.images.map(
                            (image, index) =>
                                <div key={index} className="col-2">
                                    <img src={image.path} className={this.state.imageClassName[index]} alt="obrazek dixit"
                                        onClick={() => {
                                            this.pickImage(image.path);
                                            this.changeVisibility();
                                            this.changeCss(index);
                                            this.pickACard(index);
                                        }} />
                                </div>
                        )
                    }
                </div>
                {(this.state.faze === 'TWO' && this.state.yourName !== this.state.headName && !this.state.answered && !this.state.gameEnd) ? 
                    <div className="row">
                        <div className="col">
                            <button type="button" className="btn btn-primary right top-padding" onClick={this.sendPick}>Confirme your choice!</button>
                        </div>
                    </div> 
                    :
                    <div>
                        {((this.state.faze === 'ONE' || this.state.faze === 'FOUR') && this.state.yourName === this.state.headName && !this.state.gameEnd) &&
                        <div>
                            <div className="row">
                                <FazeOne onDescription={this.updateDescription}/>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button type="button" className="btn btn-primary right" onClick={this.sendPick}>Confirme your choice</button>
                                </div>
                            </div>
                        </div>}
                        {(this.state.otherImages.length !==0) && 
                        <div className="small-margin">
                        <h5>Cards for description:</h5>
                        {visible && <ImageModal
                                    text={this.state.imageToSend}
                                    onCloseRequest={() => this.changeVisibility()} />}
                                <div className="row">
                                    {
                                        this.state.otherImages.map(
                                            (image, index) =>
                                                <div key={index} className="col-2">
                                                    <div key={index} className="vote-sign">{this.state.cardsSigns[index]}</div>
                                                    <img src={image.path} className={this.state.imageClassNameSecond[index]} alt="obrazek dixit"
                                                        onClick={() => {
                                                            this.pickImage(image.path);
                                                            this.changeVisibility();
                                                            this.changeCssSecond(index);
                                                            this.pickACard(index);
                                                        }} />
                                                        {   
                                                            this.state.playersVotes.length!==0 &&
                                                            this.state.playersVotes[index]!==null &&
                                                            this.state.playersVotes[index].map((vote,counter) =>
                                                                <div key={counter} className="vote-sign">{vote}</div>
                                                                )
                                                        }
                                                        
                                                </div>)
                                    }
                                </div>
                                {
                                    (this.state.yourName !== this.state.headName && !this.state.answeredv2 && this.state.faze === 'THREE' && !this.state.gameEnd) ?
                                    <div className="row">
                                        <div className="col">
                                            <button type="button" className="btn btn-primary right top-padding" onClick={this.sendSecondPick}>Confirme your choice</button>
                                        </div>
                                    </div> :
                                    <div></div>
                                }
                        </div>}
                    </div>
                    }
                    <div className="container small-margin">
                    <table className="my-table">
                            <thead>
                                <tr>
                                    <th> #</th>
                                    <th>Name</th>
                                    <th>Last tour</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    this.state.results.map(
                                        (result,index) =>
                                            <tr  key={index}>
                                                <th> {index+1}</th>
                                                <th>{result.playerName}</th>
                                                <th>{result.lastTourPoints}</th>
                                                <th>{result.totalPoints}</th>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
            </div>
        )
    }
}

export default ImagesDisplay