package com.krajnik.dixitapp.Tour;

import com.krajnik.dixitapp.Game.Game;
import com.krajnik.dixitapp.Images.Image;
import com.krajnik.dixitapp.Players.Player;

import javax.xml.transform.Result;
import java.util.*;

public class Tour {
    private int number;
    private Faze currentFaze;
    private String headName;
    //String as a name of player, Image as a card they picked
    private Map<String, Integer> ownCards = new HashMap<>();
    //String as a name of player, Image as a card they picked
    private Map<String,Integer> choosenCards = new HashMap<>();
    private boolean end;
    private boolean gameEnd;
    private InfoToShow infoToShow;
    private String description;
    private int playersNotAnswered;
    private List<Player> players;
    private Vector<Image> imagesToSend = new Vector<>();
    private Vector<Game.Results> results;

    public Tour(int number, String headName , int playersCount, List<Player> playerList, Vector<Game.Results> results) {
        this.playersNotAnswered = playersCount;
        this.results = results;
        this.players = playerList;
        this.number = number;
        this.currentFaze = Faze.ONE;
        this.end = false;
        this.headName = headName;
        this.infoToShow = new InfoToShow(headName,this.currentFaze,this.end ,this.gameEnd);
    }

    public class InfoToShow{
        private String headName;

        public boolean isGameEnd() {
            return gameEnd;
        }

        public void setGameEnd(boolean gameEnd) {
            this.gameEnd = gameEnd;
        }

        private Faze currentFaze;
        private boolean end;
        private String description;
        private boolean gameEnd;

