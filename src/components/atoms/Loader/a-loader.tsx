import { CircularProgress } from "@mui/material"
import { FC } from "react"
import theme from "../../../theme/theme"

interface ALoaderProps {
    size?: string
}

const ALoader: FC<ALoaderProps> = ({ size }) => {

    return (
        <CircularProgress size={size} sx={{ color: theme.palette.text.primary }} />
    )
}

export default ALoader
