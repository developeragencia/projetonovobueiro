import { Box, Typography, Container } from '@mui/material'

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Marketing Dashboard
        </Typography>
        <Typography variant="subtitle1">
          Plataforma de gestão e otimização de campanhas de marketing digital
        </Typography>
      </Box>
    </Container>
  )
} 