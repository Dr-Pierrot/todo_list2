import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function Signup() {
    
    const initialValues = {
        username: "",
        password:"",
    }

    const onSubmit = (data) => {
        console.log(data);
        try{
            axios.post("http://localhost:3001/auth/", data).then((response)=>{
                alert(response.data);
            })
        }catch(error){
            console.log(error);
        }
    }
    
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("Please enter a username!"),
        password: Yup.string().min(6).max(15).required("Please enter a password!")

    });

  return (
    <div className='createPostPage'>
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit} 
            validationSchema={validationSchema}
        >
            <Form className='formContainer'>
                <label>Username: </label>
                <ErrorMessage name='username' component="span"/>
                <Field 
                    id="inputCreatedPost" 
                    name="username" 
                    placeholder="Ex. John123..."
                />
                <label>Password: </label>
                <ErrorMessage name='password' component="span"/>
                <Field 
                    id="inputCreatedPost" 
                    type="password"
                    name="password" 
                    placeholder="Password..."
                />
                <button type='submit'>Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}
