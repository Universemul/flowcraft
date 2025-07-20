'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { Project, Team, CreateProjectRequest, UpdateProjectRequest } from '@/types/project';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectDialogProps {
  open: boolean;
  project?: Project;
  teams: Team[];
  onClose: () => void;
  onSave: (data: CreateProjectRequest | UpdateProjectRequest) => void;
}

export function ProjectDialog({ open, project, teams, onClose, onSave }: ProjectDialogProps) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [teamId, setTeamId] = useState('');

  const isEditMode = Boolean(project);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setTeamId(project.team.id);
    } else {
      setName('');
      setDescription('');
      setTeamId('');
    }
  }, [project]);

  const handleSave = () => {
    if (isEditMode) {
      onSave({
        name,
        description,
        teamId,
      } as UpdateProjectRequest);
    } else {
      onSave({
        name,
        description,
        teamId,
      } as CreateProjectRequest);
    }
  };

  const isValid = name.trim() && description.trim() && teamId;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEditMode ? t('editProject') : t('createNewProject')}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label={t('projectName')}
            placeholder={t('projectNamePlaceholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          
          <TextField
            label={t('projectDescription')}
            placeholder={t('projectDescriptionPlaceholder')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            required
          />

          <FormControl fullWidth required>
            <InputLabel>{t('projectTeam')}</InputLabel>
            <Select
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              label={t('projectTeam')}
            >
              {teams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('cancel')}</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!isValid}
        >
          {isEditMode ? t('edit') : t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}