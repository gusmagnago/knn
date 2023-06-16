import { Button } from '@material-tailwind/react';
import { IoClose } from 'react-icons/io5';
import { LuClipboardEdit } from 'react-icons/lu';
import { ActionButtonProps } from '../index.types';

const ActionButton = ({ isDelete, handleClick }: ActionButtonProps) => {
  return (
    <Button
      size='lg'
      onClick={() => handleClick()}
      className={`${isDelete ? 'bg-[#e91e63]' : 'bg-[#4dd0e1]'}`}
    >
      {isDelete ? <IoClose /> : <LuClipboardEdit />}
    </Button>
  );
};
export default ActionButton;
