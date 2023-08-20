import React from 'react'

function JoinChat({socket, username, room, setUsername, setRoom, setShowChat}) {

    const joinRoom = () => {
        if (username !== "" && room !== "") {
          socket.emit("join-room", room)
          setShowChat(true)
        }
      }

  return (
    <div>
        <div className='w-full max-w-xs m-auto mt-40'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h3 className='text-5xl mb-6 font-bold'>Join a Chat</h3>
        <div className='mb-6'>
          <input 
            type="text"
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"' 
            id="" 
            placeholder='Enter your username' 
            onChange={(event) => {setUsername(event.target.value)}} 
          />
        </div>
        <div className='mb-6'>
          <input 
            type="text"
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"'
            placeholder='ROOM ID...' 
            onChange={(event) => {setRoom(event.target.value)}} 
          />
        </div>
          <button 
            className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full' 
            onClick={joinRoom}>
            Join a room
          </button>
        </form>
      </div>
      
    </div>
  )
}

export default JoinChat

