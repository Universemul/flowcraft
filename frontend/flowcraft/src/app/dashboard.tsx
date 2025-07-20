'use client';

import * as React from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { AppBar } from '@/components/dashboard/AppBar';
import { ProjectList } from '@/components/projects/ProjectList';
import { useLanguage } from '@/contexts/LanguageContext';


export default function Dashboard() {
    const { t } = useLanguage();
    const [selectedView, setSelectedView] = useState('projects');

    const renderContent = () => {
        switch (selectedView) {
            case 'projects':
                return <ProjectList />;
            case 'technologies':
                return <Box sx={{ p: 4 }}>{t('technologies')} ({t('upcomingSoon')})</Box>;
            case 'teams':
                return <Box sx={{ p: 4 }}>{t('teams')} ({t('upcomingSoon')})</Box>;
            default:
                return <ProjectList />;
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Sidebar selectedItem={selectedView} onItemSelect={setSelectedView} />
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <AppBar />
                
                <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
                    {renderContent()}
                </Box>
            </Box>
        </Box>
    );
}