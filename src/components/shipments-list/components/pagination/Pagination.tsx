import { Button, Typography } from '@material-tailwind/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { PaginationProps } from '../index.types';

const Pagination = ({ active, totalPages, onChange }: PaginationProps) => {
  const next = () => {
    if (active === 10) return;
    onChange(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    onChange(active - 1);
  };

  return (
    <div className='flex items-center gap-4 p-4 w-full justify-between'>
      <Button
        size='sm'
        className='flex items-center gap-2 bg-[#bbdefb]'
        onClick={prev}
        disabled={active === 1}
      >
        <FaArrowLeft />
      </Button>
      <Typography color='gray' className='font-normal'>
        Page <span className='text-blue-gray-900'>{active}</span> of
        <span className='text-blue-gray-900'>{totalPages}</span>
      </Typography>
      <Button
        size='sm'
        className='bg-[#bbdefb]'
        onClick={next}
        disabled={active === 10}
      >
        <FaArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
