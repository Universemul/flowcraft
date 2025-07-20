'use client';

import {getMockProjects, getMockTeams} from "@/mocks/mocks";
import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Divider,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { Project } from '@/types/project';
import { ProjectCard } from './ProjectCard';
import { ProjectDialog } from './ProjectDialog';
import { useLanguage } from '@/contexts/LanguageContext';


export function ProjectList() {
  const { t } = useLanguage();
  const mockTeams = getMockTeams(t);
  const [projects, setProjects] = useState<Project[]>(getMockProjects());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<any>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  const favoriteProjects = projects.filter(p => p.isFavorite);
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'all' || project.team.id === selectedTeam;
    return matchesSearch && matchesTeam;
  });

  const handleCreateProject = () => {
    setEditingProject(undefined);
    setDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setDialogOpen(true);
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm(t('deleteProjectConfirm'))) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
    }
  };

  const handleToggleFavorite = (projectId: string) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const handleSaveProject = (data: any) => {
    if (editingProject) {
      setProjects(prev => prev.map(p => 
        p.id === editingProject.id 
          ? { 
              ...p, 
              name: data.name, 
              description: data.description,
              team: mockTeams.find(t => t.id === data.teamId) || p.team,
              updatedAt: new Date()
            }
          : p
      ));
    } else {
      const newProject: Project = {
        id: Math.random().toString(36).substr(2, 9),
        name: data.name,
        description: data.description,
        team: mockTeams.find(t => t.id === data.teamId)!,
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setProjects(prev => [...prev, newProject]);
    }
    setDialogOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          {t('projects')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateProject}
          sx={{ px: 3 }}
        >
          {t('newProject')}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <TextField
          placeholder={t('searchProjects')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>{t('team')}</InputLabel>
          <Select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            label={t('team')}
          >
            <MenuItem value="all">{t('allTeams')}</MenuItem>
            {mockTeams.map((team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {favoriteProjects.length > 0 && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <StarIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {t('favorites')}
            </Typography>
          </Box>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {favoriteProjects.map((project) => (
              <Grid item xs={12} sm={6} lg={4} key={project.id}>
                <ProjectCard
                  project={project}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                  onToggleFavorite={handleToggleFavorite}
                />
              </Grid>
            ))}
          </Grid>
          
          <Divider sx={{ my: 4 }} />
        </>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {t('allProjects')} ({filteredProjects.length})
        </Typography>
        {selectedTeam !== 'all' && (
          <Chip
            label={`${t('team')}: ${mockTeams.find(t => t.id === selectedTeam)?.name}`}
            onDelete={() => setSelectedTeam('all')}
            color="primary"
            variant="outlined"
          />
        )}
      </Box>

      {filteredProjects.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          {t('noProjectsFound')}
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} lg={4} key={project.id}>
              <ProjectCard
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onToggleFavorite={handleToggleFavorite}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <ProjectDialog
        open={dialogOpen}
        project={editingProject!!}
        teams={mockTeams}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveProject}
      />
    </Box>
  );
}