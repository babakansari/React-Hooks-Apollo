import React from "react";
import { Typography } from "@mui/material";
import { loadRostering } from "../../api/request"
import { useToken } from "../common/Auth";

function RostersPage () {
  const [rostering, setRostering] = React.useState([]);
  const [token] = useToken();
 
  React.useEffect( () => {
    async function fetchData(){
      const rostering = await loadRostering(token);
      setRostering(rostering);
    }
    fetchData();
  },[]);

  return  (
    <div>
      <Typography variant="h2">Rosters (Requires authentication)</Typography>
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
