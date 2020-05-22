package com.krajnik.dixitapp.Tour;

public class PlayerPick{
    private String name;
    private int card;
    private String description;

    public PlayerPick(){

    }

    public PlayerPick(String name, String description, int card) {
        this.name = name;
        this.card = card;
        this.description = description;
    }

    @Override
    public String toString() {
        return "PlayerPick{" +
                "playerName='" + name + '\'' +
                ", cardId=" + card +
                ", description='" + description + '\'' +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCard() {
        return card;
    }

    public void setCard(int card) {
        this.card = card;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}