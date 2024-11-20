import CustomTable from '@/components/CustomTable';

export function JobsTable({ data }) {
  const columns = [
    { field: 'id', headerName: 'Id' },
    { field: 'state', headerName: 'State' },
    { field: 'organization', headerName: 'Organization' },
    { field: 'SAS', headerName: 'Sas' },
    { field: 'runner', headerName: 'Runner' },
    { field: 'timestamp', headerName: 'Timestamp' },
  ];

  return <CustomTable columns={columns} data={data} onRowClick={() => {}} />;
}
