import THeader from "../components/templates/Header/t-header"
import { Checkbox, Container, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Rating, Slider, Stack, Switch, ThemeProvider, Typography } from "@mui/material"
import AButton from "../components/atoms/Button/a-button"
import ALoader from "../components/atoms/Loader/a-loader"
import ALogo from "../components/atoms/Logo/a-logo"
import theme from "../theme/theme"
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const Atoms = () => {

    const [valueSlider, setValueSlider] = useState([20, 50])

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValueSlider(newValue as number[])
    }

    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 20,
            label: '20',
        },
        {
            value: 37,
            label: '37',
        },
        {
            value: 100,
            label: '100',
        },
    ]

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xl">
                <THeader />
                <Stack spacing={12} alignItems="center" marginTop="150px" marginBottom="150px">
                    <Grid container spacing={8} alignItems="center" justifyContent="center">
                        <ALogo variant="white" size="82px" />
                        <ALogo variant="white" size="182px" />
                        <ALogo variant="colorful" size="82px" />
                        <ALogo variant="colorful" size="182px" />
                    </Grid>

                    <Stack spacing={8} direction="row" alignItems="center">
                        <ALoader size="27px" />
                        <ALoader size="42px" />
                        <ALoader size="64px" />
                    </Stack>

                    <Stack spacing={8} direction={{ xs: 'column', md: 'row' }}>
                        <AButton variant="contained">Contained</AButton>
                        <AButton variant="outlined">Outlined</AButton>
                        <AButton variant="text" color="colorful">Text</AButton>
                    </Stack>

                    <Stack spacing={8} direction="row">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox />
                                }
                                label={<Typography variant="body2">Label</Typography>}
                            />

                            <FormControlLabel
                                required
                                control={
                                    <Checkbox defaultChecked />
                                }
                                label={<Typography variant="body2">Required</Typography>}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<FontAwesomeIcon icon={faHeart} size="lg" />}
                                        checkedIcon={<FontAwesomeIcon icon={faHeartBroken} size="lg" />}
                                    />
                                }
                                label={<Typography variant="body2">Label</Typography>}
                            />
                        </FormGroup>

                        <RadioGroup defaultValue="female">
                            <FormControlLabel
                                value="female"
                                control={
                                    <Radio />
                                }
                                label={<Typography variant="body2">Femme</Typography>}
                            />

                            <FormControlLabel
                                value="male"
                                control={
                                    <Radio />
                                }
                                label={<Typography variant="body2">Homme</Typography>}
                            />

                            <FormControlLabel
                                value="other"
                                control={
                                    <Radio />
                                }
                                label={<Typography variant="body2">Autre</Typography>}
                            />
                        </RadioGroup>

                        <Stack spacing={3}>
                            <Rating defaultValue={2} precision={0.5} />
                            <Rating defaultValue={2} precision={0.5} icon={<FontAwesomeIcon icon={faHeart} />} emptyIcon={<FontAwesomeIcon icon={faHeart} />} />
                            <Rating defaultValue={2} precision={0.5} max={8} />
                        </Stack>

                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch />
                                }
                                label={<Typography variant="body2">Label</Typography>}
                            />

                            <FormControlLabel
                                control={
                                    <Switch defaultChecked />
                                }
                                label={<Typography variant="body2">Label</Typography>}
                            />

                            <FormControlLabel
                                required
                                control={
                                    <Switch />
                                }
                                label={<Typography variant="body2">Required</Typography>}
                            />
                        </FormGroup>

                        <Stack spacing={3} width="200px">
                            <Slider defaultValue={30} valueLabelDisplay="auto" />
                            <Slider defaultValue={20} marks={marks} step={null} valueLabelDisplay="auto" />
                            <Slider defaultValue={30} valueLabelDisplay="auto" value={valueSlider} onChange={handleChange} />
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </ThemeProvider>
    )
}

export default Atoms