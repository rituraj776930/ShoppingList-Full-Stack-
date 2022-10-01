import { Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <Box bg='tomato' w='100%' p={4} color='white' justifyContent={'space-around'} display={'flex'}>
            <Link to={"/login"}>Login</Link>
            <Link to={"/"}>Signup</Link>
            <Link to={"/home"}>HomePage</Link>
            <Link to={"/form"}>Form</Link>
            <Link to={"/bookmark"}>Bookmark</Link>
    </Box>
  )
}

export default Navbar