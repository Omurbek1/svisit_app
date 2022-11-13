import React from 'react'
import { Redirect } from 'react-router'
import { useState } from 'react';
import '../App.css'
export const LoginForm = ({ user, onSignIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const onAuth = (e) => {
    e.preventDefault()
    onSignIn({ username, password }).then((res) => {
      if (res === false) {
        setError(true)
        setTimeout(() => { setError(false) }, 1000)
      }
    })
  }

  if (user.username && user.password) return <Redirect to='/' />
  return (
    <div class="bg-gray-500 min-h-screen flex items-center justify-center w-75">
      <form class="flex flex-col gap-4" onSubmit={onAuth}>
        {
          error
            ?
            <div className="warning">
              <span>Ошибка входdа!</span>
            </div>
            :
            null
        }
        <h1 class='decoration-black font-bold text-xl'>Login</h1>
        <input class="p-2 mt-8 rounded-xl border w-75" type="text" name="username" placeholder='Enter login...' value={username} autoComplete={'false'} onChange={(e) => { setUsername(e.target.value) }} />
        <input class="p-2 rounded-xl border w-full text-lg " type="password" name="password" placeholder='Enter password...'  value={password} autoComplete={'false'} onChange={(e) => { setPassword(e.target.value) }} />
        <button class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
      </form>
      
    </div>
    


  )
}
