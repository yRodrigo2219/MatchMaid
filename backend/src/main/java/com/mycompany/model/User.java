package com.mycompany.model;

import java.io.Serializable;

public class User implements Serializable{
    private UserInfo userinfo;
    private Localizacao localizacao;

    public User(UserInfo userinfo, Localizacao localizacao){
        this.userinfo = userinfo;
        this.localizacao = localizacao;
    }

    public User(){
        
    }

    public UserInfo getUserinfo() {
        return userinfo;
    }

    public void setUserinfo(UserInfo userinfo) {
        this.userinfo = userinfo;
    }

    public Localizacao getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(Localizacao localizacao) {
        this.localizacao = localizacao;
    }
}