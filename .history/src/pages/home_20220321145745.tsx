import { rest } from 'msw';
import React from 'react';
import worker from '../mocks/browser';
import axios from "axios";
import { Board } from '../components/board';
import { Header } from '../components/header';

export const Home: React.FC = () => {
    return (
        <div className="app">
            <Header></Header>
            <Board></Board>
        </div>
    );
  }
  