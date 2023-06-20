import { Fragment } from 'react';
import { Typography } from '@material-tailwind/react';

import { Shipments } from '../../../../utils/types';
import { ShipmentsTableRowProps } from '../index.types';

import ActionButton from '../action-button/ActionButton';

const ShipmentsTableRow = ({
  item,
  column,
  className,
  parent,
}: ShipmentsTableRowProps) => {
  const isThead = parent === 'thead';

  return (
    <tr className={`${parent} ${!isThead && 'border-b border-[#eeeeee]'}`}>
      {column?.map((columnItem, index) => {
        const Cell = isThead ? 'th' : 'td';
        const columnValue =
          item && item[`${columnItem.name}` as keyof Shipments];

        const isEdit = columnItem.name === 'edit';
        const isDelete = columnItem.name === 'delete';

        const renderCellChild = () => {
          if (isEdit) {
            return <ActionButton shipId={item?.trackingNo} />;
          }
          if (isDelete) {
            return <ActionButton isDelete shipId={item?.trackingNo} />;
          }
          return (
            <Typography
              className='capitalize font-normal text-[#78909c]'
              variant='small'
            >
              {columnValue}
            </Typography>
          );
        };

        return (
          <Fragment key={`${columnItem.name}-${index}-${columnValue}`}>
            {isThead ? (
              <Cell>
                <Typography
                  variant='small'
                  className='uppercase font-bold text-[#78909c]'
                >
                  {columnItem.heading}
                </Typography>
              </Cell>
            ) : (
              <Cell className='py-5 px-2 max-w-[250px]'>
                {renderCellChild()}
              </Cell>
            )}
          </Fragment>
        );
      })}
    </tr>
  );
};

export default ShipmentsTableRow;
