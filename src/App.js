import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from "react";
import axios from "axios"

import Cards from "./Components/cards"
function App() {
  const [values,setValues]=useState();
  const [listTasks,setTasks]=useState();
  
  //console.log(values);
  console.log(listTasks);
  const handelChangeValues=(value)=>{
    console.log(value.target.value)
    setValues((prevValue)=>({
      ...prevValue,
    [value.target.name]:value.target.value,
    }));
  };
  useEffect(()=>{
    axios.get("http://127.0.0.1:8080/tasks")
    .then((response)=>{
      setTasks(response.data)
      
    })
  
    
  },[]);
  const handelClickButton=()=>{
    
    axios.post("http://127.0.0.1:8080/task/add",{
      task:values.task,
      description:values.description,
      status:values.status,
      date_ini:values.date_ini,
      date_end:values.date_end
    }).then((response)=>{
        if(response.data.insert==true){
          alert('insert')
          
        }
      })
      
  }



  
  return (
    <div className="App--container">
       <div className="register--container">
<h1 className="register--title">ToDo List </h1>
<p>Gestão de Tarefas - Faça getsão de suas tarefas de forma simples e eficiente.</p>
 

       </div>

       <input  type="text" id="myInput" onKeyUp={findInTable} placeholder="Search for task" title="Type in a task"/>
      
       <table id="myTable">
       <button id="btn_add" onClick={ showModal}>+</button>
  <tr className="header">
    <th >Tarefa</th>
    <th >Descrição</th>
    <th >Estado</th>
    <th >Data Início</th>
    <th >Data fim</th>
  
  </tr>
 <tbody onClick={tbClick}>
  


          {typeof listTasks!== "undefined"&& listTasks.map((value)=>{
            return <Cards key={value.id} listCards={listTasks} setListCard={setTasks}
            id={value.id}
            task={value.task}
            status={value.status}
            description={value.description}
            date_ini={value.date_ini}
            date_end={value.date_end}
            ></Cards>; 
          })}
          </tbody>
          </table>



 
 
<div id="myModal" class="modal">

  
  <div class="modal-content">
    <span class="close" onClick={hideModal}>&times;</span>
    <h1 className="register--title"><span id="idaddTask">Criar tarefa</span></h1>
    <input className="register-input" onChange={handelChangeValues} name="task" id="task" placeholder="Tarefa"/>
 
 <textarea  className="register-input" onChange={handelChangeValues} name="description" id="description" placeholder="Descrição"></textarea>
   <select className="register-input" onChange={handelChangeValues} name="status" id="status">
     <option value="Feito">Feito</option>
     <option value="Não feito">Não feito</option>
   </select> 
   <input className="register-input" onChange={handelChangeValues} name="date_ini" id="date_ini" type="text" placeholder="Data de início"/>
   <input className="register-input" onChange={handelChangeValues} name="date_end" id="date_end" type="text" placeholder="Data final"/>
     <button className="register--button" onClick={handelClickButton}>Cadastrar</button>
  </div>

</div>
    </div>
  );
}

export default App;


function findInTable() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

function showModal(){
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0]
modal.style.display = "block";
document.getElementById('idaddTask').innerText="Criar tarefa"
} 

function hideModal(){
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0]
  modal.style.display = "none";
  } 


function tbClick(){
  var table = document.getElementsByTagName("table")[0];
  var tbody = table.getElementsByTagName("tbody")[0];
  tbody.onclick =function (e) {
    e = e || window.event;
    var data = [];
    var target = e.srcElement || e.target;
    while (target && target.nodeName !== "TR") {
        target = target.parentNode;
    }
    if (target) {
        var cells = target.getElementsByTagName("td");
        for (var i = 0; i < cells.length; i++) {
            data.push(cells[i].innerHTML);
        }
    }
  // console.log(data)
  /* document.getElementById('idTitle').innerText=data[0]
   document.getElementById('idDesc').innerText="Descrição:"+data[1]
  document.getElementById('idStatus').innerText="Estado:"+data[2]
  document.getElementById('idD_Ini').innerText=data[3]
  document.getElementById('idD_end').innerText="Data fim:"+data[4]*/
  //values input
  document.getElementById('task').value=data[0]
  document.getElementById('description').value=data[1]
  document.getElementById('date_ini').value=data[3]
  document.getElementById('date_end').value=data[4]
  document.getElementById('status').value=data[2]
 
 

   showModal()
   document.getElementById('idaddTask').innerText="Editar Tarefa"
    
    ;}
}