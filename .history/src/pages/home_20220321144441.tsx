import { rest } from 'msw';
import React from 'react';
import worker from '../mocks/browser';
import axios from "axios";
import { Board } from '../components/board';
import { DenseAppBar } from '../components/appBar';
import { Routes ,Route } from 'react-router-dom';

export function home() {
    return (
        <div className="app">
            <DenseAppBar></DenseAppBar>
            <Board></Board>
        </div>
    );
  }
  