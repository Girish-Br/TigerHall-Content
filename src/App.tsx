import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import ContentList from './components/ContentList';
import "./styling/App.css"

const App: React.FC = () => (
  <ChakraProvider>
    <Box bg="#151617" textAlign="center" fontSize="xl">
      <ContentList />
    </Box>
  </ChakraProvider>
);

export default App;
