import React, { useEffect, useState } from "react";
import { useDispatch, batch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import user from "reducers/user";
import { API_URL } from "ultils/api"; 
import { useNavigate } from "react-router-dom";

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
            setUsername('')
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
        <>
            <label htmlFor="signup">Sign up</label>
            <input 
                type='radio'
                id="signup"
                checked={ mode === 'signup' }
                onChange={() => setMode('signup')}
            />
            <label htmlFor="signin">Sign in</label>
            <input 
                type='radio'
                id="signin"
                checked={ mode === 'signin' }
                onChange={() => setMode('signin')}

            />
            <p>{error}</p>
            <form onSubmit={onFormSubmit}>
                <label htmlFor="username">User name</label>
                <input id="username" 
                    type='text' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input id="password" 
                    type='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}  />
                <button type="submit">Login</button>
                <Link to='/'>Here</Link>
            </form>
        </>
    )
}

export default Login