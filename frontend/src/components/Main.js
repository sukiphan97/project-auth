import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import thoughts from "reducers/thoughts";
import { API_URL } from "ultils/api";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { HiOutlineUserCircle } from "react-icons/hi";
import moment from "moment";

const Main = () => {
    const [newThought, setNewThought] = useState('');

    const thoughtItems = useSelector(store => store.thoughts.items)
    const accessToken =  useSelector(store => store.user.accessToken)
    const username = useSelector(store => store.user.username)
    
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
        try {
            fetch(API_URL('thoughts'), options)
            .then(res => res.json())
            .then(data => dispatch(thoughts.actions.setThoughts(data)))
        }
        catch (error) {
            console.log(error)
        }
    }, [[], newThought])

    //Post new thoughts
    const onFormSubmit = (e) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify({username: username ,message: newThought, accessToken: accessToken}),
        }

        try {
            fetch(API_URL('newthought'), options)
        } 
        catch (error) {
            console.log(error)
        }
    }
 
    const OnLikeClick = (thoughtId) => {
        const options = {
            method: 'POST',
            headers: {
            'Content-Type':'application/json',
            },
        }

        try {
            fetch(API_URL(`${thoughtId}/like`), options)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <h1>Happy Thoughts</h1>
             <ThoughtForm onSubmit={onFormSubmit}>
                <textarea type='text'
                       rows= '5'
                       value={newThought}
                       onChange={(e) => setNewThought(e.target.value)}
                />
                <button type="submit">Share Happy Thoughts</button>
            </ThoughtForm>
            <ThoughtContainer>
                {thoughtItems.map(item => {
                return (
                    <ThoughtCard key={item._id}>
                        <CardHeader>
                            <HiOutlineUserCircle />
                            <Username>{ item.username ? item.username : '' }</Username>
                        </CardHeader> 
                        <p>{item.message}</p>
                        <Like>
                            <TimeContainer>
                                <LikeBtn onClick={() => OnLikeClick(item._id)}><span aria-label="heart-icon">❤️</span></LikeBtn>
                                <LikeNumber>x {item.hearts}</LikeNumber>
                            </TimeContainer>
                                 <Time className="date">{moment(item.createdAt).fromNow()}</Time> 
                        </Like>
                    </ThoughtCard>
                    )
                })}
            </ThoughtContainer>
        </Container>
    )
}

export default Main;

const Container = styled.div`
    background-color: #ffebef;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 40px;
`
const ThoughtForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 340px;

    textarea {
        padding: 20px;
        text-align: start;
        outline: none;
        border-radius: 10px;
        border: none;
    }

    button {
        background-color:#FF8A80;
        height: 45px;
        padding: 5px;
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        border: none;
        background-color: #FF8A80;
        border-radius: 5px;
        margin-top: 10px;
    }
`

const ThoughtContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 340px;
    margin: 10px 0;
`

const ThoughtCard = styled.div`
    background-color: #fff;
    height: 180px;
    padding: 20px;
    overflow-wrap: break-word;
    overflow-y: scroll;
    border-radius: 10px;
    position: relative;
`

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
`

const Username = styled.span`
    font-weight: 700;

`

const TimeContainer = styled.div`
    display: flex;
    align-items: center;
`

const Time = styled.span`
   color: #666;

`

const Like = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 15px;
    width: 90%;

`

const LikeNumber = styled.span`
  
`

const LikeBtn = styled.button`
    background: #ffcdd2;
    border: none;
    padding: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`