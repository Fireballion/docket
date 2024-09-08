import {Button} from '@mui/material';
import React, {useState, Children, PropsWithChildren} from 'react';
import {PopoverPicker} from './popoverPicker';

interface PickerProps {
  title: string;
  children?: React.ReactNode;
  color: string;
  setColor: (str: string) => void;
}

const BookColorPicker: React.FC<PickerProps> = props => {
  // const [color, setColor] = useState('#ffffff');
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          marginLeft: '1vw',
        }}
      >
        <h4 style={{color: '#abb3bf'}}>{props.title}</h4>
        {props.children}

        <PopoverPicker
          color={props.color}
          onChange={props.setColor}
        />
      </div>
    </>
  );
};

export default BookColorPicker;
