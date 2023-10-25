import THeader from "../components/templates/Header/t-header"
import { Container, Stack, ThemeProvider, Typography } from "@mui/material"
import ATitle from "../components/atoms/Title/a-title"
import theme from "../theme/theme"

const Texts = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xl">
                <THeader />
                <Stack spacing={12} alignItems="center" marginTop="150px" marginBottom="150px">
                    <Stack spacing={8}>
                        <Stack spacing={2} sx={{ background: theme.palette.text.primary, padding: '80px' }}>
                            <Typography variant="h1">TITRE 1 NORMAL</Typography>
                            <ATitle variant="h1">TITRE 1 Bold</ATitle>
                        </Stack>
                        <Stack spacing={2}>
                            <ATitle variant="h2">Titre-style-2 Bold</ATitle>
                            <Stack spacing={8} direction="row">
                                <Typography variant="h2">TITRE-STYLE-2</Typography>
                                <Typography variant="h2">TITRE-STYLE-2 ITALIC</Typography>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack spacing={8} direction="row">
                        <Typography variant="h3">Titre-style-3</Typography>
                        <Typography variant="h3">Titre-style-3 souligné</Typography>
                        <Typography variant="h3">Titre-style-3 italic</Typography>
                    </Stack>

                    <Stack spacing={8} direction="row">
                        <Typography variant="h4">Titre-style-4</Typography>
                        <Typography variant="h4">Titre-style-4 souligné</Typography>
                    </Stack>

                    <Stack>
                        <Typography variant="body2">
                            Paragraphe de texte
                        </Typography>
                        <Typography variant="body1">
                            erolod te erobal tu tnudivni ropmet domrie ymunon maid des ,rtile gnicspidas rutetesnoc ,tema tis rolod muspi meroL <br />
                            .tema tis rolod muspi meroL tse sutcnas atamikat aes on ,nergrebug dsak atilc tetS .muber ae te serolod oud otsuj te masucca te soe orev tA .autpulov <br />
                            maid des ,tare mayuqila angam erolod te erobal tu tnudivni ropmet domrie ymunon maid des ,rtile gnicspidas rutetesnoc ,tema tis rolod muspi meroL <br />
                        </Typography>
                    </Stack>
                </Stack>
            </Container>
        </ThemeProvider>
    )
}

export default Texts