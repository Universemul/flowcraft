'use client';

import {GITHUB_REPO_URL} from "@/const";
import {
    useState
} from 'react';
import { AppBar as MuiAppBar, Toolbar, IconButton, TextField, InputAdornment, Box, Badge, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import GitHubIcon from '@mui/icons-material/GitHub';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { ThemeSelector } from '@/components/dashboard/ThemeSelector';
import { LanguageSelector } from '@/components/dashboard/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

export function AppBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const { t } = useLanguage();

  const handleGitHubClick = () => {
    window.open(GITHUB_REPO_URL, '_blank');
  };

  return (
    <MuiAppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
      <Toolbar sx={{ gap: 2 }}>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              width: searchExpanded ? 300 : 40,
              transition: 'width 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
            }}
          >
            {searchExpanded ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => !searchTerm && setSearchExpanded(false)}
                autoFocus

                sx={{ 
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.default',
                    transition: 'all 0.3s ease-out',
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setSearchTerm('')}
                        sx={{ color: 'text.secondary' }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <Tooltip title={t('search')}>
                <IconButton 
                  onClick={() => setSearchExpanded(true)}
                  sx={{
                    color: 'text.primary',
                    transition: 'transform 0.2s ease-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          
          <Tooltip title={t('viewOnGithub')}>
            <IconButton onClick={handleGitHubClick} sx={{ color: 'text.primary' }}>
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          
          <LanguageSelector />
          
          <ThemeSelector />
          
          <Tooltip title={t('notifications')}>
            <IconButton sx={{ color: 'text.primary' }}>
              <Badge badgeContent={0} color="error">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}