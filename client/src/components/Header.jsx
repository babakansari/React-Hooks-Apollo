import * as React from 'react';
import { AppBar, Toolbar, Container,  Button, Typography } from "@mui/material";

const pages = ['Products', 'Pricing', 'Blog'];

const Header = () => {
    const [setAnchorElNav] = React.useState(null);

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    return ( 
        <AppBar color='secondary'>
            <Container maxWidth="x3">
                <Toolbar >
                    
                       {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Typography>
                                    {page}
                                </Typography>
                                
                            </Button>
                        ))}

                </Toolbar>
            </Container>
        </AppBar>
     );
}

export default Header;