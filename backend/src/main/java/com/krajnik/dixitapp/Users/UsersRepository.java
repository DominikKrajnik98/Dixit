package com.krajnik.dixitapp.Users;

import org.springframework.stereotype.Service;

import javax.servlet.http.PushBuilder;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Set;

@Service
public class UsersRepository {
    private static ArrayList<User> users = new ArrayList<>();
    private static long idCounter = 0;

    public void addUser(User user){
        users.add(user);
    }

    public int findUser(String name){
        for(int i=0;i<users.size();i++){
            if(users.get(i).getName().equals(name))
                return i;
        }
        return -1;
    }

    public User getUser(String name){
        return users.get(this.findUser(name));
    }

    public ArrayList<User> getUsers() {
        return users;
    }
    public ArrayList<User> getUsers(String name) {
        ArrayList<User> temporary = new ArrayList<>();
        temporary = (ArrayList<User>) users.clone();
        temporary.remove(findUser(name));
        return temporary;
    }

    public void setUsers(ArrayList<User> users) {
        this.users = users;
    }

    public long getIdCounter() {
        return idCounter;
    }

    public void setIdCounter(long idCounter) {
        this.idCounter = idCounter;
    }

    public long increaseIdCounter(){
        idCounter+=1;
        return idCounter;
    }
}
