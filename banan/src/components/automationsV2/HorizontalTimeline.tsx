import React from 'react';
import { Box, Typography } from '@mui/material';
import { getStateColor } from '@/services/automation';

const HorizontalTimeline = ({ items, state }) => {
  const lineColor = '#424242';
  const minWidth = items.length * 220; // muze být podle nejdelšího slova
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Rovnoměrné rozložení bodů
        padding: 2,
        height: 120, // Zajišťuje místo pro texty a ukazatele
        //width: minWidth,
      }}
    >
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1, // Automatické rozložení prostoru mezi body
          }}
        >
          {/* Spojovací čárka (první bod – jen doprava) */}
          {index === 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%', // Začíná přesně uprostřed bodu
                height: 2,
                width: '50%', // Pokrývá pouze polovinu prostoru doprava
                backgroundColor: lineColor,
                transform: 'translateX(0)', // Pokračuje doprava
              }}
            />
          )}

          {/* Spojovací čárka (poslední bod – jen zleva) */}
          {index === items.length - 1 && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: 0, // Začíná vlevo
                height: 2,
                width: '50%', // Pokrývá pouze polovinu prostoru zleva
                backgroundColor: lineColor,
                transform: 'translateX(0)', // Zarovnána na bod
              }}
            />
          )}

          {/* Spojovací čárka (střední body – obě strany) */}
          {index > 0 && index < items.length - 1 && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: 0, // Začíná vlevo
                height: 2,
                width: '100%', // Spojuje obě strany
                backgroundColor: lineColor,
                transform: 'translateX(0)', // Spojuje rovně
              }}
            />
          )}

          {/* Bod na časové ose */}
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: lineColor,
              zIndex: 1,
            }}
          />

          {/* Krátká čárka střídavě nad nebo pod bodem */}
          <Box
            sx={{
              position: 'absolute',
              top: index % 2 === 0 ? -10 : '100%', // Nad bodem pro liché, pod bodem pro sudé
              left: '50%',
              width: 2,
              height: 10,
              backgroundColor: lineColor,
              transform: 'translateX(-50%)',
            }}
          />

          {/* Kolečko na konci krátké čárky */}
          <Box
            sx={{
              position: 'absolute',
              top: index % 2 === 0 ? -37 : 17, // Umístění nad nebo pod koncem krátké čárky
              left: '50%',
              width: 24,
              height: 24,
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              border: `2px solid ${
                items[index] === state ? getStateColor(state) : '#424242'
              }`,
              backgroundColor:
                items[index] === state ? getStateColor(state) : 'transparent',
            }}
          />

          {/* Text (střídavě nad nebo pod tečkou) */}
          <Typography
            sx={{
              position: 'absolute',
              top: index % 2 === 0 ? -60 : 47, // Nad osou (pro liché) nebo pod osou (pro sudé)
              whiteSpace: 'nowrap', // Zabrání zalomení textu
              transform: 'translateX(-50%)', // Zarovná text na střed tečky
              left: '50%',
            }}
          >
            {item}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default HorizontalTimeline;
