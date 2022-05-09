import React from "react";
import { Typography } from "@mui/material";
import { rosteringQuery } from './RosteringQueries';
import { useQuery } from '@apollo/react-hooks';
import { AppContext } from "../context/AppContext";

function RostersPage () {
  const appContext = React.useContext(AppContext);

  if(!appContext.State.claims.username){
    return (<div>
      <Typography variant="h2">Requires Authentication...</Typography>
    </div>);
  }

  const {loading, error, data} = useQuery(rosteringQuery, {
    fetchPolicy: 'no-cache' 
  });

  if(error){
    return (<div>
      <Typography variant="h2">Rostering (Error loading page...)</Typography>
    </div>);
  }

  if(loading){
    return (<div>
      <Typography variant="h2">Rostering (Loading...)</Typography>
    </div>);
  }

  return  (
    <div>
      <div>
        <Typography variant="h2">Rostering</Typography>
      </div>
      <div>
        <Typography >bearer {sessionStorage.getItem('token')}</Typography>
      </div>
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
