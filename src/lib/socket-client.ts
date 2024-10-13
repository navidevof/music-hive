import { io, Socket } from "socket.io-client";
import { ref } from "vue";

const socket: Socket = io(import.meta.env.VITE_API_URL, {
	autoConnect: false,
});

// Reactive property to track connection status
const isConnected = ref(false);

// Functions to connect and disconnect
const connect = () => {
	socket.connect();
};

const disconnect = () => {
	socket.disconnect();
};

// Listen to connection events
socket.on("connect", () => {
	isConnected.value = true;
	console.log("Conectado a Socket.io");
});

socket.on("disconnect", () => {
	isConnected.value = false;
	console.log("Desconectado de Socket.io");
});

// Listen for errors
socket.on("connect_error", (err: any) => {
	console.error("Error de conexión con Socket.io:", err.message);
});

export const useSocket = () => {
	return { socket, isConnected, connect, disconnect };
};

export default socket;
