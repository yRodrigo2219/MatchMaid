package com.mycompany.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
public class MaidController {
    
    @RequestMapping(value = "/", method = RequestMethod.GET)
    @ResponseBody
    public String user(@RequestParam(value = "lat") double lat, @RequestParam(value = "long") double longi){
        UsersDao dao = new UsersDao();

        return dao.getMaidDataBaseSortedByProximity(lat, longi);
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    @ResponseBody
    public boolean singup(@RequestBody String state, @RequestParam(value = "maid") boolean isMaid){
        UsersDao dao = new UsersDao();
        if(isMaid){
            return dao.insertMaidList(state);
        }else{
            return dao.insertUserList(state);
        }
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public boolean login(@RequestParam(name = "email") String email, @RequestParam(name = "senha") String senha){
        UsersDao dao = new UsersDao();
        return dao.validateLogin(email, senha);
    }
}