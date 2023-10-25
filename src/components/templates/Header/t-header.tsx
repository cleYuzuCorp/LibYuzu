import { AppBar, Avatar, Stack, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import { useState } from "react"
import ALogo from "../../atoms/Logo/a-logo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import AButton from "../../atoms/Button/a-button"
import theme from "../../../theme/theme"
import { useLocation, useNavigate } from "react-router-dom"

const THeader = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const pages = ['Texts', 'Atoms', 'Molecules', 'Organisms']
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

    const activeButton = pages.findIndex(page => location.pathname.includes(page.toLowerCase()))

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <AppBar position="fixed" sx={{ background: theme.palette.text.primary, padding: '0px 50px 0px 50px' }}>
            <Toolbar disableGutters>
                <Stack sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor: 'pointer' }}>
                    <ALogo variant="white" size="200px" onClick={() => navigate('/')} />
                </Stack>

                <Stack sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        onClick={handleOpenNavMenu}
                        sx={{ width: '50px', height: '50px', borderRadius: '50%', color: theme.palette.background.default }}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem onClick={() => { handleCloseNavMenu(); navigate(`/${page.toLowerCase()}`) }}>
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Stack>

                <Stack sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, cursor: 'pointer' }}>
                    <ALogo variant="white" size="200px" onClick={() => navigate('/')} />
                </Stack>

                <Stack direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page, index) => (
                        <AButton key={index} variant="text" isActive={activeButton === index} onClick={() => { handleCloseNavMenu(); navigate(`/${page.toLowerCase()}`) }}>
                            {page}
                        </AButton>
                    ))}
                </Stack>

                <Stack sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Cameron Leconte" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default THeader