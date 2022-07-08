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
      <Td>{thisweek}</Td>
      <Td>{movement}</Td>
      <Td>{name}</Td>
      <Td>{average}</Td>
      <Td>{tpoint}</Td>
      <Td>{eplayed}</Td>
      <Td>{plost}</Td>
      <Td>{pgained}</Td>
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

      json.results.rankings.forEach( el => {
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
    <Box maxW={''}>
      <TableContainer>
        <Table variant="sstriped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>This Week</Th>
              <Th>movement</Th>
              <Th>name</Th>
              <Th>Average point</Th>
              <Th>total point</Th>
              <Th>events played</Th>
              <Th>point lost</Th>
              <Th>point gained</Th>
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
