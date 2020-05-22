package com.krajnik.dixitapp.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UsersResource {
    private final UsersRepository usersRepository;

    public UsersResource(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @PostMapping("/addNewUser/{name}")
    public User createUser(@PathVariable String name){
        User user = new User(name,usersRepository.increaseIdCounter());
        usersRepository.addUser(user);
        return user;
    }

    @GetMapping("/allUsers/{name}")
    @ResponseBody
    public ArrayList<User> getAllUsers(@PathVariable String name){
        return usersRepository.getUsers(name);
    }

    @GetMapping("/allUsers")
    @ResponseBody
    public ArrayList<User> getAllUsers(){
        return usersRepository.getUsers();
    }
}
