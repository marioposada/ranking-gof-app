import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from '@chakra-ui/react';

function Rows({
  thisweek,
  movement,
  name,
  average,
  tpoint,
  eplayed,
  plost,
  pgained,
}) {
  return (
    <Tr>
      <Td border='1px' borderColor='rgb(71, 71, 70)'>{thisweek}</Td>
      <Td border='1px' borderColor='rgb(71, 71, 70)'>{movement}</Td>
      <Td border='1px' borderColor='rgb(71, 71, 70)'>{name}</Td>
      <Td border='1px' borderColor='rgb(71, 71, 70)'>{average}</Td>
      <Td border='1px' borderColor='rgb(71, 71, 70)'>{tpoint}</Td>
      <Td border='1px' borderColor='rgb(71, 71, 70)'>{eplayed}</Td>
      <Td border='1px' borderColor='rgb(71, 71, 70)'>{plost}</Td>
      <Td border='1px' borderColor='rgb(71, 71, 70)'>{pgained}</Td>
    </Tr>
  );
}

export default function TableRanking() {
  const [golfers, setGolfers] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '64c0c06570msh5bacf74f8550397p197673jsnfde9e181298c',
        'X-RapidAPI-Host': 'golf-leaderboard-data.p.rapidapi.com',
      },
    };

    const getGolfers = async (url, options) => {
      let res = await fetch(url, options),
        json = await res.json();

      json.results.rankings.forEach(el => {
        let golfer = {
          thisweek: el.position,
          movement: el.movement,
          name: el.player_name,
          eplayed: el.num_events,
          average: el.avg_points,
          tpoint: el.total_points,
          plost: el.points_lost,
          pgained: el.points_gained,
        };

        setGolfers(golfers => [...golfers, golfer]);
      });
    };

    getGolfers(
      'https://golf-leaderboard-data.p.rapidapi.com/world-rankings',
      options
    );

    // return () => {};
  }, []);

  return (
    <Box maxW={''}
    display="flex"
    alignSelf={"center"}
    
    >
      <TableContainer>
        <Table
          variant="sstriped"
          colorScheme="teal"
          // maxWidth={'70vw'}
          alignContent={'center'}
          size="sm"
          bg=" rgba(0,0,0,0.8)"
          color={'white'}
          w={[300, 400, 500]}
         
        >
          <Thead>
            <Tr>
              <Th bg="black" h={"40px"} border='1px' borderColor='rgb(71, 71, 70)'>This Week</Th>
              <Th bg="black" border='1px' borderColor='rgb(71, 71, 70)'>movement</Th>
              <Th bg="black" border='1px' borderColor='rgb(71, 71, 70)'>name</Th>
              <Th bg="black" border='1px' borderColor='rgb(71, 71, 70)'>Average point</Th>
              <Th bg="black" border='1px' borderColor='rgb(71, 71, 70)'>total point</Th>
              <Th bg="black" border='1px' borderColor='rgb(71, 71, 70)'>events played</Th>
              <Th bg="black" border='1px' borderColor='rgb(71, 71, 70)'>point lost</Th>
              <Th bg="black" border='1px' borderColor='rgb(71, 71, 70)'>point gained</Th>
            </Tr>
          </Thead>
          <Tbody>
            {golfers.map(el => (
              <Rows
                thisweek={el.thisweek}
                movement={el.movement}
                name={el.name}
                average={el.average}
                tpoint={el.tpoint}
                eplayed={el.eplayed}
                plost={el.plost}
                pgained={el.pgained}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
