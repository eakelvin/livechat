import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                user: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send-message", messageData)
            setMessageList((list) => [...list, messageData])
            setCurrentMessage("")
        }
    }

    // useEffect(() => {
    //     socket.on("receive-message", (data) => {
    //         console.log("Message received:", data);
    //         setMessageList((list) => [...list, data])
    //     })
    // }, [socket])

    useEffect(() => {
        const receiveMessageHandler = (data) => {
            console.log("Message received:", data);
            setMessageList((list) => [...list, data]);
        };

        socket.on("receive-message", receiveMessageHandler);

        return () => {
            socket.off("receive-message", receiveMessageHandler);
        };
    }, [socket]);

  return (
    <div className='flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10'>
      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
      <ScrollToBottom className='w-full h-full overflow-y-scroll overflow-x-hidden'>
      {messageList.map((content) => {
            return (
              <div className={username === content.user ? "flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end" : "flex w-full mt-2 space-x-3 max-w-xs"}>
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                <div>
                  <div className={username === content.user ? "bg-gray-300 p-3 rounded-r-lg rounded-bl-lg" : "bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg"}>
                    <p className="text-sm">{content.message}</p>
                  </div>
                  <span className="text-xs text-gray-500 leading-none">{content.time}</span>
                </div>
              </div>
              
            )
          })}
        </ScrollToBottom>
      

      <div className='bg-gray-300 p-4'>
        <input 
          type="text"
          value={currentMessage}
          className='flex items-center h-10 w-full rounded px-3 text-sm' 
          placeholder='Type your message'
          onChange={(event) => {setCurrentMessage(event.target.value)}}
          onKeyPress={(event) => {event.key === "Enter" && sendMessage()}} 
          />
        <button onClick={sendMessage}>Send</button>
      </div>


      </div>
      </div>
    </div>
  )
}

export default Chat
