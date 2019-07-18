package com.mycompany.model;

import java.io.Serializable;

public class UserInfo implements Serializable{
    private String email, nome, celular, senha, rf, cpf, idade;

    public UserInfo(String email, String nome, String celular, String senha, String rf, String cpf, String idade) {
        this.email = email;
        this.nome = nome;
        this.celular = celular;
        this.senha = senha;
        this.rf = rf;
        this.cpf = cpf;
        this.idade = idade;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getRf() {
        return rf;
    }

    public void setRf(String rf) {
        this.rf = rf;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getIdade() {
        return idade;
    }

    public void setIdade(String idade) {
        this.idade = idade;
    }
}