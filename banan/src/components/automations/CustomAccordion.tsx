import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { formatTimestamp } from '@/functions/date/formatTimestamp';
import StatusIcon from '@/components/automations/StatusIcon';
import { grayTypographyAttributes } from '@/constants';

const StyledAccordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))<{ isFirst: boolean; isLast: boolean }>(({ theme, isFirst, isLast }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: isFirst ? '16px 16px 0 0' : isLast ? '0 0 16px 16px' : 0,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
  margin: 0, // Odstranění vnějších mezer
}));

const StyledAccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    {...props}
    expandIcon={null} // Vlastní šipka bude přidána manuálně
  />
))(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row', // Zajištění šipky vlevo
  [`& .${accordionSummaryClasses.content}`]: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    marginLeft: 0, // Zrušení mezer na levé straně
  },
  padding: theme.spacing(0.5, 2), // Přizpůsobení odsazení
}));

const StyledAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  margin: 0, // Odstranění mezer
}));

type AutomationLog = {
  type: string;
  to_state: string;
  level: string;
  timestamp: string;
  description: string;
};

type CustomAccordionProps = {
  data: AutomationLog[];
};

const CustomAccordion: React.FC<CustomAccordionProps> = ({ data }) => {
  const [expandedPanels, setExpandedPanels] = useState<string[]>(
    data
      .map((_, index) =>
        data[index].level === 'ERROR' ? `panel${index}` : null,
      )
      .filter(Boolean) as string[],
  );

  const handleChange = (panel: string) => {
    setExpandedPanels(
      (prevExpanded) =>
        prevExpanded.includes(panel)
          ? prevExpanded.filter((p) => p !== panel) // Zavři, pokud je již otevřený
          : [...prevExpanded, panel], // Přidej, pokud není otevřený
    );
  };

  return (
    <div>
      {data.map((log, index) => (
        <StyledAccordion
          key={index}
          expanded={expandedPanels.includes(`panel${index}`)}
          onChange={() => handleChange(`panel${index}`)}
          isFirst={index === 0}
          isLast={index === data.length - 1}
        >
          <StyledAccordionSummary
            aria-controls={`panel${index}d-content`}
            id={`panel${index}d-header`}
          >
            {/* Šipka na začátku */}
            <ArrowForwardIosSharpIcon
              sx={{
                fontSize: '0.9rem',
                marginRight: '8px', // Mezera mezi šipkou a textem
                transform: expandedPanels.includes(`panel${index}`)
                  ? 'rotate(90deg)'
                  : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            />
            <Stack
              pl={1}
              justifyContent={'space-between'}
              alignItems={'center'}
              direction={'row'}
              flex={1}
            >
              <Stack spacing={1}>
                <Typography fontWeight="bold">{log.type}</Typography>
                <Typography
                  {...grayTypographyAttributes}
                >{`-> ${log.to_state}`}</Typography>
              </Stack>
              <StatusIcon status={log.level} />
            </Stack>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <Stack direction={'row'} spacing={1}>
              <Typography
                sx={{
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >{`${formatTimestamp(log.timestamp)}`}</Typography>
              <Typography
                sx={{
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >{`Description: ${log.description}`}</Typography>
            </Stack>
          </StyledAccordionDetails>
        </StyledAccordion>
      ))}
    </div>
  );
};

export default CustomAccordion;
