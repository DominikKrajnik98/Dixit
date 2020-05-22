package com.krajnik.dixitapp.GameTables;


import com.krajnik.dixitapp.Game.Game;
import com.krajnik.dixitapp.Users.User;

import java.util.ArrayList;
import java.util.List;

public class GameTable {
    private Long id;
    private String name;
    private int players_count;
    private boolean active;
    private List<User> users;
    private User owner;
    private Game game;


    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public GameTable(Long id, String name, User owner) {
        this.id = id;
        this.name = name;
        this.players_count = 0;
        this.active = false;
        this.users = new ArrayList<>();
        this.owner = owner;
    }

    public GameTable() {
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPlayers_count() {
        return players_count;
    }

    public void setPlayers_count(int players_count) {
        this.players_count = players_count;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void addUser(User user) {
        increaseUsersCount();
        users.add(user);
    }

    public void increaseUsersCount() {
        this.players_count++;
    }

    public void startGame(){
        this.active = true;
        this.game = new Game(this.getUsers());
    }
}
