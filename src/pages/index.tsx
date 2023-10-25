import { Stack, Typography, ThemeProvider, Container } from "@mui/material"
import THeader from "../components/templates/Header/t-header"
import theme from "../theme/theme"

const Home = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xl">
                <THeader />
                <Stack alignItems="center" marginTop="150px" marginBottom="150px">
                    <Typography variant="h1" sx={{ color: theme.palette.text.primary }}>
                        Bienvenue sur la Librairie YuzuCorp !
                    </Typography>
                </Stack>
            </Container>
        </ThemeProvider>
    )
}

export default Home