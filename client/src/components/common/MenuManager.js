import { useHistory } from 'react-router-dom';
import { getAppContext } from "../context/AppContext";
import { getPathByIndex, getPathByLabel, getRouteByPath } from './MenuMap';

const useMenu = () => {
    const navigate = useHistory();
    const appContext = getAppContext();
    return {
      navigateToIndex: (menuIndex) => {
        navigate.push(getPathByIndex(menuIndex));
        appContext.Dispatch({
          type: 'NAVIGATE',
          payload: menuIndex
        });
      },

      navigateToLabel: (label) => {
        const path = getPathByLabel(label);
        const route = getRouteByPath(path);

        navigate.push(path);
        appContext.Dispatch({
          type: 'NAVIGATE',
          payload: route.index
        });
      }
    };
  }

export default useMenu;