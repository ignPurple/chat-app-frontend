import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home';
import './Home.css'
import {Client} from "@stomp/stompjs";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const stompClient = new Client({
    brokerURL: 'wss://chat.driftmc.net:8443/stomp'
});
console.log(stompClient.connectHeaders);

stompClient.activate();

root.render(
    <Home stompClient={stompClient}/>
)