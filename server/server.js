const PORT  = process.env.PORT ?? 8001
const express = require('express');
const app = express();
const pool = require('./db.js')
const cors = require('cors');
const {v4:uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.use(cors());
app.use(express.json())

app.get('/todos/:userEmail', async (req, res) => {
    const {userEmail}=req.params;    
    try {
        const todos = await pool.query('SELECT * FROM todos1 WHERE user_email = $1',[userEmail]);
        res.json(todos.rows);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

    app.post('/todos',async(req,res)=>{
        try{

            const {user_email,title,progress,date} = req.body
            const id = uuidv4()

            const response = await pool.query('INSERT INTO todos1(id,user_email,title,progress,date) VALUES($1,$2,$3,$4,$5)',[id,user_email,title,progress,date])
            res.json(response);
        }
        catch(err){
            console.log(err)
        }
    })

    app.put('/todos/:id',async(req,res)=>{
        const {id} = req.params;
        console.log(id);
        const {user_email,title,progress,date} = req.body;
        console.log(date);
        try{
            const response = await pool.query(`UPDATE todos1 SET user_email = $1, title=$2, progress=$3,date=$4 WHERE id=$5`,[user_email,title,progress,date,id])
            res.json(response);
        }catch(err){
            console.error(err);
        }

    })

    app.delete('/todos/:id',async(req,res)=>{
        const {id} = req.params;

        try{
        const response = await pool.query(`DELETE FROM todos1 where id=$1`,[id]);
        res.json(response)
        }catch(err){
            console.error(err);
        }
    })

    app.post('/signup',async(req,res)=>{
        const {email,password} = req.body;
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password,salt)

        try{
            const response = await pool.query(`INSERT INTO users(email,hashed_password) VALUES($1,$2)`,[email,hashedPassword])
            const token = jwt.sign({email},'secret',{expiresIn:'1hr'});
            res.json({email,token})

        }catch(err){
            if(err){
                res.json({detail:err.detail})
                console.error(err.detail);

            }
        }

    })




app.listen(PORT,( )=> console.log(`server is running on port : ${PORT}`))

