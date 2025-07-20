import {useLanguage} from "@/contexts/LanguageContext";
import {Project, Team} from "@/types/project";

export const getMockTeams = (t: any): Team[] => [
  { id: '1', name: t('frontend'), color: '#3b82f6' },
  { id: '2', name: t('backend'), color: '#10b981' },
  { id: '3', name: t('design'), color: '#f59e0b' },
  { id: '4', name: t('devops'), color: '#ef4444' },
];

export const getMockProjects = (): Project[] => {
    const { t } = useLanguage();
	const teams = getMockTeams(t);
	return (
		[
		{
			id: '1',
			name: 'Site E-commerce',
			description: 'Plateforme de vente en ligne avec paiement intégré',
			team: teams[0],
			isFavorite: true,
			createdAt: new Date('2024-01-15'),
			updatedAt: new Date('2024-02-10'),
		},
		{
			id: '2',
			name: 'API Analytics',
			description: 'Service de collecte et analyse de données utilisateur',
			team: teams[1],
			isFavorite: false,
			createdAt: new Date('2024-01-20'),
			updatedAt: new Date('2024-02-08'),
		},
		{
			id: '3',
			name: 'Design System',
			description: 'Bibliothèque de composants réutilisables',
			team: teams[2],
			isFavorite: true,
			createdAt: new Date('2024-02-01'),
			updatedAt: new Date('2024-02-12'),
		},
		{
			id: '4',
			name: 'CI/CD Pipeline',
			description: 'Automatisation des déploiements',
			team: teams[3],
			isFavorite: false,
			createdAt: new Date('2024-01-10'),
			updatedAt: new Date('2024-02-05'),
		},
	]
	);
}