import { GridColDef } from '@mui/x-data-grid';
import { FavoriteCell } from '@/components/tables/SasTable/components/FavouriteCell';

export const columns: GridColDef[] = [
  {
    field: 'favorite',
    headerName: 'Favorite',
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      return (
        <FavoriteCell
          isFavorite={params.row.favorite}
          sasName={params.row.name}
        />
      );
    },
  },
  { field: 'name', headerName: 'Sas Name', flex: 1, filterable: false, sortable: false },
];
