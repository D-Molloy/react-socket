import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function SockClient() {
    const [response, setResponse] = useState("");
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT, { transports: ['websocket'] });
        socket.on("FromAPI", data => {
            setResponse(data);
        });

        // CLEAN UP THE EFFECT
        return () => socket.disconnect();

    }, []);

    return (
        <div>
            <p>
                It's <time dateTime={response}>{response}</time>
            </p>
        </div>
    );
}

export default SockClient;