import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

interface FavoriteCellProps {
  isFavorite: boolean;
  sasName: string; // Název služby, kterou přidáváte do oblíbených
  onUpdate?: () => void; // Callback pro aktualizaci seznamu
}

export const FavoriteCell = ({
  isFavorite,
  sasName,
  onUpdate,
}: FavoriteCellProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.app.auth.user);

  if (!user) return 'Loading favorite items..';

  const handleFavoriteToggle = async (event) => {
    event.stopPropagation()
    setLoading(true);
    try {
      if (isFavorite) {
        await fetch('/api/user/favorites', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, sasName }),
        });
      } else {
        await fetch('/api/user/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sasName, userId: user.id }),
        });
      }
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error updating favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconButton onClick={handleFavoriteToggle} disabled={loading}>
        {isHovered ? (
          isFavorite ? (
            <StarBorderRoundedIcon />
          ) : (
            <StarRoundedIcon />
          )
        ) : isFavorite ? (
          <StarRoundedIcon />
        ) : (
          <StarBorderRoundedIcon />
        )}
      </IconButton>
    </div>
  );
};
