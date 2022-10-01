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
import EditModal from './EditModal';
  
  export default function Card({el, handleDelete, handlebookmark}) {

     
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

  
          
  
          <Stack mt={8} direction={'row'} spacing={4}>
            <Button
            onClick={()=>handlebookmark(el)}
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              _focus={{
                bg: 'gray.200',
              }}>
              <EditModal/>
            </Button>
            <Button
            onClick={()=>handleDelete(el._id)}
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}>
              Delete
            </Button>
          </Stack>
        </Box>
      </Center>
    );
  }