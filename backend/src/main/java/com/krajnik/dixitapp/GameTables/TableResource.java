package com.krajnik.dixitapp.GameTables;

import com.krajnik.dixitapp.Game.Game;
import com.krajnik.dixitapp.Images.Image;
import com.krajnik.dixitapp.Players.Player;
import com.krajnik.dixitapp.Tour.PlayerPick;
import com.krajnik.dixitapp.Tour.Tour;
import com.krajnik.dixitapp.Users.User;
import com.krajnik.dixitapp.Users.UsersRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Vector;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class TableResource {
    private final GameTablesRepository tables;
    private final UsersRepository users;

    public TableResource(GameTablesRepository tables, UsersRepository users) {
        this.tables = tables;
        this.users = users;
    }

    @PostMapping("/addTable/{name}")
    public GameTable createTable(@PathVariable String name, @RequestHeader("Name") String userName){
        User user = users.getUser(userName);
        GameTable table = new GameTable(tables.increaseIdCounter(),name, user);
        tables.addTable(table);
        return table;
    }
    @PostMapping("/addPlayerToTable/{id}/{name}")
    public GameTable addPlayerToTable(@PathVariable long id, @PathVariable String name){
        User user = users.getUsers().get(users.findUser(name));
        GameTable table = tables.findTable(id);
        table.addUser(user);
        return table;
    }

    @GetMapping("/getTables")
    public List<GameTable> getTables(){
        return tables.getGameTables();
    }

    @GetMapping("/getTable/{id}")
    public GameTable getTable(@PathVariable long id){
        return tables.findTable(id);
    }

    @GetMapping("/table/{id}/getPlayers")
    public List<User> getPlayersInTable(@PathVariable long id){
        return tables.findTable(id).getUsers();
    }

    @PostMapping("/table/{id}/startGame")
    public void startGameInTable(@PathVariable long id){
        tables.findTable(id).startGame();
    }

    @GetMapping("/table/{id}/checkForStart")
    public boolean checkForStart(@PathVariable long id){
        return tables.findTable(id).isActive();
    }

    @PostMapping("/table/{id}/getImages")
    public Vector<Image> getImages(@PathVariable long id, @RequestHeader("Name") String userName){
        return tables.findTable(id).getGame().player(userName).getCards();
    }

    @GetMapping("/table/{id}/getTour")
    public Tour.InfoToShow getTour(@PathVariable long id){
        return tables.findTable(id).getGame().getCurrentTour().getInfoToShow();
    }
    @PostMapping("/table/{id}/sendHeadPick")
    public ResponseEntity getPick(@PathVariable long id, @RequestBody PlayerPick playerPick){
        if(playerPick.getName().equals(tables.findTable(id).getGame().getCurrentTour().getHeadName()))
            tables.findTable(id).getGame().getCurrentTour().afterHeadChoose(playerPick);
        else
            tables.findTable(id).getGame().getCurrentTour().afterPlayerChoose(playerPick);

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/table/{id}/getPickedImages")
    public Vector<Image> getPickedImages(@PathVariable long id){
        return tables.findTable(id).getGame().getCurrentTour().getPlayersPicks();
    }

    @PostMapping("/table/{id}/sendSecondPick")
    public ResponseEntity getSecondPick(@PathVariable long id, @RequestBody PlayerPick playerPick) {
        tables.findTable(id).getGame().getCurrentTour().afterPlayerSecondChoose(playerPick);
        if(tables.findTable(id).getGame().getCurrentTour().isEnd())
            tables.findTable(id).getGame().startNewTour();
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/table/{id}/getResults")
    public Vector<Game.Results> getGameResults(@PathVariable long id){
        return tables.findTable(id).getGame().getResults();
    }

    @GetMapping("/table/{id}/cardsSigns")
    public String[] getCardsSigns(@PathVariable long id){
        return tables.findTable(id).getGame().getPreviousTour().usersCards();
    }

    @GetMapping("/table/{id}/cardsVotes")
    public String[][] getCardsVotes(@PathVariable long id){
        return tables.findTable(id).getGame().getPreviousTour().usersVotes();
    }
}