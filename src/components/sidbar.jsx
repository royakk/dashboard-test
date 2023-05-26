import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const handleListItemClick = (item) => {
    setSelectedItem(item);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { t, i18n } = useTranslation();
  const lists=[{lable:t('Dashboard'),href:"Dashboard"},
  {lable:t('Todos'),href:"Todos"},
  {lable:t('Weather'),href:"Weather"},
  {lable:t('Profile'),href:"Profile"}]
  const drawer = (
    <div>
      <Toolbar>
        <Typography variant='h6'>Developed by roya</Typography>
      </Toolbar>

      <Divider />
      <List>
        {lists.map((item, index) => (
          <ListItem
            key={item}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#f7f7f7',
                '& .MuiListItemText-primary': {
                  fontWeight: 'bold',
                },
              },
            }}
            selected={selectedItem === item.lable}
            disablePadding
          >
            <ListItemButton onClick={() => handleListItemClick(item.lable)}>
              <Link href={`/${item.href}`} passHref>
                <ListItemText primary={item.lable} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          ...(i18n.language === 'fa' && { mr:{ md: `${drawerWidth}px` } }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {t('Nadin')}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          anchor={i18n.language === 'fa' ? 'right' : 'left'}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
        anchor={i18n.language === 'fa' ? 'right' : 'left'}
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
