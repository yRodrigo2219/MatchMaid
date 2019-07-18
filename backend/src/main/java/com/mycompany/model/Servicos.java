package com.mycompany.model;

import java.io.Serializable;

public class Servicos implements Serializable{
    private boolean baba, limpar_casa, lavar_louca, lavar_roupa, cuidar_casa, cozinhar;
    private String preco_hora;

    public Servicos(boolean baba, boolean limpar_casa, boolean lavar_louca, boolean lavar_roupa, boolean cuidar_casa,
            boolean cozinhar, String preco_hora) {
        this.baba = baba;
        this.limpar_casa = limpar_casa;
        this.lavar_louca = lavar_louca;
        this.lavar_roupa = lavar_roupa;
        this.cuidar_casa = cuidar_casa;
        this.cozinhar = cozinhar;
        this.preco_hora = preco_hora;
    }

    public boolean isBaba() {
        return baba;
    }

    public void setBaba(boolean baba) {
        this.baba = baba;
    }

    public boolean isLimpar_casa() {
        return limpar_casa;
    }

    public void setLimpar_casa(boolean limpar_casa) {
        this.limpar_casa = limpar_casa;
    }

    public boolean isLavar_louca() {
        return lavar_louca;
    }

    public void setLavar_louca(boolean lavar_louca) {
        this.lavar_louca = lavar_louca;
    }

    public boolean isLavar_roupa() {
        return lavar_roupa;
    }

    public void setLavar_roupa(boolean lavar_roupa) {
        this.lavar_roupa = lavar_roupa;
    }

    public boolean isCuidar_casa() {
        return cuidar_casa;
    }

    public void setCuidar_casa(boolean cuidar_casa) {
        this.cuidar_casa = cuidar_casa;
    }

    public boolean isCozinhar() {
        return cozinhar;
    }

    public void setCozinhar(boolean cozinhar) {
        this.cozinhar = cozinhar;
    }

    public String getPreco_hora() {
        return preco_hora;
    }

    public void setPreco_hora(String preco_hora) {
        this.preco_hora = preco_hora;
    }
}