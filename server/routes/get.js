const express = require('express')
const client = require('../db/connection')
const getDB = require('../db/connection')
const router = express.Router()


router.get('/session/',async(req,res) => {
    let  db = client.db("2023-2024");
    const data = (await db.admin().listDatabases()).databases;
    let sessions = []
    for(x in data){
        if(data[x].name == "admin" || data[x].name == "local") continue;
        sessions.push(data[x].name)
    }
    
    sessions.sort()
    console.log(sessions)
    res.send(sessions);
})

router.get('/season', async(req,res) => {
    let session = req.query.session.toString();
    let db = client.db(session)
    const data = await db.listCollections().toArray();
    let season = []

    for(x in data){
        season.push(data[x].name);
    }
    season.sort();
    console.log(season);
    res.send(season);
})

router.get('/TT',async(req,res) => {
    let season = req.query.season.toString();
    let session = req.query.session.toString();

    let db = await client.db(session).collection(season);
    let data = await db.find({}).toArray();
    data.sort();
    console.log(data);
    
    res.send(data);
})

function resolveTimeTable(timeTable){
    const TimeTable = [];
    const Days = [`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday`];
    const TT = timeTable.split(/\s+/);
    // console.log(TT);

    let count = 0;
    for(let i = 0; i<TT.length; i++){
        if(TT[i] == `Day` || TT[i] == `Slot/Time` || TT[i] == `Venue`){
            continue;
        }
        if(Days.includes(TT[i])){
            const temp = [];
            temp.push(TT[i]);
            i++;
            while(!Days.includes(TT[i]) && i<TT.length){
                temp.push(TT[i]);
                i++;
            }
            i--;
            TimeTable.push(temp);
        }
    }

    return TimeTable
}

function resolveCourse(course){
    let i 
    let courseCode = "";
    for(i = 0; i<course.length; i++){
        if(course[i] == '('){
            break;
        }
        courseCode += course[i];
    }

    let courseName = "";
    for(let j = i+1; j<course.length-1; j++){
        courseName += course[j];
    }
    return [courseCode, courseName];
}




module.exports = router