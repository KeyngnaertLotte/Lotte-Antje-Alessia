import type { Buffer } from 'buffer'
import { type Socket, io } from 'socket.io-client'
import useFirebase from './useFirebase'

const { firebaseUser } = useFirebase()

// const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
const socket: Socket = io('http://localhost:3004', {
  extraHeaders: {
    Authorization: `Bearer ${await firebaseUser.value?.getIdToken()}`,
  },
})

const emit = (event: string, data: any) => {
  socket.emit(event, data)
}

const on = (event: string, callback: (data: any) => void) => {
  socket.on(event, callback)
}

export default () => {
  return {
    // Socket instance
    socket,

    // Generic functions
    emit,
    on,
  }
}