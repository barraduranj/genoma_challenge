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
import RestaurantDialog from './RestaurantDialog';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import countriesData from '../data/countries.json';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#f175a5' }, // Rosado Genomawork, lo saqué del source code de la página :P
    },
  },
  esES,
);

const paginationModel = { page: 0, pageSize: 10 };

// Lista de países para el filtro (lista completa, aunque también se podría traer desde la base)
const filterCountries = ["Todos", ...countriesData.map(c => c.name).sort((a, b) => a.localeCompare(b))];

export default function RestaurantTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("Todos");

  // Estados para el Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const fetchRestaurants = useCallback(() => {
    setLoading(true);

    // Construir la URL con el filtro si aplica
    let url = '/api/restaurants/';
    if (selectedCountry !== "Todos") {
      url += `?country=${encodeURIComponent(selectedCountry)}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setRows(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching restaurants:", err);
        setLoading(false);
      });
  }, [selectedCountry]);

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

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este lugar?")) return;

    try {
      const response = await fetch(`/api/restaurants/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      }
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const handleSave = async (formData) => {
    const isEdit = !!formData.id;
    const url = isEdit ? `/api/restaurants/${formData.id}` : '/api/restaurants/';
    const method = isEdit ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setDialogOpen(false);
        fetchRestaurants();
      }
    } catch (error) {
      console.error("Error saving restaurant:", error);
    }
  };

  const columns = useMemo(() => [
    { field: 'name', headerName: 'Nombre', flex: 1.5, minWidth: 150 },
    {
      field: 'location',
      headerName: 'Ubicación',
      flex: 1.5,
      minWidth: 150,
      valueGetter: (value, row) => `${row.city || ''}, ${row.country || ''}`
    },
    { field: 'food_type', headerName: 'Tipo de comida', flex: 1, minWidth: 120 },
    {
      field: 'rating',
      headerName: 'Calificación',
      width: 160,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Rating
            value={params.value || 0}
            precision={0.5}
            disabled={!params.row.visited}
            size="small"
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
      width: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Checkbox
            checked={!!params.value}
            size="small"
            onChange={(event) => {
              const isChecked = event.target.checked;
              const update = { visited: isChecked };
              if (!isChecked) update.rating = null;
              handleUpdate(params.id, update);
            }}
          />
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 110,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: '100%' }}>
          <Tooltip title="Editar">
            <IconButton
              className="edit-icon"
              size="small"
              sx={{ color: 'action.disabled', transition: 'color 0.2s' }}
              onClick={() => {
                setSelectedRestaurant(params.row);
                setDialogOpen(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton
              className="delete-icon"
              size="small"
              sx={{ color: 'action.disabled', transition: 'color 0.2s' }}
              onClick={() => handleDelete(params.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ], []);


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="country-filter-label">Filtrar por País</InputLabel>
          <Select
            labelId="country-filter-label"
            value={selectedCountry}
            label="Filtrar por País"
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {filterCountries.map(country => (
              <MenuItem key={country} value={country}>{country}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedRestaurant(null);
            setDialogOpen(true);
          }}
          sx={{
            bgcolor: '#f175a5',
            '&:hover': { bgcolor: '#d15d8a' },
            borderRadius: 2,
            px: 3,
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          Nuevo Restaurante
        </Button>
      </Box>


      <Box sx={{ height: 600, width: '100%' }}>
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            sx={{
              border: 0,
              '& .MuiDataGrid-columnHeaders': {
                bgcolor: '#fafafa',
                fontWeight: 'bold'
              },
              '& .MuiDataGrid-row:hover .edit-icon': {
                color: '#ffb300',
              },
              '& .MuiDataGrid-row:hover .delete-icon': {
                color: '#f44336',
              },
            }}
          />

          <RestaurantDialog
            open={dialogOpen}
            onClose={() => {
              setDialogOpen(false);
              setSelectedRestaurant(null);
            }}
            onSave={handleSave}
            initialData={selectedRestaurant}
          />
        </ThemeProvider>
      </Box>
    </Box>
  );
}




