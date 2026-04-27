import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Rating,
  Box,
  Typography,
  Grid
} from '@mui/material';
import { useState, useEffect } from 'react';

import countriesData from '../data/countries.json';

const countries = countriesData.map(c => c.name).sort((a, b) => a.localeCompare(b));


export default function RestaurantDialog({ open, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    country: '',
    food_type: '',
    rating: null,
    visited: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        city: '',
        country: '',
        food_type: '',
        rating: null,
        visited: false
      });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData(prev => ({ ...prev, rating: newValue }));
  };

  const handleSubmit = () => {
    // Validación básica
    if (!formData.name || !formData.city || !formData.country || !formData.food_type) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 'bold', color: '#f175a5' }}>
        {initialData ? 'Editar Restaurante' : 'Nuevo Restaurante'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            name="name"
            label="Nombre del lugar"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            required
          />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="city"
                label="Ciudad"
                fullWidth
                value={formData.city}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>País</InputLabel>
                <Select
                  name="country"
                  value={formData.country}
                  label="País"
                  onChange={handleChange}
                >
                  {countries.map(c => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <TextField
            name="food_type"
            label="Tipo de comida"
            fullWidth
            value={formData.food_type}
            onChange={handleChange}
            variant="outlined"
            placeholder="Ej: Italiana, Sushi, Hamburguesas..."
            required
          />

          <Box sx={{ mt: 1, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="visited"
                  checked={formData.visited}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setFormData(prev => ({
                      ...prev,
                      visited: isChecked,
                      rating: isChecked ? prev.rating : null
                    }));
                  }}
                />
              }
              label="¿Ya lo visitaste?"
            />

            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color={formData.visited ? 'text.primary' : 'text.disabled'}>
                Calificación:
              </Typography>
              <Rating
                value={formData.rating || 0}
                onChange={handleRatingChange}
                disabled={!formData.visited}
                precision={0.5}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">Cancelar</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ bgcolor: '#f175a5', '&:hover': { bgcolor: '#d15d8a' } }}
        >
          {initialData ? 'Guardar Cambios' : 'Registrar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
