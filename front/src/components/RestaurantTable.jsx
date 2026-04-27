// El componente Table de MUI es simple, mientras que DataGrid trae filtrado y ordenamiento de base [https://mui.com/material-ui/react-table/].
// Por defecto, viene localizado en inglés, pero se puede modificar según la documentación:
// https://mui.com/x/react-data-grid/localization/?_gl=1*19l3q66*_up*MQ..*_ga*MTU0NjcwOTQwOS4xNzc3Mjk2NzQ0*_ga_5NXDQLC2ZK*czE3NzczMDg5NzMkbzMkZzAkdDE3NzczMDg5NzMkajYwJGwwJGgw#locale-text

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#f175a5' }, // Rosado Genomawork, lo saqué del source code de la página :P
    },
  },
  esES,
);

const columns = [
  { field: 'name', headerName: 'Nombre', width: 250 },
  { field: 'location', headerName: 'Ubicación', width: 250 },
  { field: 'foodType', headerName: 'Tipo de comida', width: 200 },
  {
    field: 'rating',
    headerName: 'Calificación',
    width: 150,
    renderCell: (params) => (
      <Rating
        value={params.value || 0}
        precision={0.5}
        readOnly
        disabled={!params.row.visited}
      />
    ),

  },
  {
    field: 'visited',
    headerName: 'Visitado',
    width: 150,
    renderCell: (params) => (
      <Checkbox checked={!!params.value} readOnly />
    ),
  },
];


const rows = [
  { id: 1, name: 'Cocó Café', location: 'San Miguel, Chile', foodType: 'Cafetería, Pastelería', rating: 5.0, visited: true },
  { id: 2, name: 'Coffee Culture Coffee Roasters', location: 'Maipú, Chile', foodType: 'Cafetería', rating: 4.0, visited: true },
  { id: 3, name: 'Vapiano', location: 'Las Condes, Chile', foodType: 'Italiana', rating: 4.5, visited: true },
  { id: 4, name: 'Boragó', location: 'Vitacura, Chile', foodType: 'Experimental, Gourmet', rating: null, visited: false },
  { id: 5, name: 'Alchemist', location: 'Copenhagen, Dinamarca', foodType: 'Gourmet', rating: null, visited: false },
];


const paginationModel = { page: 0, pageSize: 10 };

export default function RestaurantTable() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </ThemeProvider>
    </Box>
  );
}
