export interface Team {
  id: string;
  name: string;
  color?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  team: Team;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  teamId: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  teamId?: string;
  isFavorite?: boolean;
}