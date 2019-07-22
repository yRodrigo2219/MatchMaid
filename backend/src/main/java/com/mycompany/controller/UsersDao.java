package com.mycompany.controller;

import com.mycompany.model.*;

import com.google.gson.*;
import java.io.*;
import java.util.*;

public class UsersDao{
    public boolean insertMaidList(String state){
        Gson gson = new Gson();
        String filePath = new File("").getAbsolutePath();

        try{
            List<Maid> listMaid = new ArrayList<>();
            File listMaidFile = new File(filePath+"\\listMaid");
            Maid tempMaid = new Maid();

            listMaidFile.createNewFile();

            try{
                ObjectInputStream inFile = new ObjectInputStream(new FileInputStream(listMaidFile));
                listMaid = (ArrayList) inFile.readObject();
                inFile.close();
            }catch(Exception e){
                System.out.println(e);
            }
            
            tempMaid = gson.fromJson(state, Maid.class);

            listMaid.add(tempMaid);

            ObjectOutputStream outFile = new ObjectOutputStream(new FileOutputStream(listMaidFile));
            outFile.writeObject(listMaid);
            outFile.close();

            return true;
            
        }catch(Exception e){
            System.out.println(e);
        }
        
        return false;
    }

    public boolean insertUserList(String state){
        Gson gson = new Gson();
        String filePath = new File("").getAbsolutePath();

        try{
            List<User> listUser = new ArrayList<>();
            File listUserFile = new File(filePath+"\\listUsers");
            User tempUser = new Maid();

            listUserFile.createNewFile();
            
            try{
                ObjectInputStream inFile = new ObjectInputStream(new FileInputStream(listUserFile));
                listUser = (ArrayList) inFile.readObject();
                inFile.close();
            }catch(Exception e){
                System.out.println(e);
            }
            
            tempUser = gson.fromJson(state, User.class);

            listUser.add(tempUser);

            ObjectOutputStream outFile = new ObjectOutputStream(new FileOutputStream(listUserFile));
            outFile.writeObject(listUser);
            outFile.close();

            return true;
            
        }catch(Exception e){
            System.out.println(e);
        }
        
        return false;
    }

    public boolean validateLogin(String email, String senha){
        String filePath = new File("").getAbsolutePath();

        try{
            List<User> listUser = new ArrayList<>();
            File listUserFile = new File(filePath+"\\listUsers");

            ObjectInputStream inFile = new ObjectInputStream(new FileInputStream(listUserFile));
            listUser = (ArrayList) inFile.readObject();
            inFile.close();

            for(int i = 0; i < listUser.size(); i++){
                if(email.equals(listUser.get(i).getUserinfo().getEmail())
                    && senha.equals(listUser.get(i).getUserinfo().getSenha())){
                        return true;
                    }
            }

        }catch(Exception e){
            System.out.println(e);
        }

        try{
            List<Maid> listMaid = new ArrayList<>();
            File listMaidFile = new File(filePath+"\\listMaid");

            ObjectInputStream inFile = new ObjectInputStream(new FileInputStream(listMaidFile));
            listMaid = (ArrayList) inFile.readObject();
            inFile.close();

            for(int i = 0; i < listMaid.size(); i++){
                if(email.equals(listMaid.get(i).getUserinfo().getEmail())
                    && senha.equals(listMaid.get(i).getUserinfo().getSenha())){
                        return true;
                    }
            }

        }catch(Exception e){
            System.out.println(e);
        }

        return false;
    }

    public String getMaidDataBaseSortedByProximity(double lat1, double long1){
        Gson gson = new Gson();
        String filePath = new File("").getAbsolutePath();
        List<String> maidDataBase = new ArrayList<>();
        
        final int r = 6371;
        final double pi = Math.PI;

        try{
            List<Maid> listMaid = new ArrayList<>();
            File listMaidFile = new File(filePath+"\\listMaid");

            ObjectInputStream inFile = new ObjectInputStream(new FileInputStream(listMaidFile));
            listMaid = (ArrayList) inFile.readObject();
            inFile.close();

            for(int i = 0; i < listMaid.size(); i++){
                double lat2 = listMaid.get(i).getLocalizacao().getLatitude();
                double long2 = listMaid.get(i).getLocalizacao().getLongitude();

                double φ1 = lat1 * (pi/180);

                double φ2 = lat2 * (pi/180);

                double Δφ = (lat2-lat1) * (pi/180);

                double Δλ = (long2-long1) * (pi/180);

                double a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +  Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);

                double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

                double d = r * c;

                listMaid.get(i).setDistancia(d);
            }
            
            Collections.sort(listMaid, new SortByRoll());

            return gson.toJson(listMaid);

        }catch(Exception e){
            System.out.println(e);
        }

        return "";
    }

    public class SortByRoll implements Comparator<Maid>{

        @Override
        public int compare(Maid pessoa1, Maid pessoa2) {
            
            int distance1 = (int) Math.round(pessoa1.getDistancia());
            int distance2 = (int) Math.round(pessoa2.getDistancia());
            
            return distance1 - distance2;
        }
    }

}