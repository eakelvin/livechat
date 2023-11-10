import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import Chat from './Components/Chat'
import JoinChat from './Components/JoinChat'

const socket = io.connect("http://localhost:3000")

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  return (
    <>
      {
        !showChat ? 
          ( <JoinChat 
              socket={socket} 
              username={username} setUsername={setUsername} 
              room={room} setRoom={setRoom} 
              showChat={showChat} setShowChat={setShowChat} 
            /> 
          ) 
        : 
          (<Chat socket={socket} username={username} room={room} />)
      }
    </>
  )
}

export default App
