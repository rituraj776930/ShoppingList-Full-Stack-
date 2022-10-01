import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BookMark from '../Pages/BookMark'
import Form from '../Pages/Form'
import HomePage from '../Pages/HomePage'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import PrivateAuth from './PrivateAuth'

function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/form' element={
                <PrivateAuth>
                <Form/>
                </PrivateAuth>
            }
            />
            <Route path='/home' element={
                <PrivateAuth>
                <HomePage/>
                </PrivateAuth>
            }
            />
            <Route path='/bookmark' element={
                <PrivateAuth>
                <BookMark/>
                </PrivateAuth>
            }
            />
        </Routes>
    </div>
  )
}

export default AllRoutes