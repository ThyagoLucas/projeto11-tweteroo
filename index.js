import Express  from "express";
import cors from 'cors';
import express from "express";

const app = Express();
app.listen(5000, () => {
    console.log("Server is running on port 5000")}
);
app.use(express.json());
app.use(cors());

const users = [];
const posts = [];
app.post("/sign-up", (req, res) => {
    
    const { username, avatar } = req.body;
    users.push({ username, avatar });
    res.send('OK');
});

app.get("/tweets", (req, res)=>{
    let last = lastTen();
    res.send(last);

});

app.post("/tweets", (req, res)=>{

    const{username, tweet} = req.body;
    const ava = users.find(user => user.username === username);    
    posts.push({username, avatar:ava.avatar, tweet});
    res.send('ok');
});

function lastTen(){

    let cont = 0;
    const response = [];

    if(posts.length >=10){
        for(let i = posts.length; i!=0; i--){
            if(cont<10){
                response.push(posts[i-1]);
                cont++;
            }
        }
    }
    else{
        for(let i = posts.length; i!=0; i--){
            response.push(posts[i-1]);
        }
    }

    return response;
}
