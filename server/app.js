const express = require('express')
const app = express()
const port = 8080
const cors =require('cors')


const mysql=require('mysql')
const db=mysql.createPool({
  host:"127.0.0.1",
  user:'root',
  password:"",
  database:"Task"
})

app.use(cors('*'));
app.use(express.json());
app.post('/task/add', (req, res) => {
 const {task}=req.body
 const {description}=req.body
 const {status}=req.body
 const {date_ini}=req.body
 const {date_end}=req.body
 let sql="INSERT INTO tasks (task,description,status,date_ini,date_end) values(?,?,?,?,?)";
 db.query(sql,[task,description,status,date_ini,date_end],(err,result)=>{
  if(err)console.log(err)
  else res.send({status:200,insert:true});
  //console.log(resul)
 })
})
app.get('/tasks',(req,res)=>{
  let sql="select*from tasks;"
  db.query(sql,(err,result)=>{
    if(err)console.log(err)
    else res.send(result);
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})