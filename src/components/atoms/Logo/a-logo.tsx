import { Stack } from "@mui/material"
import { FC } from "react"

interface ALogoProps {
    variant?: "white" | "colorful"
    size?: string
    onClick?: () => void
}

const ALogo: FC<ALogoProps> = ({ variant, size, onClick }) => {

    return (
        <Stack>
            {variant === "white" ?
                <img src="images/logo/Logo_Yuzu_Version_Blanche.png" width={size} alt="logo" onClick={onClick} />
                : <img src="images/logo/Logo_Yuzu_Version_Couleur.png" alt="logo" width={size} onClick={onClick} />
            }
        </Stack>
    )
}

export default ALogo