import React, { useState } from "react";
import useSocket from 'use-socket.io-client';
const ENDPOINT = "http://127.0.0.1:4001";



function TimeSocket() {
    const [stages, setStages] = useState([]);
    const [socket] = useSocket(ENDPOINT, { transports: ['websocket'] })
    socket.connect()
    console.log('socket', socket)

    //add event
    socket.on('stages', (data) => {
        console.log(data);
    });

    //emit
    socket.emit('message', 'this is demo..');

    const updateStage = (id) => {
        console.log('id', id)
        // socket.emit('update_stage', { id }, function (dataFromServer) {
        //     console.log("From SERVER: ", dataFromServer);
        // });

    }

    return (
        <div>
            {stages.map(stage => (<button
                key={stage.id}
                className={`button ${stage.done ? "done" : ""}`}
                onClick={() => updateStage(stage.id)}>
                {stage.status}
            </button>))}
        </div>
    );
}

export default TimeSocket;