'use client';

import {useRef, useState} from 'react';
import { IconButton, Popover, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export function ThemeSelector() {
  const { mode, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleThemeSelect = (selectedMode: 'light' | 'dark') => {
    if (mode !== selectedMode) {
      toggleTheme();
    }
    handleClose();
  };

  return (
    <>
      <Tooltip title={t('changeTheme')}>
        <IconButton ref={buttonRef} onClick={handleToggle} sx={{ color: 'text.primary' }}>
          {mode === 'light' ? <WbSunnyOutlinedIcon /> : <NightsStayOutlinedIcon />}
        </IconButton>
      </Tooltip>
      
      <Popover
        open={open}
        anchorEl={buttonRef.current}
        onClose={handleClose}
        disablePortal
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List sx={{ py: 0, minWidth: 150 }}>
          <ListItem disablePadding>
            <ListItemButton
              selected={mode === 'light'}
              onClick={() => handleThemeSelect('light')}
            >
              <ListItemIcon>
                <WbSunnyOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={t('lightMode')} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={mode === 'dark'}
              onClick={() => handleThemeSelect('dark')}
            >
              <ListItemIcon>
                <NightsStayOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={t('darkMode')} />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </>
  );
}