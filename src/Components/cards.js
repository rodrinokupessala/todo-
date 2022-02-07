import React from "react"
export default function Card(props){
    return <tr className="card--container">
    
       
      
    <td>{props.task}</td>
    <td>{props.description}</td>
    <td>{props.status}</td>
    <td>{props.date_ini}</td>
    <td>{props.date_end}</td>
 
 
    </tr>
}

 
