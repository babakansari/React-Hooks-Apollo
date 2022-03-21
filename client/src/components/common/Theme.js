import { createTheme } from '@mui/material/styles';
import * as color from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: color.blue[600],
    },
    secondary: {
      main: color.lightGreen[50],
    }
  },
});

export default theme;