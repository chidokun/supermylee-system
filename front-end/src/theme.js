import { red } from '@mui/material/colors';
import { createTheme, experimental_sx as sx } from '@mui/material/styles';


// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: [
      'SF Pro Display',
      'Roboto'
    ].join(','),
  },
  palette: {
    primary: {
      main: '#007aff',
    },
    secondary: {
      main: '#4cda64',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        root: sx({
          padding: 3,
          marginTop: "-16px",
          marginLeft: "-16px",
          justifyContent: "center"
        }),

      },
    }
  },
});

export default theme;