        public InfoToShow(String headName, Faze currentFaze, boolean end, boolean gameEnd) {
            this.headName = headName;
            this.currentFaze = currentFaze;
            this.end = end;
            this.gameEnd = gameEnd;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getHeadName() {
            return headName;
        }

        public void setHeadName(String headName) {
            this.headName = headName;
        }

        public Faze getCurrentFaze() {
            return currentFaze;
        }

        public void setCurrentFaze(Faze currentFaze) {
            this.currentFaze = currentFaze;
        }

        public boolean isEnd() {
            return end;
        }

        public void setEnd(boolean end) {
            this.end = end;
        }
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.infoToShow.setDescription(description);
        this.description = description;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public Faze getCurrentFaze() {
        return currentFaze;
    }

    public void setCurrentFaze(Faze currentFaze) {
        this.infoToShow.setCurrentFaze(currentFaze);
        this.currentFaze = currentFaze;
    }

    public String getHeadName() {
        return headName;
    }

    public void setHeadName(String headName) {
        this.infoToShow.setHeadName(headName);
        this.headName = headName;
    }

    public Map<String, Integer> getOwnCards() {
        return ownCards;
    }

    public void setOwnCards(Map<String, Integer> ownCards) {
        this.ownCards = ownCards;
    }

    public Map<String, Integer> getChoosenCards() {
        return choosenCards;
    }

    public void setChoosenCards(Map<String, Integer> choosenCards) {
        this.choosenCards = choosenCards;
    }

    public boolean isEnd() {
        return end;
    }

    public void setEnd(boolean end) {
        this.infoToShow.setEnd(end);
        this.end = end;
    }

    public boolean isGameEnd() {
        return gameEnd;
    }

    public void setGameEnd(boolean gameEnd) {
        this.infoToShow.setGameEnd(gameEnd);
        this.gameEnd = gameEnd;
    }

    public InfoToShow getInfoToShow() {
        return infoToShow;
    }

    public void setInfoToShow(InfoToShow infoToShow) {
        this.infoToShow = infoToShow;
    }

    public void afterHeadChoose(PlayerPick playerPick){
        this.playersNotAnswered-=1;
        this.setDescription(playerPick.getDescription());
        this.setCurrentFaze(Faze.TWO);
        this.ownCards.put(playerPick.getName(),playerPick.getCard());
    }

    public void afterPlayerChoose(PlayerPick playerPick){
        this.playersNotAnswered-=1;
        if(this.playersNotAnswered == 0) {
            this.setCurrentFaze(Faze.THREE);
            this.playersNotAnswered = this.players.size() -1;
        }
        this.ownCards.put(playerPick.getName(),playerPick.getCard());
    }

    public void afterPlayerSecondChoose(PlayerPick playerPick){
        this.playersNotAnswered-=1;
        this.choosenCards.put(playerPick.getName(),playerPick.getCard());
        for (Player player:
                this.players) {
            if(player.getName().equals(playerPick.getName())){
                player.setPossibleHeadCard(this.imagesToSend.get(playerPick.getCard()));
            }
        }
        if(this.playersNotAnswered == 0) {
            this.setCurrentFaze(Faze.FOUR);
            this.countResults();
            this.setEnd(true);
        }
    }

    public Vector<Image> getPlayersPicks(){
        if(this.imagesToSend.size()==0) {
            for (Map.Entry<String, Integer> entry : this.ownCards.entrySet()) {
                for (int i = 0; i < this.players.size(); i++) {
                    if (entry.getKey().equals(this.players.get(i).getName())) {
                        imagesToSend.add(this.players.get(i).getCard(entry.getValue()));
                        this.players.get(i).setOwnCard(this.players.get(i).getCard(entry.getValue()));
                        this.players.get(i).removeCard(this.players.get(i).getCard(entry.getValue()));
                        break;
                    }
                }
            }
            Collections.shuffle(imagesToSend);
        }
        return imagesToSend;
    }

    public int findPlayerResult(String playerName){
        for(int i=0;i<this.results.size();i++){
            if(this.results.get(i).getPlayerName().equals(playerName))
                return i;
        }
        return -1;
    }

    private void countResults(){
        for (Game.Results result:
                this.results) {
            result.setLastTourPoints(0);
        }
        Player head = findPlayer(this.headName);
        int countOfGoodGuesses = 0;
        for (Player player:
             this.players) {
            if(!player.getName().equals(this.headName)){
                if(player.getPossibleHeadCard().equals(head.getOwnCard())){
                    countOfGoodGuesses++;
                }
            }
        }
        Game.Results newResult;
        if(countOfGoodGuesses==(this.players.size()-1) || countOfGoodGuesses==0){
            for (Player player:
                    this.players) {
                if(!player.getName().equals(this.headName)){
                    int index = findPlayerResult(player.getName());
                    newResult = this.results.get(index);
                    newResult.setLastTourPoints(newResult.getLastTourPoints()+2);
                    newResult.setTotalPoints(newResult.getTotalPoints()+2);
                    this.results.set(index,newResult);
                }
                else{
                    int index = findPlayerResult(player.getName());
                    newResult = this.results.get(index);
                    newResult.setLastTourPoints(0);
                    this.results.set(index,newResult);
                }
            }
        }
        else{
            for (Player mainPlayer:
                 this.players) {
                if(mainPlayer.getName().equals(this.headName)){
                    continue;
                }
                else {
                    for (Player secondPlayer :
                            this.players) {
                        if(mainPlayer.getPossibleHeadCard().equals(secondPlayer.getOwnCard())){
                            if(secondPlayer.getName().equals(this.headName)){
                                //we hit head's card and should receive 3 points
                                int index = findPlayerResult(mainPlayer.getName());
                                newResult = this.results.get(index);
                                newResult.setLastTourPoints(newResult.getLastTourPoints()+3);
                                newResult.setTotalPoints(newResult.getTotalPoints()+3);
                                this.results.set(index,newResult);
                            }
                            else{
                                //we missed head's card and our opponent should receive 1 additional point
                                int index = findPlayerResult(secondPlayer.getName());
                                newResult = this.results.get(index);
                                newResult.setLastTourPoints(newResult.getLastTourPoints()+1);
                                newResult.setTotalPoints(newResult.getTotalPoints()+1);
                                this.results.set(index,newResult);
                            }
                        }
                    }
                }
            }
            //we should give head 3 points
            int index = findPlayerResult(this.headName);
            newResult = this.results.get(index);
            newResult.setLastTourPoints(newResult.getLastTourPoints()+3);
            newResult.setTotalPoints(newResult.getTotalPoints()+3);
            this.results.set(index,newResult);
        }
        this.results.sort(new Game.Results.ResultsComparator());
    }

    public Player findPlayer(String playerName){
        for (Player player:
             this.players) {
            if(player.getName().equals(playerName)){
                return player;
            }
        }
        return null;
    }

    public String[] usersCards(){
        String[] usersCardsToSend = new String[this.players.size()];
        //iterating through images to send
        for(int i = 0 ; i < this.players.size(); i++){
            //iterating through players cards
            for(int j = 0; j<this.players.size() ;j++){
                if(imagesToSend.get(i).equals(this.players.get(j).getOwnCard()))
                    usersCardsToSend[i] = this.players.get(j).getName();
            }
        }
        return usersCardsToSend;
    }

    public String[][] usersVotes(){
        String[][] usersVotesToSend = new String[this.players.size()][this.players.size()-1];
        for (Map.Entry<String, Integer> entry : this.choosenCards.entrySet()) {
            for(int i = 0 ;i<this.players.size()-1;i++) {
                if (usersVotesToSend[entry.getValue()][i]== null) {
                    usersVotesToSend[entry.getValue()][i] = entry.getKey();
                    break;
                }
            }
        }
        return usersVotesToSend;
    }

}