import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function BookMarkCard({el}) {

     
    return (
      <Center py={6}>
        <Box
            width={"330px"}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {el.title}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            Priority : {el.priority}
          </Text>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            Description : {el.description}
          </Text>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            Quantity:{el.quantity}
          </Text>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            Date and Time : {el.date_and_timeStamp}
          </Text>

  
          
  
          
          
        </Box>
      </Center>
    );
  }