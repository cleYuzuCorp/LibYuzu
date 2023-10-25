import Typography from '@mui/material/Typography'
import { FC, ReactNode } from 'react'
import theme from '../../../theme/theme'

interface ATitleProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2'
  children: string | ReactNode
}

const ATitle: FC<ATitleProps> = ({ variant, children }) => {

  return (
    <Typography
      variant={variant}
      fontFamily={variant === "h1" ? "Duos Brush Pro, sans serif" : variant === "h2" ? "Duos Brush Pro, sans serif" : "BD Supper, sans serif"}
      color={variant === "h1" ? theme.palette.primary.main : variant === "h2" ? theme.palette.info.main : theme.palette.text.primary}
    >
      {children}
    </Typography>
  )
}

export default ATitle
