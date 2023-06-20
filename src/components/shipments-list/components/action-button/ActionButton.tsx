import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { IoClose } from 'react-icons/io5';
import { LuClipboardEdit } from 'react-icons/lu';
import { ActionButtonProps } from '../index.types';

const ActionButton = ({ isDelete, shipId, onDelete }: ActionButtonProps) => {
  const navigate = useNavigate();

  return (
    <>
      {isDelete ? (
        <Button
          size='lg'
          onClick={() => onDelete?.(shipId!)}
          className='bg-[#e91e63]'
        >
          <IoClose />
        </Button>
      ) : (
        <Button
          size='lg'
          onClick={() => navigate(`/${shipId!}`)}
          className='bg-[#4dd0e1]'
        >
          <LuClipboardEdit />
        </Button>
      )}
    </>
  );
};
export default ActionButton;
