import RestaurantTable from "./components/RestaurantTable";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 6, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#f175a5' }}>
          🥗 Bitácora de Sabores 🍽️
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
          ¡Bienvenida! Este espacio fue creado por tus genomines, para guardar esos lugares que valen la pena volver a visitar. Tu propio registro de los mejores restaurantes del 🌎.
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, mb: 6 }}>
        <RestaurantTable />
      </Box>

      <Box component="footer" sx={{ py: 4, mt: 'auto', borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary" align="center">
          Desarrollado con ❤️ por <strong>barraduranj</strong> para los <strong>genomines</strong>
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
