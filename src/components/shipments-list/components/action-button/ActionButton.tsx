import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { IoClose } from 'react-icons/io5';
import { LuClipboardEdit } from 'react-icons/lu';
import { ActionButtonProps } from '../index.types';

const ActionButton = ({ isDelete, shipId }: ActionButtonProps) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (isDelete) {
      console.log('dele');
    }
    return navigate(`/${shipId}`);
  };

  return (
    <Button
      size='lg'
      onClick={handleAction}
      className={`${isDelete ? 'bg-[#e91e63]' : 'bg-[#4dd0e1]'}`}
    >
      {isDelete ? <IoClose /> : <LuClipboardEdit />}
    </Button>
  );
};
export default ActionButton;
