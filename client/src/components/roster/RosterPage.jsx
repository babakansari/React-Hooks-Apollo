import React from "react";
import { Typography } from "@mui/material";
import { rosteringQuery } from './RosteringQueries';
import { useQuery } from '@apollo/react-hooks';

function RostersPage () {
  const {data} = useQuery(rosteringQuery, {
    fetchPolicy: 'no-cache' 
  });

  if(!data){
    return (<div>
      <Typography variant="h2">No Rostering (Requires authentication)</Typography>
    </div>);
  }

  return  (
    <div>
      <Typography variant="h2">Rostering</Typography>
      <ul >
        {data.rostering.map(
          (crew) => {
            return (
              <li key={crew.id}>
                <div>
                  <Typography key={crew.id}>{crew.name}</Typography>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}

export default RostersPage;
