import { createTheme } from "@mui/material/styles";
export const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#a9c1fc', 
      },
      secondary: {
        main: '#f50057', 
      },
      
    },
  });
  
  export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#ff9800', 
      },
      secondary: {
        main: '#4caf50', 
      },
      
    },
  });
  
