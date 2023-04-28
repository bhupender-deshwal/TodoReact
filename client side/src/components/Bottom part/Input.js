import './Input.css';
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import ShowData from '../../Container/ShowData';
import { Button } from 'antd';

function InputField(props) {
    const [item, setItem] = useState('');
    const [data, setData] = useState([]);
    const [call, setCall] = useState(0);
    const [update,setUpdate]=useState(false)
    const [upid, setupid] = useState('');

   useEffect(()=>{
    axios.get("http://localhost:5000/"
    ).then(response => {
       console.log(response.data)
       setData([...response.data])
     })
     .catch(err => {
       console.log(err);
       });
   },[call])

function postApi(){
    axios.post("http://localhost:5000/", {name:item}
    ).then(response => {
         console.log(response) 
         
         setCall(call+1)     
     })
     .catch(err => {
       console.log(err);
       });
}

    function PostItem() {
       item===''?
        alert('Please Add Item'):
      postApi()
      
      setItem('');
     }  

function deleteItem (id){
    
    axios.delete('http://localhost:5000/', {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
          ,
        data: {
          name: id
        }
      }
    ).then(response => {
        console.log(response) 
        setCall(call+1) 
        setItem('')
        setUpdate(false)
    })
    .catch(err => {
      console.log(err);
      });   
}

function EditItem (id){
    axios.get("http://localhost:5000/"
    ).then(response => {
       console.log(response.data)
       setItem(response.data[id].name)
       setUpdate(true)
       setupid(response.data[id].name)
     })
     .catch(err => {
       console.log(err);
       });
}
function updateItem (){
    axios.post("http://localhost:5000/up", [{name:upid},{name:item}]
    ).then(response => {
         console.log(response) 
         setUpdate(false)
         setCall(call+1) 
         setItem('')    
     })
     .catch(err => {
       console.log(err);
       });
}
    
    return (<div>
        <input className='InPut' type='text' placeholder='Add Items' value={item}
        onChange={(e)=>setItem(e.target.value)}
        />
        
        { update?
            <Button type="primary" onClick={()=>updateItem()} >Update</Button>:
            <Button type="primary" onClick={PostItem} >Add</Button>
        }
        
        <div className="showData">
        <ul style={{listStyle:'none'}}>
            {
              data.map((item,id1)=>{
                    return(<li  key={id1} className='list'><ShowData data={item.name}/>
                        <Button  type="primary" danger onClick={()=>deleteItem(item.name)} >Delete</Button>
                     <Button style = {{backgroundColor:'greenyellow',color:'blue'}} type="primary" onClick={()=>EditItem(id1)} >Edit</Button>
                    </li>)
                })
            }
        </ul>         
        </div>
    </div>);
    
}

export default InputField;