'use client';

import {ReactNode} from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';

interface SidebarMenuItemProps {
  text: string;
  icon: ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

export function SidebarMenuItem({ text, icon, isSelected, onClick }: SidebarMenuItemProps) {
  const theme = useTheme();
  const gradientLight = 'linear-gradient(135deg, rgba(0, 130, 254, 0.2) 0%, rgba(162, 89, 255, 0.2) 100%)';
  const gradientDark = 'linear-gradient(135deg, rgba(0, 130, 254, 0.25) 0%, rgba(177, 140, 255, 0.25) 100%)';

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => {
          onClick();
        }}
        sx={{ 
          borderRadius: '0 24px 24px 0',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          ...(isSelected && {
            background: theme.palette.mode === 'dark' ? gradientDark : gradientLight,
            '&:hover': {
              background: theme.palette.mode === 'dark' ? gradientDark : gradientLight,
            }
          })
        }}
      >
        <ListItemIcon sx={{ 
          minWidth: 40,
          color: isSelected ? 'primary.main' : 'inherit'
        }}>
          {icon}
        </ListItemIcon>
        <ListItemText 
          primary={text} 
          sx={{ 
            '& .MuiListItemText-primary': {
              color: isSelected ? 'primary.main' : 'inherit',
              fontWeight: 400
            }
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}