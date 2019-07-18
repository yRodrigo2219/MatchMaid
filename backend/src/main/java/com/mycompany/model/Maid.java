package com.mycompany.model;

public class Maid extends User{
    private Servicos servicos;
    private DiasDaSemana dias_disponiveis;
    private double distancia;

    public Maid(UserInfo userinfo, Localizacao localizacao, Servicos servicos, DiasDaSemana dias_disponiveis, double distancia) {
        super(userinfo, localizacao);
        this.servicos = servicos;
        this.dias_disponiveis = dias_disponiveis;
        this.distancia = 999;
    }

    public Maid(){

    }

    public Servicos getServicos() {
        return servicos;
    }

    public void setServicos(Servicos servicos) {
        this.servicos = servicos;
    }

    public double getDistancia() {
        return distancia;
    }

    public void setDistancia(double distancia) {
        this.distancia = distancia;
    }

    public DiasDaSemana getDias_disponiveis() {
        return dias_disponiveis;
    }

    public void setDias_disponiveis(DiasDaSemana dias_disponiveis) {
        this.dias_disponiveis = dias_disponiveis;
    }
}