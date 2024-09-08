import React from 'react';
import {HexColorInput, HexColorPicker} from 'react-colorful';

function ColourPicker() {
  return (
    <div>
      <HexColorPicker />
      <HexColorInput />
    </div>
  );
}

export default ColourPicker;
