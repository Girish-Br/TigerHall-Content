import React from 'react';
import { Spinner, Center } from '@chakra-ui/react';

const Loading: React.FC = () => (
  <Center h="100vh">
    <Spinner size="xl" />
  </Center>
);

export default Loading;