import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Snackbar
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

interface UTMConfig {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  baseUrl: string;
}

interface UTMConfigurationProps {
  onSave: (config: UTMConfig) => void;
}

const UTMConfiguration: React.FC<UTMConfigurationProps> = ({ onSave }) => {
  const [utmSource, setUtmSource] = useState('');
  const [utmMedium, setUtmMedium] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [utmTerm, setUtmTerm] = useState('');
  const [utmContent, setUtmContent] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      baseUrl
    });
    setShowSnackbar(true);
  };

  const generateUtmUrl = () => {
    if (!baseUrl) return '';

    const params = new URLSearchParams();
    if (utmSource) params.append('utm_source', utmSource);
    if (utmMedium) params.append('utm_medium', utmMedium);
    if (utmCampaign) params.append('utm_campaign', utmCampaign);
    if (utmTerm) params.append('utm_term', utmTerm);
    if (utmContent) params.append('utm_content', utmContent);

    return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${params.toString()}`;
  };

  const handleCopyUrl = () => {
    const url = generateUtmUrl();
    if (url) {
      navigator.clipboard.writeText(url);
      setShowSnackbar(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Configuração de UTM
      </Typography>

      <TextField
        fullWidth
        label="URL Base"
        value={baseUrl}
        onChange={(e) => setBaseUrl(e.target.value)}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="UTM Source"
        value={utmSource}
        onChange={(e) => setUtmSource(e.target.value)}
        margin="normal"
        required
        helperText="Ex: facebook, google, newsletter"
      />

      <TextField
        fullWidth
        label="UTM Medium"
        value={utmMedium}
        onChange={(e) => setUtmMedium(e.target.value)}
        margin="normal"
        required
        helperText="Ex: cpc, banner, email"
      />

      <TextField
        fullWidth
        label="UTM Campaign"
        value={utmCampaign}
        onChange={(e) => setUtmCampaign(e.target.value)}
        margin="normal"
        required
        helperText="Ex: spring_sale, product_launch"
      />

      <TextField
        fullWidth
        label="UTM Term"
        value={utmTerm}
        onChange={(e) => setUtmTerm(e.target.value)}
        margin="normal"
        helperText="Ex: running_shoes, marketing_tips"
      />

      <TextField
        fullWidth
        label="UTM Content"
        value={utmContent}
        onChange={(e) => setUtmContent(e.target.value)}
        margin="normal"
        helperText="Ex: logolink, textlink"
      />

      {baseUrl && (
        <Paper sx={{ p: 2, mt: 3, bgcolor: 'grey.100' }}>
          <Typography variant="subtitle2" gutterBottom>
            URL Gerada:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {generateUtmUrl()}
            </Typography>
            <IconButton onClick={handleCopyUrl} size="small">
              <ContentCopy />
            </IconButton>
          </Box>
        </Paper>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Salvar Configuração
        </Button>
      </Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message="URL copiada para a área de transferência"
      />
    </Box>
  );
};

export default UTMConfiguration; 