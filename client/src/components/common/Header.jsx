import * as React from 'react';
import { AppBar, Container, Typography, Tabs, Tab, Toolbar } from "@mui/material";
import { makeStyles } from "@material-ui/styles"
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles( t=>({
    toolbar: t.mixins.toolbar
  }));

const menuRouteMap = new Map([
    ['/', { index: 0, label: 'Home'}],
    ['/roster/RosterPage', { index: 1, label: 'Roster'}],
    ['/roster/CrewPage', { index: 2, label: 'Crew'}],
  ]);

const Header = () => {
    const classes = useStyles();
    const [menuItem, setMenuItem]= React.useState(0);
    
    const handleChange = (event, value) => {
        setMenuItem( value );
    };

    React.useEffect( ()=>{
        const currentMenuItem = menuRouteMap.get(window.location.pathname);
        if( currentMenuItem.index !== menuItem ){
            setMenuItem( currentMenuItem.index );
        }
    }, [menuItem] );

    return ( 
        <div>
            <AppBar>
                <Container maxWidth="x3">
                    <Toolbar>
                        <Typography variant='h6'> ( React Apollo App ) </Typography>
                        <Tabs value={menuItem} onChange={handleChange} textColor='inherit' indicatorColor='secondary' variant='scrollable'>
                            { Array.from( menuRouteMap.keys() ).map( (key) =>{
                                    const menu = menuRouteMap.get(key);
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
            <Typography>{menuItem}</Typography>
        </div>
        
     );
}

export default Header;