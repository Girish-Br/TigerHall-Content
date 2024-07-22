import React from 'react';
import { Center } from '@chakra-ui/react';
import '../styling/Loader.css';

const Loader: React.FC = () => (
  <Center h="100vh" w="100vh"  className="custom-loader">
    <div></div>
  </Center>
);

export default Loader;