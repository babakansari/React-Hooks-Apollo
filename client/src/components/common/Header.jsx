import * as React from 'react';
import { AppBar, Container, Typography, Tabs, Tab, Toolbar } from "@mui/material";
import { makeStyles } from "@material-ui/styles"
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles( t=>({
    toolbar: t.mixins.toolbar
  }));

const Header = () => {
    const classes = useStyles();
    const [menuItem, setMenuItem]= React.useState(0);

    const handleChange = (event, value) => {
        setMenuItem( value );
    };

    return ( 
        <div>
            <AppBar>
                <Container maxWidth="x3">
                    <Toolbar>
                        <Typography variant='h6'> ( React Apollo App ) </Typography>
                        <Tabs value={menuItem} onChange={handleChange} textColor='inherit' indicatorColor='secondary' variant='scrollable'>
                            <Tab label="Home" LinkComponent={RouterLink} to="/"/>
                            <Tab label="Roster" LinkComponent={RouterLink} to="roster/RosterPage"/>
                            <Tab label="Crew" LinkComponent={RouterLink} to="roster/CrewPage"/>
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