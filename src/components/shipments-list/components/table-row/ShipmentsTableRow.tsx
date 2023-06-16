import { Typography } from '@material-tailwind/react';

import { Shipments } from '../../../../utils/types';
import ActionButton from '../action-button/ActionButton';
import { ShipmentsTableRowProps } from '../index.types';

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
          if (!isThead) {
            if (isEdit) {
              return <ActionButton handleClick={() => console.log('a')} />;
            }
            if (isDelete) {
              return (
                <ActionButton handleClick={() => console.log('a')} isDelete />
              );
            }
          }
          return (
            <Typography
              variant='small'
              className={
                isThead
                  ? ' uppercase font-bold text-[#78909c]'
                  : 'capitalize font-normal text-[#78909c]'
              }
            >
              {isThead ? columnItem.heading : columnValue}
            </Typography>
          );
        };

        return (
          <Cell
            key={`${columnItem.name}-${index}`}
            className={isThead ? `${className}` : 'py-5 px-2'}
          >
            {renderCellChild()}
          </Cell>
        );
      })}
    </tr>
  );
};

export default ShipmentsTableRow;
