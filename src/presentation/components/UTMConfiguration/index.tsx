import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  IconButton,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
  SelectChangeEvent
} from '@mui/material';
import { ContentCopy, Add, Delete, Info, Edit, Preview } from '@mui/icons-material';

interface UTMConfig {
  id: string;
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
  baseUrl: string;
}

export const UTMConfiguration: React.FC = () => {
  const [utmConfigs, setUtmConfigs] = useState<UTMConfig[]>([]);
  const [editingConfig, setEditingConfig] = useState<UTMConfig | null>(null);
  const [formData, setFormData] = useState<Omit<UTMConfig, 'id'>>({
    source: '',
    medium: '',
    campaign: '',
    term: '',
    content: '',
    baseUrl: 'https://'
  });
  const [previewDialog, setPreviewDialog] = useState({
    open: false,
    url: ''
  });
  const [formErrors, setFormErrors] = useState({
    baseUrl: '',
    source: '',
    medium: '',
    campaign: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const defaultSources = ['facebook', 'google', 'instagram', 'tiktok', 'email', 'newsletter'];
  const defaultMediums = ['cpc', 'display', 'social', 'email', 'banner', 'referral'];

  const validateForm = () => {
    const errors = {
      baseUrl: '',
      source: '',
      medium: '',
      campaign: ''
    };

    if (!formData.baseUrl.startsWith('https://') && !formData.baseUrl.startsWith('http://')) {
      errors.baseUrl = 'URL deve começar com http:// ou https://';
    }

    if (formData.source.length < 3) {
      errors.source = 'Fonte deve ter pelo menos 3 caracteres';
    }

    if (formData.medium.length < 3) {
      errors.medium = 'Meio deve ter pelo menos 3 caracteres';
    }

    if (formData.campaign.length < 3) {
      errors.campaign = 'Nome da campanha deve ter pelo menos 3 caracteres';
    }

    setFormErrors(errors);
    return !Object.values(errors).some(error => error !== '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Por favor, corrija os erros no formulário',
        severity: 'error'
      });
      return;
    }

    if (editingConfig) {
      setUtmConfigs(prev =>
        prev.map(config =>
          config.id === editingConfig.id
            ? { ...formData, id: editingConfig.id }
            : config
        )
      );
      setEditingConfig(null);
    } else {
      setUtmConfigs(prev => [
        ...prev,
        { ...formData, id: Math.random().toString(36).substr(2, 9) }
      ]);
    }
    setFormData({
      source: '',
      medium: '',
      campaign: '',
      term: '',
      content: '',
      baseUrl: 'https://'
    });
  };

  const handleEdit = (config: UTMConfig) => {
    setEditingConfig(config);
    setFormData({
      source: config.source,
      medium: config.medium,
      campaign: config.campaign,
      term: config.term || '',
      content: config.content || '',
      baseUrl: config.baseUrl
    });
  };

  const handleDelete = (id: string) => {
    setUtmConfigs(prev => prev.filter(config => config.id !== id));
    setSnackbar({
      open: true,
      message: 'Configuração UTM removida com sucesso',
      severity: 'success'
    });
  };

  const generateUTMUrl = (config: UTMConfig) => {
    const params = new URLSearchParams();
    params.append('utm_source', config.source);
    params.append('utm_medium', config.medium);
    params.append('utm_campaign', config.campaign);
    if (config.term) params.append('utm_term', config.term);
    if (config.content) params.append('utm_content', config.content);
    return `${config.baseUrl}?${params.toString()}`;
  };

  const handlePreview = (config: UTMConfig) => {
    setPreviewDialog({
      open: true,
      url: generateUTMUrl(config)
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbar({
        open: true,
        message: 'URL copiada para a área de transferência!',
        severity: 'success'
      });
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Configuração de UTMs
        </Typography>
        <Typography color="text.secondary">
          Configure os parâmetros de UTM para rastrear suas campanhas com precisão
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box display="flex" gap={2} flexWrap="wrap" mb={4}>
          <TextField
            label="URL Base"
            name="baseUrl"
            value={formData.baseUrl}
            onChange={handleInputChange}
            required
            size="small"
            error={!!formErrors.baseUrl}
            helperText={formErrors.baseUrl}
            fullWidth
          />
          <FormControl size="small" fullWidth error={!!formErrors.source}>
            <InputLabel>Fonte (utm_source)</InputLabel>
            <Select
              name="source"
              value={formData.source}
              onChange={handleSelectChange}
              label="Fonte (utm_source)"
            >
              {defaultSources.map(source => (
                <MenuItem key={source} value={source}>
                  {source}
                </MenuItem>
              ))}
              <MenuItem value="other">Outro</MenuItem>
            </Select>
            {formErrors.source && <FormHelperText>{formErrors.source}</FormHelperText>}
          </FormControl>
          <FormControl size="small" fullWidth error={!!formErrors.medium}>
            <InputLabel>Meio (utm_medium)</InputLabel>
            <Select
              name="medium"
              value={formData.medium}
              onChange={handleSelectChange}
              label="Meio (utm_medium)"
            >
              {defaultMediums.map(medium => (
                <MenuItem key={medium} value={medium}>
                  {medium}
                </MenuItem>
              ))}
              <MenuItem value="other">Outro</MenuItem>
            </Select>
            {formErrors.medium && <FormHelperText>{formErrors.medium}</FormHelperText>}
          </FormControl>
          <TextField
            label="Campanha (utm_campaign)"
            name="campaign"
            value={formData.campaign}
            onChange={handleInputChange}
            required
            size="small"
            error={!!formErrors.campaign}
            helperText={formErrors.campaign}
            fullWidth
          />
          <TextField
            label="Termo (utm_term)"
            name="term"
            value={formData.term}
            onChange={handleInputChange}
            size="small"
            fullWidth
          />
          <TextField
            label="Conteúdo (utm_content)"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            size="small"
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color={editingConfig ? "success" : "primary"}
            fullWidth
          >
            {editingConfig ? 'Atualizar UTM' : 'Adicionar UTM'}
          </Button>
        </Box>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL Base</TableCell>
              <TableCell>Fonte</TableCell>
              <TableCell>Meio</TableCell>
              <TableCell>Campanha</TableCell>
              <TableCell>Termo</TableCell>
              <TableCell>Conteúdo</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {utmConfigs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="textSecondary">
                    Nenhuma configuração UTM adicionada
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              utmConfigs.map((config) => (
                <TableRow key={config.id}>
                  <TableCell>{config.baseUrl}</TableCell>
                  <TableCell>{config.source}</TableCell>
                  <TableCell>{config.medium}</TableCell>
                  <TableCell>{config.campaign}</TableCell>
                  <TableCell>{config.term}</TableCell>
                  <TableCell>{config.content}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Visualizar URL">
                      <IconButton
                        size="small"
                        onClick={() => handlePreview(config)}
                        color="info"
                      >
                        <Preview />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(config)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(config.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={previewDialog.open}
        onClose={() => setPreviewDialog(prev => ({ ...prev, open: false }))}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Preview da URL com UTM</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, wordBreak: 'break-all' }}>
            <Typography variant="body2">{previewDialog.url}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialog(prev => ({ ...prev, open: false }))} color="inherit">
            Fechar
          </Button>
          <Button onClick={() => copyToClipboard(previewDialog.url)} color="primary" variant="contained">
            Copiar URL
          </Button>
        </DialogActions>
      </Dialog>

      <Paper sx={{ p: 3, mt: 4, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Info />
          <Typography variant="h6">Dicas para UTMs</Typography>
        </Box>
        <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
          <li>Use utm_source para identificar a origem do tráfego (ex: facebook, google)</li>
          <li>Use utm_medium para o tipo de link (ex: cpc, banner, email)</li>
          <li>Use utm_campaign para o nome da sua campanha específica</li>
          <li>Use utm_term para palavras-chave em campanhas pagas</li>
          <li>Use utm_content para diferenciar versões do mesmo anúncio</li>
        </Typography>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}; 