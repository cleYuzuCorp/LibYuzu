import THeader from "../components/templates/Header/t-header"
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, Chip, Container, FormControl, IconButton, InputAdornment, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Snackbar, Stack, Step, StepLabel, Stepper, TextField, ThemeProvider, Typography } from "@mui/material"
import MCustomModal from "../components/molecules/CustomModal/m-custom-modal"
import MFileUpload from "../components/molecules/FileUpload/m-file-upload"
import theme from "../theme/theme"
import AButton from "../components/atoms/Button/a-button"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons"
import Slide, { SlideProps } from '@mui/material/Slide'


const Molecules = () => {

    const [openModal, setOpenModal] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [transition, setTransition] = useState<React.ComponentType<TransitionProps> | undefined>(undefined)

    const [valueName, setValueName] = useState('')
    const [valueNames, setValueNames] = useState<string[]>([])
    const [valueCheckNames, setValueCheckNames] = useState<string[]>([])

    const [showPassword, setShowPassword] = useState(false)

    const [activeStep, setActiveStep] = useState(0)
    const [skipped, setSkipped] = useState(new Set<number>())

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleChange = (event: SelectChangeEvent) => {
        setValueName(event.target.value as string)
    }

    const handleChanges = (event: SelectChangeEvent<typeof valueNames>) => {
        const {
            target: { value }
        } = event
        setValueNames(
            typeof value === 'string' ? value.split(',') : value
        )
    }

    const handleChangeCheck = (event: SelectChangeEvent<typeof valueCheckNames>) => {
        const {
            target: { value },
        } = event
        setValueCheckNames(
            typeof value === 'string' ? value.split(',') : value,
        )
    }

    const isStepOptional = (step: number) => {
        return step === 1
    }

    const isStepSkipped = (step: number) => {
        return skipped.has(step)
    }

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped(newSkipped)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.")
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values())
            newSkipped.add(activeStep)
            return newSkipped
        })
    }

    const handleReset = () => {
        setActiveStep(0)
    }

    type TransitionProps = Omit<SlideProps, 'direction'>

    function TransitionLeft(props: TransitionProps) {
        return <Slide {...props} direction="left" />
    }

    function TransitionUp(props: TransitionProps) {
        return <Slide {...props} direction="up" />
    }

    function TransitionRight(props: TransitionProps) {
        return <Slide {...props} direction="right" />
    }

    function TransitionDown(props: TransitionProps) {
        return <Slide {...props} direction="down" />
    }

    const handleOpen = (Transition: React.ComponentType<TransitionProps>) => () => {
        setTransition(() => Transition)
        setOpenSnackbar(true)
    }

    const handleClose = () => {
        setOpenSnackbar(false)
    }

    const names = [
        'Cameron',
        'Nicolas',
        'Marin',
        'Benoit'
    ]

    const steps = [
        'Introduction',
        'Développement',
        'Conclusion'
    ]

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xl">
                <THeader />
                <Stack spacing={12} alignItems="center" marginTop="150px" marginBottom="150px">
                    <MFileUpload />

                    <Stack spacing={8} direction="row" alignItems="center">
                        <FormControl variant="standard" fullWidth sx={{ minWidth: '240px' }}>
                            <InputLabel>Noms</InputLabel>
                            <Select label="Noms" value={valueName} onChange={handleChange}>
                                {names.map((name) => <MenuItem value={name}>
                                    {name}
                                </MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl variant="filled" fullWidth sx={{ minWidth: '240px' }}>
                            <InputLabel>Noms</InputLabel>
                            <Select
                                label="Noms"
                                multiple
                                value={valueNames}
                                onChange={handleChanges}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}>
                                {names.map((name) => <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" fullWidth sx={{ minWidth: '240px' }}>
                            <InputLabel>Noms</InputLabel>
                            <Select label="Noms" multiple value={valueCheckNames} onChange={handleChangeCheck} renderValue={(selected) => selected.join(', ')}>
                                {names.map((name) => <MenuItem key={name} value={name}>
                                    <Checkbox checked={valueCheckNames.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>)}
                            </Select>
                        </FormControl>
                    </Stack>

                    <Stack spacing={8} direction="row">
                        <TextField
                            variant="standard"
                            type="email"
                            label="Email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FontAwesomeIcon icon={faUser} style={{ color: theme.palette.text.primary }} />
                                    </InputAdornment>
                                )
                            }}
                        />

                        <TextField
                            variant="filled"
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ?
                                                <FontAwesomeIcon icon={faEyeSlash} style={{ color: theme.palette.text.primary }} />
                                                : <FontAwesomeIcon icon={faEye} style={{ color: theme.palette.text.primary }} />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <TextField
                            variant="outlined"
                            label="Description"
                            defaultValue="Ceci est une description"
                            focused
                            multiline
                            rows={4}
                        />
                    </Stack>

                    <Stack>
                        <Accordion>
                            <AccordionSummary expandIcon={<FontAwesomeIcon icon={faAngleDown} />}>
                                <Typography>Accordion 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<FontAwesomeIcon icon={faAngleDown} />}>
                                <Typography>Accordion 2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<FontAwesomeIcon icon={faAngleDown} />}>
                                <Typography>Accordion 3</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>

                    <Stack spacing={2}>
                        <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '700px' }}>
                            {steps.map((label, index) => {
                                const stepProps: { completed?: boolean } = {}
                                const labelProps: {
                                    optional?: React.ReactNode
                                } = {}
                                if (isStepOptional(index)) {
                                    labelProps.optional = (
                                        <Typography variant="caption">Optional</Typography>
                                    )
                                }
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                )
                            })}
                        </Stepper>

                        {activeStep === steps.length ? <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h4">
                                All steps completed
                            </Typography>

                            <AButton variant="text" color="colorful" onClick={handleReset}>
                                Reset
                            </AButton>
                        </Stack> : <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack spacing={2} direction="row" alignItems="center">
                                <Typography variant="h4">
                                    Step {activeStep + 1}
                                </Typography>

                                <AButton variant="text" color="colorful" onClick={handleBack}>
                                    Back
                                </AButton>
                            </Stack>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                {isStepOptional(activeStep) &&
                                    <AButton variant="text" color="colorful" onClick={handleSkip}>
                                        Skip
                                    </AButton>
                                }

                                <AButton variant="text" color="colorful" onClick={handleNext}>
                                    Next
                                </AButton>
                            </Stack>
                        </Stack>
                        }
                    </Stack>

                    <Stack spacing={8} direction="row" alignItems="center">
                        <AButton variant="contained" onClick={handleOpen(TransitionUp)}>Ouvrir la snackbar en haut</AButton>
                        <AButton variant="contained" onClick={handleOpen(TransitionLeft)}>Ouvrir la snackbar à gauche</AButton>
                        <AButton variant="contained" onClick={handleOpen(TransitionRight)}>Ouvrir la snackbar à droite</AButton>
                        <AButton variant="contained" onClick={handleOpen(TransitionDown)}>Ouvrir la snackbar en bas</AButton>

                        <Snackbar
                            open={openSnackbar}
                            onClose={handleClose}
                            TransitionComponent={transition}
                            message="Petit message d'alerte"
                            key={transition ? transition.name : ''}
                        />
                    </Stack>

                    <AButton variant="contained" onClick={() => setOpenModal(true)}>
                        Ouvrir la modal
                    </AButton>

                    <MCustomModal isOpen={openModal} onClose={() => setOpenModal(false)}>
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
                    </MCustomModal>
                </Stack>
            </Container>
        </ThemeProvider>
    )
}

export default Molecules