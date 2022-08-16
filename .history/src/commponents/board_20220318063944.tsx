import React from "react";
import { useSelector } from "react-redux";

export const Board: React.FC = () => {
    const state = useSelector(state => state)
    console.log(state);
    return (
        <div className="boardContainer">

        </div>
    );
};