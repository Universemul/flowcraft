'use client';

import {useState} from "react";
import { Drawer, Box, Typography, List } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import FolderIcon from '@mui/icons-material/Folder';
import GroupsIcon from '@mui/icons-material/Groups';
import { SidebarMenuItem } from './SidebarMenuItem';
import { useLanguage } from '@/contexts/LanguageContext';

const SIDEBAR_WIDTH = 240;


const getMenuItems = (t: any) => [
  { key: 'projects', text: t('projects'), icon: <FolderIcon /> },
  { key: 'technologies', text: t('technologies'), icon: <CodeIcon /> },
  { key: 'teams', text: t('teams'), icon: <GroupsIcon /> },
];


interface SidebarProps {
  selectedItem?: string;
  onItemSelect?: (item: string) => void;
}

export function Sidebar({ selectedItem = 'projects', onItemSelect }: SidebarProps) {
  const { t } = useLanguage();
  const menuItems = getMenuItems(t);

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          bgcolor: 'background.default',
          position: 'relative',
          border: 'none',
        },
      }}
      open
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            component="img"
            src="/assets/logo.jpg"
            alt="Flowcraft Logo"
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              objectFit: 'cover',
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold'}}>
            Flowcraft
          </Typography>
        </Box>
      </Box>
      
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <SidebarMenuItem
            key={item.key}
            text={item.text}
            icon={item.icon}
            isSelected={selectedItem === item.key}
            onClick={() => {
                onItemSelect?.(item.key);
            }}
          />
        ))}
      </List>
    </Drawer>
  );
}