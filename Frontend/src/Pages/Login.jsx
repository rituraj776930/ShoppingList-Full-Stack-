import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
  
  export default function Login() {
    const navigate = useNavigate()
    const [email , setemail] = useState("")
    const [password , setpassword] = useState("")

    const handleSubmit = ()=>{
        if(email && password){
            let obj = {email,password}
            fetch(`https://peaceful-oasis-70629.herokuapp.com/user/login`,{
                "method":"POST",
                "body":JSON.stringify(obj),
                "headers":{"content-type" : "application/json"}
                }).then((res)=>res.json()).then((data)=>{
                    if(data.token){
                        localStorage.setItem("token", data.token)
                        alert("Login successful")
                        navigate("/form")
                    }
                    else{
                        alert("Invalid Credentials")
                    }
                    
                })
                .catch((err)=>{
                    alert("Error in login")
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
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input onChange={(e)=>setemail(e.target.value)} type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input onChange={(e)=>setpassword(e.target.value)} type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                onClick={handleSubmit}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      </>
    );
  }