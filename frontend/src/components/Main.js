import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import thoughts from "reducers/thoughts";
import { API_URL } from "ultils/api";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const [newThought, setNewThought] = useState('')

    const thoughtItems = useSelector(store => store.thoughts.items)
    const accessToken =  useSelector(store => store.user.accessToken)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const options = {
        method: 'GET',
        headers: {
            'Authorization': accessToken
        },
    }

    //If accesstoken === null, navigate to login
    useEffect(() => {
        if (!accessToken) {
         navigate('/login')
        }
    }, [accessToken])

   //Fetch API to displat thoughts
    useEffect(() => {    
        fetch(API_URL('thoughts'), options)
        .then(res => res.json())
        .then(data => dispatch(thoughts.actions.setThoughts(data)))
    }, [[], newThought])

    //Post new thoughts
    const onFormSubmit = (e) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify({ message: newThought, accessToken: accessToken}),
        }

        fetch(API_URL('newthought'), options)
        .then(res => res.json())
        .then(data => console.log(data))
    }
 

    return (
        <div>
            <div>
                <h1>Happy Thoughts</h1>
                {thoughtItems.map(item => {
                return <div key={item._id}> 
                        <p>{item.message}</p>
                    </div>
                })}
            </div>
            <form onSubmit={onFormSubmit}>
                <label htmlFor="newThought">Add Thought</label>
                <input type='text'
                       id='newThought'
                       value={newThought}
                       onChange={(e) => setNewThought(e.target.value)}
                />
                <button type="submit">Share</button>
            </form>
        </div>
    )
}

export default Main