import { useState } from 'react';
import Pagination from '../pagination/Pagination';
import ShipmentsTableRow from '../table-row/ShipmentsTableRow';

import { CardBody } from '@material-tailwind/react';
import { ShipmentsTableProps } from '../index.types';
import { Shipments } from '../../../../utils/types';

const ShipmentsTable = ({ column, data }: ShipmentsTableProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageSize: number = 10;

  const paginateData = (
    data: Shipments[],
    pageNumber: number,
    pageSize: number
  ) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return data.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = paginateData(data, currentPage, pageSize);

  return (
    <CardBody className='overflow-scroll p-0'>
      <table className='w-full min-w-max table-auto text-left'>
        <thead className='bg-[#f1f5f9]'>
          <ShipmentsTableRow
            className='bg-[#e3f2fd] p-4 transition-colors'
            column={column}
            parent='thead'
          />
        </thead>
        <tbody>
          {paginatedData?.map((item) => {
            return (
              <ShipmentsTableRow
                item={item}
                column={column}
                key={`${item.orderNo}-${item.trackingNo}`}
                parent='tbody'
              />
            );
          })}
        </tbody>
      </table>
      <Pagination
        active={currentPage}
        totalPages={Math.ceil(data.length) / pageSize}
        onChange={handlePageChange}
      />
    </CardBody>
  );
};

export default ShipmentsTable;
