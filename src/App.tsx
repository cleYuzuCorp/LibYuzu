import { ThemeProvider } from '@mui/material'
import theme from './theme/theme'
import AppRoutes from './AppRoutes'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
        <AppRoutes />
    </ThemeProvider>
  )
}

export default App