'use client';

import React, { useEffect, useState } from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Typography, Stack } from '@mui/material';
import { useGetAutomationTypeDetailQuery, getStateColor } from '@/services/automation';

const StateTimeline: React.FC<{ type: string; currentState: string }> = ({ type, currentState }) => {
    const { data: automationTypeDetail, isLoading } = useGetAutomationTypeDetailQuery(type);
    const [timelineItems, setTimelineItems] = useState<any[]>([]);

    useEffect(() => {
        if (automationTypeDetail) {
            const items = automationTypeDetail.states.map((state) => ({
                state,
                timestamp: new Date().toLocaleString(),
            }));

            setTimelineItems(items);
        }
    }, [automationTypeDetail]);

    if (isLoading) {
        return <Typography>Načítání časové osy...</Typography>;
    }

    if (!automationTypeDetail) {
        return <Typography>Typ automatizace nebyl nalezen.</Typography>;
    }

    return (
        <Stack direction="column" style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: 0
        }} >
            <Typography variant="h5" gutterBottom>
                Stavový diagram
            </Typography>
            <Timeline position="left" >
                {timelineItems.map((item, index) => (
                    <TimelineItem key={index} sx={{ '::before': { content: 'none' } }}>
                        <TimelineSeparator>
                            <TimelineDot
                                style={{
                                    backgroundColor: item.state === currentState ? getStateColor(currentState) : 'transaparent',
                                }}
                                variant={item.state === currentState ? 'filled' : 'outlined'}
                            />
                            {index < timelineItems.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography variant="body2">{item.state}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Stack>
    );
};

export default StateTimeline;
