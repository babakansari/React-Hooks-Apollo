import * as React from 'react';
import { AppBar, Container, Typography, Tabs, Tab, Toolbar } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { getRouteByPath, getPaths } from './MenuMap';
import { getAppContext } from '../context/AppContext';
import { useOktaAuth } from '@okta/okta-react';
import { useBasicAuth } from '../auth/BasicAuth';

const useStyles = makeStyles( t=>({
    toolbar: t.mixins.toolbar
  }));

const Header = () => {
    const appContext = getAppContext();
    const classes = useStyles();
    const menuIndex = appContext.State.menuIndex ? appContext.State.menuIndex : 0;
    const oktaAuth = useOktaAuth();
    const basicAuth = useBasicAuth();

    const isAuthenticated = basicAuth.authState.isAuthenticated || (oktaAuth.authState && oktaAuth.authState.isAuthenticated);
    const username = basicAuth.authState.isAuthenticated ? 
                        basicAuth.authState.username : 
                    (oktaAuth.authState && oktaAuth.authState.isAuthenticated ? 
                        oktaAuth.authState.idToken && oktaAuth.authState.idToken.claims.preferred_username : null);
    
    const handleChange = (event, value) => {
        appContext.Dispatch({
            type: 'NAVIGATE',
            payload: value
          });
    };

    React.useEffect( ()=>{
        const currentMenuItem = getRouteByPath(window.location.pathname);
        if( currentMenuItem && currentMenuItem.index !== menuIndex ){
            appContext.Dispatch({
                type: 'NAVIGATE',
                payload: currentMenuItem.index
              });
        }
    }, [menuIndex] );

    return ( 
        <div>
            <AppBar>
                <Container maxWidth="x3">
                    <Toolbar>
                        { 
                            isAuthenticated ?
                                <Typography variant='h6'> ( User - {username} ) </Typography>
                            :
                                <Typography variant='h6'> ( Not Authenticated ) </Typography> }
                        
                        <Tabs value={menuIndex} onChange={handleChange} textColor='inherit' indicatorColor='secondary' variant='scrollable'>
                            { Array.from( getPaths() ).map( (key) =>{
                                    const menu = getRouteByPath(key);
                                    return (
                                        <Tab key={menu.index} label={menu.label} LinkComponent={RouterLink} to={key}/>
                                    );
                                })
                            }
                        </Tabs>
                    </Toolbar>
                </Container>
            </AppBar>
            <div className={classes.toolbar}/>
        </div>
        
     );
}

export default Header;