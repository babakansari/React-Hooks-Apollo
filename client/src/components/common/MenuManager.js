import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
import { getPathByIndex, getPathByLabel, getRouteByPath } from './MenuMap';

const useMenu = () => {
    const navigate = useNavigate();
    const appContext = useContext(AppContext);
    return {
      navigateToIndex: (menuIndex) => {
        navigate(getPathByIndex(menuIndex));
        appContext.Dispatch({
          type: 'NAVIGATE',
          payload: menuIndex
        });
      },

      navigateToLabel: (label) => {
        const path = getPathByLabel(label);
        const route = getRouteByPath(path);
        console.log(`path: ${path}, index: ${JSON.stringify(route)}`);
        navigate(path);
        appContext.Dispatch({
          type: 'NAVIGATE',
          payload: route.index
        });
      }
    };
  }

export default useMenu;