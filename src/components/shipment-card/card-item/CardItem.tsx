import { Input, Typography } from '@material-tailwind/react';

interface CardItemProps {
  label: string;
  value: string;
  isEdit: boolean;
  name: string;
  onChange: (e: any) => void;
}

const CardItem = ({ label, value, isEdit, onChange }: CardItemProps) => {
  return (
    <div className='m-2'>
      {isEdit ? (
        <Input
          className='font-base'
          defaultValue={value}
          disabled={label !== 'customer' && label !== 'consignee'}
          label={label}
          onChange={onChange}
          name={value}
          variant='outlined'
        />
      ) : (
        <div>
          <div className='mb-2 '>
            <Typography className='border-spacing-1 font-bold text-[#607d8b]'>
              {label}
            </Typography>
          </div>
          <div className='border border-gray-300 rounded-md bg-[#eceff1] p-4'>
            {value}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardItem;
