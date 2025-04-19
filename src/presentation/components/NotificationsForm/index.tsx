import React from 'react';
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
} from '@mui/material';

interface NotificationsFormProps {
  onSave: (settings: NotificationSettings) => Promise<void>;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  notificationFrequency: string;
  customMessage: string;
}

const NotificationsForm: React.FC<NotificationsFormProps> = ({ onSave }) => {
  const [notifications, setNotifications] = React.useState(true);

  const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications(event.target.checked);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Notificações
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={notifications}
            onChange={handleNotificationChange}
            color="primary"
          />
        }
        label="Ativar notificações"
      />
    </Box>
  );
};

export default NotificationsForm; 