const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    fs.readFile('./dataBase.json', (err, data)=>{
        let list = JSON.parse(data);

        if(req.query.lat == 0 && req.query.long == 0){
            res.send(null);
            return;
        }

        const R = 6371;
        const pi = Math.PI;

        let lat1 = req.query.lat;
        let long1 = req.query.long;

        let newList = list.filter( maid =>{
            let lat2 = maid.localizacao.latitude;
            let long2 = maid.localizacao.longitude;

            let φ1 = lat1 * (pi/180);
            let φ2 = lat2 * (pi/180);
            let Δφ = (lat2-lat1) * (pi/180);
            let Δλ = (long2-long1) * (pi/180);

            let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);

            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            let d = R * c;

            maid.distancia = d.toFixed(2);
            if(maid.maid){
                console.log(d);
                return maid;
            }
        });

        console.log(newList);

        let sortList = newList.sort((a, b)=>{
            return a.distancia - b.distancia;
        });

        res.send(sortList);
    });
});

app.post('/signup', (req, res)=>{
    fs.readFile('./dataBase.json', (err, data)=>{
        let newData = JSON.parse(data);
        newData.push(req.body);
        console.log(req.body);
        newData = JSON.stringify(newData);
        fs.writeFile('./dataBase.json', newData, (err)=>{
            res.send(true);
        });
    });
});

app.post('/login', (req, res)=>{
    fs.readFile('./dataBase.json', (err, data)=>{
        let list = JSON.parse(data);

        for(let i = 0; i < list.length; i++){
            if(req.query.email === list[i].userinfo.email && req.query.senha === list[i].userinfo.senha){
                res.send(true);
                return;
            }
        }
        res.send(false);
    });
});

app.listen('8080', ()=>{
    console.log('localhost:8080');
});