import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import BookMarkCard from '../Components/BookMarkCard'
import Navbar from '../Components/Navbar'

function BookMark() {
    const [bookmark, setbookmark] = useState([])
    const token = localStorage.getItem('token') || ""

    const fetchData = ()=>{
        fetch(`https://peaceful-oasis-70629.herokuapp.com/bookmark`,{
            "method":"GET",
            "headers":{
                "content-type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setbookmark(data.bookmark)
        })
        .catch((err)=>{
            console.log("error")
        })
    }

    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>
        <Navbar/>
        <SimpleGrid marginTop={'30px'} columns={[1, 2, 4]} spacing='40px'>
            {bookmark?.map((el)=><BookMarkCard el={el}/>)}
        </SimpleGrid>
    </div>
  )
}

export default BookMark