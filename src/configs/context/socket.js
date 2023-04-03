import io from 'socket.io-client'
import { createContext } from 'react'
export const socket = io.connect(import.meta.env.VITE_SOCKET_IO)

export const SocketContext = createContext()
