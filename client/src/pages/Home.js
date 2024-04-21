import React from 'react'
import {useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Home() {
    const [listOfPost, setListOfPost] = useState([]);
    let navigate = useNavigate();

    useEffect(()=>{
        try{
        axios.get("http://localhost:3001/posts").then((response)=>{
            setListOfPost(response.data);  
        })
        
        
        }catch(error){
        console.log(error);
        }
        
    },[])
    
  return (
    <div>
      {listOfPost.map((item,key)=>{
        return (
            <div className='post' 
                key={key} 
                onClick={()=>{
                    navigate(`/post/${item.id}`)}
                }
            >
            <div className='title'>{item.title}</div>
            <div className='body'>{item.postText}</div>
            <div className='footer'>{item.username}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
