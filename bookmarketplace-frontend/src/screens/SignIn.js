import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { signin } from '../actions/auth';

import { Grid,
    Image,
    Heading,
    Button,
    Input,
    Flex,
    FormControl,
    Box,
    FormLabel,
    Divider,
    Text
} from "@chakra-ui/react";
import bookIllustation from "../assets/bookIllustation.svg";

const SignIn = ({signin, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.id]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        signin(email, password);
    };

    if (isAuthenticated)
        return <Redirect to='/' />;

    return (
        <Grid templateColumns="repeat(7, 1fr)" h="calc(100vh - 80px)" >
            <Flex gridColumn="span 3" bg="#263772" alignItems="center" justifyContent="center">
                <Image boxSize="450px" src={bookIllustation} alt="bookIllustation"/>
            </Flex>
            <Flex gridColumn="span 4" bg="#FBFBFB">
                <Flex minHeight='calc(100vh - 80px)' width='full' align='center' justifyContent='center'>
                    <Box 
                        borderWidth={1}
                        px={4}
                        width='full'
                        maxWidth='500px'
                        borderRadius={4}
                        textAlign='center'
                        boxShadow='md'
                        bg="white"
                    >
                        <Box p={4}>
                            <form method="POST" onSubmit={e => onSubmit(e)}>
                                <Flex my={8} textAlign='left' flexDir="column">
                                    <FormControl>
                                    <Heading mb={8} fontSize={40} fontWeight="500">Identifikohu</Heading>
                                    <FormLabel>Email</FormLabel>
                                    <Input id='email' onChange={e => onChange(e)} type='email' placeholder='Vendosni adresen tuaj te emailit' />
                                    </FormControl>

                                    <FormControl mt={4}>
                                    <FormLabel>Password</FormLabel>
                                    <Input id='password' onChange={e => onChange(e)} type='password' placeholder='Vendosni passwordin tuaj' />
                                    </FormControl>
                                    <Box alignSelf="flex-end" w="inherit">
                                        <Link to="/resetpassword">
                                            <Button my={6} colorScheme="blue" variant="link">Keni harruar fjalkalimin?</Button>
                                        </Link>
                                    </Box>
                                    <Button type='submit' colorScheme="blue" variant="solid" width='full' >Identifikohu</Button>
                                    <Flex align="center">
                                        <Divider my={8}/>
                                        <Text fontSize={16} color="gray.400" mx={6}>ose</Text>
                                        <Divider my={8}/>
                                    </Flex>
                                    <Link to="/signup">
                                        <Button colorScheme="blue" variant="outline" width='full' >Regjistrohu</Button>
                                    </Link>
                                </Flex>
                            </form>
                        </Box> 
                    </Box>
                </Flex>
            </Flex>
        </Grid>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signin })(SignIn);