import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Select,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Navbar from '../Components/Navbar';
  
  export default function Form() {
    const token = localStorage.getItem("token") || ""
    const [showPassword, setShowPassword] = useState(false);
    const [title, settitle] = useState("")
    const [quantity, setquantity] = useState("")
    const [priority, setpriority] = useState("")
    const [date_and_timeStamp, setdate_and_timeStamp] = useState("")
    const [description, setdescription] = useState("")

    const handleSubmit = ()=>{
        if(title && quantity && priority && date_and_timeStamp && description){
            let obj = {title, quantity, priority, description , date_and_timeStamp}
            fetch(`https://peaceful-oasis-70629.herokuapp.com/notes/create`,{
                "method":"POST",
                "body":JSON.stringify(obj),
                "headers":{
                    "content-type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
                }).then((res)=>res.json()).then((data)=>{
                    if(data.newNotes){
                        alert("Posted successfully")
                    }
                    else{
                        alert("error in posting")
                    }
                    
                })
                .catch((err)=>{
                    alert("Error in posting data")
                })
        }
        else{
            alert("Please fill all fields")
        }
    }
  
    return (
        <>
        <Navbar/>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Fill the Form
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input onChange={(e)=>settitle(e.target.value)} type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Quantity</FormLabel>
                    <Input onChange={(e)=>setquantity(e.target.value)} type="number" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl>
              <FormLabel>Priority</FormLabel>
              <Select onChange={(e)=>setpriority(Number(e.target.value))} maxWidth={'25vw'} >
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
            </Select>
            </FormControl>
              
              <FormControl id="email" isRequired>
                <FormLabel>Description</FormLabel>
                <Input onChange={(e)=>setdescription(e.target.value)} type="text" />
              </FormControl>
              
              <FormControl id="email" isRequired>
                <FormLabel>Date_and_time</FormLabel>
                <Input onChange={(e)=>setdate_and_timeStamp(e.target.value)} type="number" />
              </FormControl>
              
                
              
              <Stack spacing={10} pt={2}>
                <Button
                onClick={handleSubmit}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Submit
                </Button>
              </Stack>
              <Stack pt={6}>
               
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      </>
    );
  }