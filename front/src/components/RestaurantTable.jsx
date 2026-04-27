// El componente Table de MUI es simple, mientras que DataGrid trae filtrado y ordenamiento de base [https://mui.com/material-ui/react-table/].
// Por defecto, viene localizado en inglés, pero se puede modificar según la documentación:
// https://mui.com/x/react-data-grid/localization/?_gl=1*19l3q66*_up*MQ..*_ga*MTU0NjcwOTQwOS4xNzc3Mjk2NzQ0*_ga_5NXDQLC2ZK*czE3NzczMDg5NzMkbzMkZzAkdDE3NzczMDg5NzMkajYwJGwwJGgw#locale-text

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';


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
  { 
    field: 'location', 
    headerName: 'Ubicación', 
    width: 250,
    valueGetter: (value, row) => `${row.city || ''}, ${row.country || ''}`
  },
  { field: 'food_type', headerName: 'Tipo de comida', width: 200 },

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


const paginationModel = { page: 0, pageSize: 10 };

export default function RestaurantTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/restaurants/')
      .then(res => res.json())
      .then(data => {
        setRows(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching restaurants:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          sx={{ border: 0 }}
        />
      </ThemeProvider>
    </Box>
  );
}
