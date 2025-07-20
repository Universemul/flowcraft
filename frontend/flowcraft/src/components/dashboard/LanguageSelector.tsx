'use client';

import {useState, type MouseEvent, useRef} from 'react';
import { IconButton, Popover, List, ListItem, ListItemButton, ListItemText, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n';

const languages = [
  { code: 'en' as Language, name: 'english', flag: 'EN' },
  { code: 'fr' as Language, name: 'french', flag: 'FR' },
];

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLanguageSelect = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    handleClose();
  };

  return (
    <>
      <Tooltip title={t('changeLanguage')}>
        <IconButton ref={buttonRef} onClick={handleToggle} sx={{ color: 'text.primary' }}>
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      
      <Popover
        open={open}
        anchorEl={buttonRef.current}
        onClose={handleClose}
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
          {languages.map((lang) => (
            <ListItem key={lang.code} disablePadding>
              <ListItemButton
                selected={language === lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                sx={{ gap: 1 }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'primary.main' }}>{lang.flag}</span>
                <ListItemText primary={t(lang.name as any)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}