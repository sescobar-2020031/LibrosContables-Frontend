import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AlignVerticalTopIcon from '@mui/icons-material/AlignVerticalTop';
import BalanceIcon from '@mui/icons-material/Balance';
import ViewListIcon from '@mui/icons-material/ViewList';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './style.scss'

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function SideNav() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const location = useLocation();
    const rutaActual = location.pathname.split('/')[2];

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar className={`navbarLoggued ${open ? 'transparentNavbar' : ''}`}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <h1 className={`logo-loggued ${open ? 'transparentNavbar' : ''}`}><i className={`fa-solid fa-book-open-reader iconHeader`}></i>Bookify</h1>
                <div className='boxUser'>
                    <h1 style={{color: "#000", fontSize: "20px"}}>Hola mundo</h1>
                </div>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader className='header-loggued'>
                    <h1 className='logo-loggued-open'><i className="fa-solid fa-book-open-reader iconHeader-open"></i>Bookify</h1>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Box className="links">
                    <List className={rutaActual == "home" ? "active" : ""}>
                        <ListItem className={rutaActual == "home" ? "link active" : "link"} disablePadding sx={{ display: 'block' }} component={Link} to="home">
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <AccountBalanceWalletIcon />
                                </ListItemIcon>
                                <ListItemText primary="Cuentas" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <List className={rutaActual == "libroDiario" ? "active" : ""}>
                        <ListItem className={rutaActual == "libroDiario" ? "link active" : "link"} disablePadding sx={{ display: 'block' }} component={Link} to="libroDiario">
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MenuBookIcon />
                                </ListItemIcon>
                                <ListItemText primary="Libro Diario" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <List className={rutaActual == "libroMayor" ? "active" : ""}>
                        <ListItem className={rutaActual == "libroMayor" ? "link active" : "link"} disablePadding sx={{ display: 'block' }} component={Link} to="libroMayor">
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <AlignVerticalTopIcon />
                                </ListItemIcon>
                                <ListItemText primary="Libro Mayor" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <List className={rutaActual == "balanceSaldos" ? "active" : ""}>
                        <ListItem className={rutaActual == "balanceSaldos" ? "link active" : "link"} disablePadding sx={{ display: 'block' }} component={Link} to="balanceSaldos">
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <BalanceIcon />
                                </ListItemIcon>
                                <ListItemText primary="Balance de saldos" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <List className={rutaActual == "estadoFinanciero" ? "active" : ""}>
                        <ListItem className={rutaActual == "estadoFinanciero" ? "link active" : "link"} disablePadding sx={{ display: 'block' }} component={Link} to="estadoFinanciero">
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ViewListIcon />
                                </ListItemIcon>
                                <ListItemText primary="Estado Financiero" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <List className={rutaActual == "balanceGeneral" ? "active" : ""}>
                        <ListItem className={rutaActual == "balanceGeneral" ? "link active" : "link"} disablePadding sx={{ display: 'block' }} component={Link} to="balanceGeneral">
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ClearAllIcon />
                                </ListItemIcon>
                                <ListItemText primary="Balance General" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <main>
                    <Outlet />
                </main>
            </Box>
        </Box>
    );
}