import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';

const Paginate = React.memo(({ setCurrentPage, count }) => {
  const { key, currentThemeColor } = useSelector((state) => state.changeTheme.theme);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        color="primary"
        sx={{
          '& .MuiPaginationItem-root': currentThemeColor,
        }}
        onChange={handleChange}
      />
    </Stack>
  );
});
export default Paginate;
