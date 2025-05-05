import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";
import { useAccount } from "../../lib/hooks/useAccount";

function App() {
  const location = useLocation();
  //el carrego així no m'apareix el loading inicial quan entro per primer cop
  const { currentUser } = useAccount();

  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <ScrollRestoration />
      <CssBaseline />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container sx={{ pt: 14, maxWidth: '90%' }} maxWidth={false}>
            {currentUser ? <Outlet /> : <Outlet />}
          </Container>
        </>
      )}
    </Box>
  )
}

export default App
