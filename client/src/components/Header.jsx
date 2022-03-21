import * as React from 'react';
import { AppBar, Container, Typography, Tabs, Tab } from "@mui/material";
import { makeStyles } from "@material-ui/styles"


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
                    <Tabs value={menuItem} onChange={handleChange} textColor='white' indicatorColor='secondary'>
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                    </Tabs>
                </Container>
            </AppBar>
            <div className={classes.toolbar}/>
            <Typography>{menuItem}</Typography>
        </div>
        
        
     );
}

export default Header;