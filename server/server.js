const PORT  = process.env.PORT ?? 8001
const express = require('express');
const app = express();
const pool = require('./db.js')
const cors = require('cors');


app.use(cors());


//get all todos
app.get('/', async (req,res) => {

   res.send('hi');

})

app.get('/todos/:userEmail', async (req, res) => {
    console.log(req);
    const {userEmail}=req.params;
    console.log('=>',userEmail);
    
    try {
        const todos = await pool.query('SELECT * FROM todos1 WHERE user_email = $1',[userEmail]);
        res.json(todos.rows);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.listen(PORT,( )=> console.log(`server is running on port : ${PORT}`))

