package com.krajnik.dixitapp.GameTables;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameTablesRepository {
    private static List<GameTable> gameTables=new ArrayList<>();
    private static long counter = 0;

    public void addTable(GameTable table){
        gameTables.add(table);
    }

    public GameTable findTable(long id){
        for(int i=0;i<gameTables.size();i++){
            if(gameTables.get(i).getId().equals(id)){
                return gameTables.get(i);
            }
        }
        return null;
    }

    public static List<GameTable> getGameTables() {
        return gameTables;
    }

    public static void setGameTables(List<GameTable> gameTables) {
        GameTablesRepository.gameTables = gameTables;
    }

    public static long getCounter() {
        return counter;
    }

    public static void setCounter(long counter) {
        GameTablesRepository.counter = counter;
    }

    public long increaseIdCounter(){
        counter++;
        return counter;
    }

}
