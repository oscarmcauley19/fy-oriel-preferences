import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { LowPriority, PlayCircle } from '@mui/icons-material';
import { Link } from "react-router-dom";
import styles from '../styles/Layout.module.css'; // Import css modules stylesheet as styles

const drawerWidth = 240;

export default function Layout(props: { children: React.ReactNode }) {
    const { children } = props;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Oriel Preference Selection
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <Link to="/run" className={styles.menuBarLink}>
                            <ListItem key="run" disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PlayCircle />
                                    </ListItemIcon>
                                    <ListItemText primary="Run Simulations" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to="/rankings" className={styles.menuBarLink}>
                            <ListItem key="rankings" disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LowPriority />
                                    </ListItemIcon>
                                    <ListItemText primary="Rankings" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {
                    children
                }
            </Box>
        </Box>
    )
}