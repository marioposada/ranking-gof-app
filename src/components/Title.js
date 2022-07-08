import React from 'react';
import { Box, theme, Text } from '@chakra-ui/react';

export default function Title() {
  return (
    <Text
      fontSize="60px"
      fontWeight={'bold'}
      fontFamily="sans-serif"
      display={'flex'}
      flexDirection="column"
      textAlign="center"
      color={'white'}
      textTransform="uppercase"
      pt="12"
     
    >
      world golf ranking
    </Text>
  );
}
