import React from "react";
import { Typography } from "@mui/material";
import { loadRostering } from "../../api/request"

function RostersPage () {
  const [rostering, setRostering] = React.useState([]);

  React.useEffect( () => {
    async function fetchData(){
      const rostering = await loadRostering();
      setRostering(rostering);
    }
    fetchData();
  },[]);

  return  (
    <div>
      <Typography variant="h2">Rosters</Typography>
      <ul >
        {rostering.map(
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
