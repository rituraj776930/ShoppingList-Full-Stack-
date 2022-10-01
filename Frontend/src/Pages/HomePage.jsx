import { Box, Select } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Card from '../Components/Card'
import Navbar from '../Components/Navbar'
import { SimpleGrid } from '@chakra-ui/react'

function HomePage() {
    const [sort, setsort] = useState("")
    const [notes, setnotes] = useState([])
    const token = localStorage.getItem('token') || ""
    

    const filtering = (e)=>{
        let value = e.target.value
        
        if(value){
            setnotes(notes?.filter((item)=>item.priority == value))
        }
        else{
            fetchData()
        }
    }
    const handleDelete = (id)=>{
        fetch(`https://peaceful-oasis-70629.herokuapp.com/notes/${id}/delete`, {
        method:"DELETE",
        "headers":{
            "content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    }).then((res)=>{
        fetchData()
    })
    }
    const handlebookmark = (el)=>{
        fetch(`https://peaceful-oasis-70629.herokuapp.com/bookmark/create`,{
                "method":"POST",
                "body":JSON.stringify(el),
                "headers":{
                    "content-type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
                }).then((res)=>res.json()).then((data)=>{
                    alert("Added to bookmark")
                    console.log(data)
                    
                })
                .catch((err)=>{
                    alert("Error in posting data")
                })
    }
    const fetchData = ()=>{
        fetch(`https://peaceful-oasis-70629.herokuapp.com/notes`,{
            "method":"GET",
            "headers":{
                "content-type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setnotes(data.notes)
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
        <Box mt={"30px"} display={'flex'} justifyContent={'space-around'}>
            <Select maxWidth={'15vw'} onChange={filtering} placeholder='Filter By Priority'>
                        <option value=''>All</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
            </Select>

            <Select maxWidth={'15vw'} onChange={(e)=>setsort(e.target.value)}  placeholder='Sort by time'>
                        <option value='asc'>Time: Low to High</option>
                        <option value='dsc'>Time: High to Low</option>
            </Select>
        </Box>

        <SimpleGrid columns={[1, 2, 4]} spacing='40px'>
            {sort === 'asc'
                 ? notes?.sort((a,b)=>a.date_and_timeStamp - b.date_and_timeStamp).map((el)=><Card key={el._id} el={el} handleDelete={handleDelete} handlebookmark={handlebookmark} />)
                 : sort === 'dsc'
                 ? notes?.sort((a,b)=>b.date_and_timeStamp - a.date_and_timeStamp).map((el)=><Card key={el._id} el={el} handleDelete={handleDelete} handlebookmark={handlebookmark} />)
                 : notes.map((el)=><Card key={el._id} el={el} handleDelete={handleDelete} handlebookmark={handlebookmark} />)
            }
        </SimpleGrid>
    </div>
  )
}

export default HomePage