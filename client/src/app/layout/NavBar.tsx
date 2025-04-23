import { Add, Group } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Container, MenuItem, Typography, CircularProgress, ListItemIcon } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";
import { useAccount } from "../../lib/hooks/useAccount";
import UserMenu from "./UserMenu";

export default function NavBar() {
  const { uiStore } = useStore();
  const { currentUser } = useAccount();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{
        backgroundImage: 'linear-gradient(135deg, #182a73 0%,#218aae 69%, #20a7ac 89%)'
      }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem component={NavLink} to='/' sx={{ display: 'flex', gap: 2 }}>
                <Group fontSize="large" />
                <Typography sx={{ position: 'relative' }} variant="h4" fontWeight='bold'>Reactivities</Typography>
                <Observer>
                  {() => uiStore.isLoading ? (
                    <CircularProgress size={20} thickness={7}
                      sx={{ color: 'white', position: 'absolute', top: '30%', left: '105%' }}
                    />
                  ) : null}
                </Observer>
              </MenuItem>
            </Box>
            {currentUser ? (
              <>
                <Box sx={{ display: 'flex' }}>
                  <MenuItemLink to='/activities'>
                    Activitats
                  </MenuItemLink>
                  <MenuItemLink to='/rooms'>
                    Sales
                  </MenuItemLink>
                  <MenuItemLink to='/laundry'>
                    Rentadora
                  </MenuItemLink>
                  <MenuItemLink to='/createActivity'>
                    <ListItemIcon>
                        <Add sx={{color: "white"}} />
                    </ListItemIcon>
                    Crea activitat
                </MenuItemLink>
                </Box>
                <Box display='flex' alignItems='center'>
                  <UserMenu />
                </Box>
              </>
            ) : (
              <>
                <Box display='flex' alignItems='center'>
                  <MenuItemLink to='/login'>Inicia sessió</MenuItemLink>
                  <MenuItemLink to='/register'>Registra't</MenuItemLink>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}