import * as React from 'react';
import { AppBar, Toolbar, Container,  Button } from "@mui/material";

const pages = ['Products', 'Pricing', 'Blog'];

const Header = () => {
    const [setAnchorElNav] = React.useState(null);

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    return ( 
        <AppBar>
            <Container maxWidth="x3">
                <Toolbar disableGutters>
                    
                       {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}

                </Toolbar>
            </Container>
        </AppBar>
     );
}

export default Header;