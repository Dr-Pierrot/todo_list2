import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Post = () => {
  
    let {id} = useParams();
    var [postObject, setPostObject] = useState([]);
    var [listOfComments, setListOfComments] = useState([]);
    var [comment, setComment] = useState("");


    
    

    useEffect(()=>{
        try{
            axios.get(`http://localhost:3001/posts/getId/${id}`).then((response)=>{
                setPostObject(response.data);
            })
        }catch(error){
        console.log(error);
        }

        try{
            axios.get(`http://localhost:3001/comments/${id}`).then((response)=>{
                setListOfComments(response.data);
            })
        }
        catch(error){
            console.log(error);
        }
        
    },[])

    const addComments = () => {
        axios.post(`http://localhost:3001/comments`, 
            {commentBody: comment, PostId: id}, 
            {headers:{accessToken: localStorage.getItem('accessToken')}})
            .then((response)=>{
                if(response.data.error){
                }else{
                    const commentToAdd = {commentBody: comment, username: response.data.username};  
                    setListOfComments([...listOfComments, commentToAdd]);
                    setComment("");
                }
            }
        )
    }

    return (
        <div className='postPage'>
            <div className='leftSide'>
                <div className='post' id='individual'>
                    <div className='title'>{postObject.title}</div>
                    <div className='body'>{postObject.postText}</div>
                    <div className='footer'>{postObject.username}</div>
                </div>
            </div>
            <div className='rightSide'>
                <div className='addCommentContainer'>
                    <input type='text' placeholder='Type a Comment..' autoComplete='off' value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
                    <button onClick={addComments}>Add Comment</button>
                </div>
                {listOfComments.map((comment, key)=>{
                  return (
                    <div className='listOfComments'>
                        <div className='comment'>
                            {comment.commentBody}
                            <label>
                                Username:{comment.username}
                            </label>
                        </div>
                    </div>
                  )  
                })}
                
            </div>
        </div>
    )
}


export default Post
