"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import { Socket } from "socket.io-client";

import socketService from "@/services/socket";

interface SocketContextType {
    socket: Socket | null;
    connected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    connected: false,
});

interface SocketProviderProps {
    children: ReactNode;
}

export function SocketProvider({
    children,
}: SocketProviderProps) {

    const [socket, setSocket] = useState<Socket | null>(null);

    const [connected, setConnected] = useState(false);

    useEffect(() => {

        const socketInstance =
            socketService.connectSocket();

        setSocket(socketInstance);

        const handleConnect = () => {

            console.log("🟢 Socket Connected");

            setConnected(true);

        };

        const handleDisconnect = () => {

            console.log("🔴 Socket Disconnected");

            setConnected(false);

        };

        socketInstance.on(
            "connect",
            handleConnect
        );

        socketInstance.on(
            "disconnect",
            handleDisconnect
        );

        if (socketInstance.connected) {
            setConnected(true);
        }

        return () => {

            socketInstance.off(
                "connect",
                handleConnect
            );

            socketInstance.off(
                "disconnect",
                handleDisconnect
            );

        };

    }, []);

    return (

        <SocketContext.Provider
            value={{
                socket,
                connected,
            }}
        >
            {children}
        </SocketContext.Provider>

    );

}

export function useSocket() {

    return useContext(SocketContext);

}