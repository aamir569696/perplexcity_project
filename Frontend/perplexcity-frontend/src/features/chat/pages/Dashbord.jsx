import React from 'react'
import { useChat } from '../hooks/useChat'
import { useEffect } from 'react'

const Dashbord = () => {

  const chat=useChat()

  useEffect(() => {
    chat.initializeSocketConnection()
  }, [])
  

  return (
    <div>welcome to Dashbord</div>
  )
}

export default Dashbord