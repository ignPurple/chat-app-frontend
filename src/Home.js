import ChatBox from './ChatBox'

function Home(props) {
    function sendMessage(event) {
        if (event.shiftKey) {
            return true;
        }

        if (event.code !== "Enter") {
            return true;
        }

        event.preventDefault();
        let username = document.getElementById("username-input").value;
        if (username.trim() === '' || username.length > 16) {
            return;
        }

        props.stompClient.publish({
            destination: "/message",
            body: JSON.stringify({
                username: document.getElementById("username-input").value,
                message: event.target.value
            }),

        })
        event.target.value = "";
    }

    return <div className="container">
        <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet' />
        <div className="chat">
            <div>
                <text className="username-text">Username: </text>
                <input id="username-input" className="username" maxLength="20"/>
            </div>
            <ChatBox stompClient={props.stompClient} />
            <textarea className="message-form" onKeyDown={sendMessage}/>
        </div>
    </div>
}

export default Home;