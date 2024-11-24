'use client';

import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { TableSearchField } from '@/components/buildingBlocks/dataGrid/components/TableSearchField';
import { StyledResponsiveDataGrid } from '@/components/buildingBlocks/dataGrid/StyledResponsiveDataGrid';
import { useSelector } from 'react-redux';
import { useGetSASListQuery } from '@/services/sas';
import { fetchFavorites } from '@/functions/fetch/fetchFavorites';
import { FavoriteCell } from '@/components/tables/SasTable/components/FavouriteCell';
import { RootState } from '@/store';
import { columns } from '@/components/tables/SasTable/constants';
import useMediaQuery from '@mui/material/useMediaQuery';

const SasTable = () => {
  const user = useSelector((state: RootState) => state.app.auth.user);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const {
    data: sasList = [],
    isLoading: isSasListLoading,
    error: sasListError,
  } = useGetSASListQuery({
    search: searchValue,
    limit: 100,
  });

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchFavorites(user.id)
        .then(setFavorites)
        .catch((error) => console.error('Failed to load favorites:', error))
        .finally(() => setLoading(false));
    }
    setLoading(false); // TODO: if user is not logged in loading runs indefinitely
  }, [user]);

  const rows = sasList
    .map((sas, id) => ({
      id,
      name: sas,
      favorite: favorites.some((favorite) => favorite.sas_name === sas),
    }))
    .sort((a, b) => (a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1));

  if (isSasListLoading || loading) return 'loading';
  if (sasListError) return 'error';

  return (
    <Stack spacing={2} padding={2}>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        justifyContent="flex-end"
      >
        <Typography fontSize={30} fontWeight="bold" pr={2}>
          Sas Table
        </Typography>
        <TableSearchField
          value={searchValue}
          setValue={setSearchValue}
          flex={2}
        />
      </Stack>
      <StyledResponsiveDataGrid
        rows={rows}
        columns={columns.map((column) =>
          column.field === 'favorite'
            ? {
                ...column,
                renderCell: (params) => (
                  <FavoriteCell
                    isFavorite={params.row.favorite}
                    sasName={params.row.name}
                    onUpdate={() => {
                      setLoading(true);
                      fetchFavorites(user?.id)
                        .then(setFavorites)
                        .catch((error) =>
                          console.error('Failed to update favorites:', error),
                        )
                        .finally(() => setLoading(false));
                    }}
                  />
                ),
              }
            : column,
        )}
      />
    </Stack>
  );
};

export default SasTable;
