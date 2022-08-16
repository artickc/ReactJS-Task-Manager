import { rest } from 'msw';
import React from 'react';
import worker from '../mocks/browser';
import axios from "axios";
import { Board } from '../components/board';
import { Header } from '../components/header';




export const Home: React.FC = () => {
    axios.get('/api/tasks').then((res)=>{
        console.log(res);
    })
    
    return (
        <div className="main">
            <Header></Header>
            <Board></Board>
        </div>
    );
  }
  