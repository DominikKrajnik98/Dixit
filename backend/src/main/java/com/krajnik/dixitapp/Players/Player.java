package com.krajnik.dixitapp.Players;

import com.krajnik.dixitapp.Images.Image;
import com.krajnik.dixitapp.Users.User;

import java.util.Vector;

public class Player {
    private User user;
    private Vector<Image> cards = new Vector<>();
    private int points;
    private boolean isHead;
    private String name;
    private Image ownCard;
    private Image possibleHeadCard;

    public Player(User user) {
        this.user = user;
        this.name = user.getName();
        this.points = 0;
        this.isHead = false;
    }

    public Image getOwnCard() {
        return ownCard;
    }

    public void setOwnCard(Image ownCard) {
        this.ownCard = ownCard;
    }

    public Image getPossibleHeadCard() {
        return possibleHeadCard;
    }

    public void setPossibleHeadCard(Image possibleHeadCard) {
        this.possibleHeadCard = possibleHeadCard;
    }

    public boolean isHead() {
        return isHead;
    }

    public void setHead(boolean head) {
        isHead = head;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Image getCard(int index){
        return cards.get(index);
    }

    public void addCard(Image card){
        cards.add(card);
    }

    public void removeCard(Image card){
        cards.remove(card);
    }

    public void removeCard(int index){
        cards.remove(index);
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Vector<Image> getCards() {
        return cards;
    }

    public void setCards(Vector<Image> cards) {
        this.cards = cards;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

}
