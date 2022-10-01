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
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
  
  export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const [firstName , setfirstName] = useState("")
    const [lastName , setlastName] = useState("")
    const [email , setemail] = useState("")
    const [password , setpassword] = useState("")

    const handleSubmit = ()=>{
        if(email && password && firstName && lastName){
            let obj = {email, password}
            fetch(`https://peaceful-oasis-70629.herokuapp.com/user/signup`,{
                "method":"POST",
                "body":JSON.stringify(obj),
                "headers":{"content-type" : "application/json"}
                }).then((res)=>res.json()).then((data)=>{
                    if(data.message === 'Sign up successful'){
                        alert("Sign up successful")
                        navigate("/login")
                    }
                    else if(data.message === 'Account already exists'){
                        alert("Account already exists")
                    }
                    console.log(data)
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
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
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
                    <FormLabel>First Name</FormLabel>
                    <Input onChange={(e)=>setfirstName(e.target.value)} type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input onChange={(e)=>setlastName(e.target.value)} type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input onChange={(e)=>setemail(e.target.value)} type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input onChange={(e)=>setpassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      </>
    );
  }