package com.krajnik.dixitapp.Game;

import com.krajnik.dixitapp.Images.Image;
import com.krajnik.dixitapp.Images.ImageRepository;
import com.krajnik.dixitapp.Players.Player;
import com.krajnik.dixitapp.Tour.Tour;
import com.krajnik.dixitapp.Users.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

public class Game {
    private List<Player> players;
    private List<Tour> tours;
    private int currentTourId;
    private List<Integer> playersQue;
    private int cardsLeft;
    private Vector<Image> cardsForGame;
    private ImageRepository repository;
    private int CARDS = 64;
    private Vector<Results> results;
    private boolean end = false;

    public Game(List<User> users) {
        this.repository = new ImageRepository();
        this.currentTourId = 0;
        this.cardsForGame = new Vector<>();
        this.players = new ArrayList<>();
        this.results = new Vector<>();
        for (User user :
                users) {
            players.add(new Player(user));
            this.results.add(new Results(user.getName(),0,0));
        }
        playersQue = new ArrayList<Integer>();
        this.drawOrder(players.size());
        this.cardsLeft = CARDS - (6 * players.size());
        this.cardsForGame = repository.pickImages(CARDS);
        this.divideCardsAtBeginning();
        tours = new ArrayList<>();
        this.addTour();
    }

    public static class Results{
        private String playerName;
        private int totalPoints;
        private int lastTourPoints;

        public Results(String playerName, int totalPoints, int lastTourPoints) {
            this.playerName = playerName;
            this.totalPoints = totalPoints;
            this.lastTourPoints = lastTourPoints;
        }

        public String getPlayerName() {
            return playerName;
        }

        public void setPlayerName(String playerName) {
            this.playerName = playerName;
        }

        public int getTotalPoints() {
            return totalPoints;
        }

        public void setTotalPoints(int totalPoints) {
            this.totalPoints = totalPoints;
        }

        public int getLastTourPoints() {
            return lastTourPoints;
        }

        public void setLastTourPoints(int lastTourPoints) {
            this.lastTourPoints = lastTourPoints;
        }

        public static class ResultsComparator implements Comparator<Results> {

            @Override
            public int compare(Results firstResult, Results secondResult) {
                return (secondResult.getTotalPoints()-firstResult.getTotalPoints());
            }
        }
    }


    public int playerCarsCount(){
        return this.players.get(0).getCards().size();
    }

    public Vector<Results> getResults() {
        return results;
    }

    public void setResults(Vector<Results> results) {
        this.results = results;
    }

    public void addTour(){
        this.tours.add(new Tour(this.currentTourId,players.get(this.playersQue.get(this.currentTourId%players.size())).getName(),this.players.size(),this.players,this.results));
    }

    public Vector<Image> getPlayerCards(String name){
        return players.get(this.findPlayer(name)).getCards();
    }

    public void divideCardsAtBeginning() {
        Random rand = new Random();
        for (int i = 0; i < (6 * this.players.size()); i++) {
            int index  = rand.nextInt(CARDS - i );
            players.get(i%players.size()).addCard(cardsForGame.get(index));
            cardsForGame.remove(index);
        }
    }

    public void drawOrder(int length) {
        for (int i = 0; i < length; i++)
            this.playersQue.add(i);
        Collections.shuffle(this.playersQue);
    }

    public int findPlayer(String name){
        for(int i = 0 ;i < players.size();i++){
            if(players.get(i).getName().equals(name))
                return i;
        }
        return -1;
    }

    public Player player(String name){
        return this.players.get(findPlayer(name));
    }

    public Tour getCurrentTour(){
        return tours.get(currentTourId);
    }

    public int getCurrentTourId() {
        return currentTourId;
    }

    public void setCurrentTourId(int currentTourId) {
        this.currentTourId = currentTourId;
    }

    public void startNewTour(){
        if(this.cardsLeft>=this.players.size()) {
            this.setCurrentTourId(this.getCurrentTourId() + 1);
            this.addCards();
            this.cardsLeft -= this.players.size();
            this.addTour();
        }else {
            this.getCurrentTour().setGameEnd(true);
            this.end = true;
        }
    }

    public Tour getPreviousTour(){
        return tours.get(this.currentTourId - 1);
    }

    public void addCards(){
        if(cardsLeft>=this.players.size()) {
            Random rand = new Random();
            for (int i = 0; i < (this.players.size()); i++) {
                int index = rand.nextInt(cardsLeft - i);
                players.get(i % players.size()).addCard(cardsForGame.get(index));
                cardsForGame.remove(index);
            }
        }
    }

}
