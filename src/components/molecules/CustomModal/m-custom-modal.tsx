import { Modal, Stack } from "@mui/material"
import { FC, ReactNode, useEffect, useState } from "react"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import theme from "../../../theme/theme"

interface MCustomModalProps {
    isOpen: boolean
    children: ReactNode
    onClose: () => void
}

const MCustomModal: FC<MCustomModalProps> = ({ isOpen, children, onClose }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    const handleClose = () => {
        setOpen(false)
        onClose()
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Stack
                maxWidth={{ xs: '240px', md: '740px' }}
                width="100%"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: 'none',
                    background: theme.palette.background.default,
                    padding: '20px',
                }}
            >
                <FontAwesomeIcon
                    icon={faXmark}
                    size="lg"
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        cursor: 'pointer',
                        color: theme.palette.text.primary
                    }}
                    onClick={handleClose}
                />
                {children}
            </Stack>
        </Modal>
    )
}

export default MCustomModal
