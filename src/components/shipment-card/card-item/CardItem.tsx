import { Input, Typography } from '@material-tailwind/react';

interface CardItemProps {
  label: string;
  value: string;
  isEdit: boolean;
}

const CardItem = ({ label, value, isEdit }: CardItemProps) => {
  return (
    <div className='m-2'>
      {isEdit ? (
        <Input
          variant='outlined'
          label={label}
          defaultValue={value}
          className='font-base'
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
