'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from '@mui/icons-material';
import { Project } from '@/types/project';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onToggleFavorite: (projectId: string) => void;
}

export function ProjectCard({ project, onEdit, onDelete, onToggleFavorite }: ProjectCardProps) {
  const { t } = useLanguage();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(project);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(project.id);
    handleMenuClose();
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(project.id);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
              {project.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {project.description}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={handleToggleFavorite}
              sx={{ color: project.isFavorite ? 'primary.main' : 'text.secondary' }}
            >
              {project.isFavorite ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip
            label={project.team.name}
            size="small"
            variant="outlined"
            sx={{
              backgroundColor: project.team.color ? `${project.team.color}20` : 'transparent',
              borderColor: project.team.color || 'primary.main',
              color: project.team.color || 'primary.main',
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {new Date(project.updatedAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('edit')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          <ListItemText>{t('delete')}</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
}