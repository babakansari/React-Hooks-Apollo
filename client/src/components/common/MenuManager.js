import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
import { getPathByIndex } from './MenuMap';

const useMenu = () => {
    const navigate = useNavigate();
    const appContext = useContext(AppContext);
    return {
      navigateTo: (menuIndex) => {
        navigate(getPathByIndex(menuIndex));
        appContext.Dispatch({
          type: 'NAVIGATE',
          payload: menuIndex
        });
      }
    };
  }

export default useMenu;