import React from 'react'
import axios from 'axios';

export default class ChatBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {messages: []};

        this.props.stompClient.onWebSocketError = (event) => {
            console.error('WebSocket error: ', event);
        };

        this.props.stompClient.onConnect = () => {
            console.log("Connected");

            axios.get("https://chat.driftmc.net:8443/loadall").then((result) => {
                result.data.reverse().map((message) => {
                    this.addMessage(message);
                })
            })

            this.props.stompClient.subscribe(`/topic/messages`, (message) => {
                this.addMessage(JSON.parse(message.body));
            });
        }
    }

    addMessage(message) {
        console.log(message);
        this.setState(prevState => ({
            messages: [...prevState.messages, message]
        }));
    }

    render() {
        return <div className="chatbox">
            {this.state.messages.slice().reverse().map(msg => {
                return <div className="message">
                    <div className="info">
                        <text className="author">{msg.username}</text>
                        <text className="time">{new Date(msg.timestamp).toLocaleTimeString()}</text>
                    </div>
                    <text className="text">{msg.message}</text>
                </div>
            })}
        </div>
    }
}