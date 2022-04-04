import { useCookies } from 'react-cookie';

export function useToken(){
    const [cookies, setCookie] = useCookies([]);
    return [cookies.token, setCookie]
  }