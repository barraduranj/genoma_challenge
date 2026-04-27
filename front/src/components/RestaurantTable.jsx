// El componente Table de MUI es simple, mientras que DataGrid trae filtrado y ordenamiento de base [https://mui.com/material-ui/react-table/].
// Por defecto, viene localizado en inglés, pero se puede modificar según la documentación:
// https://mui.com/x/react-data-grid/localization/?_gl=1*19l3q66*_up*MQ..*_ga*MTU0NjcwOTQwOS4xNzc3Mjk2NzQ0*_ga_5NXDQLC2ZK*czE3NzczMDg5NzMkbzMkZzAkdDE3NzczMDg5NzMkajYwJGwwJGgw#locale-text

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect, useMemo, useCallback } from 'react';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#f175a5' }, // Rosado Genomawork, lo saqué del source code de la página :P
    },
  },
  esES,
);

const paginationModel = { page: 0, pageSize: 10 };

export default function RestaurantTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = useCallback(() => {
    setLoading(true);
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

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/restaurants/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const updatedRestaurant = await response.json();
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === id ? updatedRestaurant : row))
        );
      }
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  const columns = useMemo(() => [
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
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Rating
            value={params.value || 0}
            precision={0.5}
            disabled={!params.row.visited}
            onChange={(event, newValue) => {
              handleUpdate(params.id, { rating: newValue });
            }}
          />
        </Box>
      ),
    },
    {
      field: 'visited',
      headerName: 'Visitado',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Checkbox
            checked={!!params.value}
            onChange={(event) => {
              const isChecked = event.target.checked;
              // Si marcamos como no visitado, opcionalmente reseteamos el rating a null
              const update = { visited: isChecked };
              if (!isChecked) update.rating = null;
              handleUpdate(params.id, update);
            }}
          />
        </Box>
      ),
    },
  ], []);

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

