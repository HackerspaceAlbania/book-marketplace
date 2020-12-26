import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';

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
    Text,
} from "@chakra-ui/react";
import bookIllustation from "../assets/bookIllustation.svg";

const ResetPasswordConfirm = (props) => {
    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.id]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        
        const uid = props.match.params.uid;
        const token = props.match.params.token;

        props.reset_password_confirm(uid, token, new_password, re_new_password);
        setTimeout(() => {
            setRequestSent(true);
        }, 5000);
    };

    if (requestSent)
        return <Redirect to='/signin' />
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
                                            <Heading mb={8} fontSize={40} fontWeight="500">Rikthe Fjalkalimin</Heading>
                                            <FormLabel>Fjalkalimi i ri</FormLabel>
                                            <Input isRequired 
                                            onChange={e => onChange(e)}
                                            id='new_password' 
                                            type='password' 
                                            placeholder='Vendosni fjalkalimin e ri'/>
                                        </FormControl>
                                        <FormControl mt={4}>
                                            <FormLabel>Konfirmoni fjalkalimin e ri</FormLabel>
                                            <Input isRequired 
                                            onChange={e => onChange(e)}
                                            id='re_new_password' 
                                            type='password'
                                            placeholder='Konfirmoni fjalkalimin e ri'/>
                                        </FormControl>
        
                                        <Button type='submit' mt={8} colorScheme="blue" variant="solid" width='full'>Konfirmoni ndryshimin</Button>
                                        <Flex align="center">
                                            <Divider my={8}/>
                                            <Text fontSize={16} color="gray.400" mx={6}>ose</Text>
                                            <Divider my={8}/>
                                        </Flex>
                                        <Link to="/signin">
                                            <Button colorScheme="blue" variant="outline" width='full'>Identifikohu</Button>
                                        </Link>
                                    </Flex>
                                </form>
                            </Box>
                        </Box>
                    </Flex>
                </Flex>
            </Grid>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);