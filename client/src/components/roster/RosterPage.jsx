import React from "react";
import { Typography } from "@mui/material";
import { rosteringQuery } from './RosteringQueries';
import { useQuery } from '@apollo/react-hooks';

function RostersPage () {
  const {loading, error, data} = useQuery(rosteringQuery, {
    fetchPolicy: 'no-cache' 
  });

  if(error){
    return (<div>
      <Typography variant="h2">Rostering (Authentication is required)</Typography>
    </div>);
  }

  if(loading){
    return (<div>
      <Typography variant="h2">Rostering (Loading...)</Typography>
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
