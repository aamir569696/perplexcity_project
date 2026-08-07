import {io} from "socket.io-client";

export function initializeSocketConnection() {
    const socket = io("http://localhost:3000", {
        withCredentials: true
    })

    socket.on("connect", () => {
        console.log("Connected to the server with socket ID:");
    })

    }
