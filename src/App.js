import React from 'react';
import { ChakraProvider,theme,Container } from '@chakra-ui/react';
import Title from './components/Title';
import image from './assets/images/Blue-Doral-Monster-Hero.jpg';
import TableRanking from './components/TableRanking';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container bgImage={image} minH="100%" minW="100vw">
        <Title />
        
        <TableRanking />
      </Container>
    </ChakraProvider>
  );
}

export default App;