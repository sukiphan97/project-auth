import React, { useEffect, useState } from "react";
import { useDispatch, batch, useSelector } from "react-redux";
import user from "reducers/user";
import { API_URL } from "ultils/api"; 
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import background from '../img/background.png'

const Login = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('')
    const [mode, setMode] = useState('signin')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const error = useSelector(store => store.user.error)
    const accessToken = useSelector(store => store.user.accessToken);

    useEffect(() => {
        if (mode === 'signup') {
        }
    },[mode]);

    useEffect(() => {
        if (accessToken){
            navigate('/')
        } 
    }, [accessToken])

    const onFormSubmit = (e) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify({ username, password}),
        }

        //POST REQUEST - Send username and password to backend
        fetch(API_URL(mode), options)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                //Dispatch 3 datas at the same time
                batch(() => { 
                    dispatch(user.actions.setUserId(data.response.userId))
                    dispatch(user.actions.setUsername(data.response.username))
                    dispatch(user.actions.setAccessToken(data.response.accessToken))
                    dispatch(user.actions.setError(null))
                 })
            } else {
                batch(() => { 
                    dispatch(user.actions.setUserId(null))
                    dispatch(user.actions.setUsername(null))
                    dispatch(user.actions.setAccessToken(null))
                    dispatch(user.actions.setError(data.response))
                 })
            }
        })
    }

    return (
        <Container>
            <Heading>Welcome back</Heading>
            <SubHeading>
                Sign in and start sharing your 
                happy thoughts today
            </SubHeading>           
            <p>{error}</p>
            <form onSubmit={onFormSubmit}>
                <Input id="username" 
                    type='text' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder = 'Email'
                />
                <Input id="password" 
                    type='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}  
                    placeholder = 'Password'
                />
                <Button type="submit">{mode === 'signin' ? 'Sign in' : 'Sign up'}</Button>
            </form>
            <Mode>{mode === 'signin' ? 'Not a member ? ' : 'Already member ? '} 
                <button onClick={() => setMode('signup')}>{mode === 'signin' ? 'Sign up' : 'Sign in'}</button>
            </Mode>         
        </Container>
    )
}

export default Login


const Container = styled.div`
    background: url(${background});
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 200px 30px 0 30px;

`

const Heading = styled.p`
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #fff;
    margin-bottom: 15px;
`

const SubHeading = styled.p`
    font-size: 16px;
    color: #eee;
    max-width: 30ch;
    line-height: 20px;
    letter-spacing: 0.5px;
    text-align: center;
    margin-bottom: 30px;

`
const Form = styled.form`
`
const Input = styled.input`
    display: block;
    width: 310px;
    height: 45px;
    padding: 5px;
    color: #000;
    border: none;
    outline: none;
    font-size: 16px;
    margin-bottom: 30px;
    border-radius: 5px;
`
const Button = styled.button`
    display: block;
    width: 310px;
    height: 45px;
    padding: 5px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    border: none;
    background-color: #FF8A80;
    border-radius: 5px;
    margin-top: 50px;
`
const Mode = styled.p`
    font-size: 18px;
    margin-top: 30px;
    color: #eee;

   button {
       color: #FF8A80;
       background: none;
       border: none;
       font-size: 18px;
       font-weight: 600;
   }
`