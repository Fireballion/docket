import React, {ChangeEventHandler, useCallback, useRef, useState} from 'react';
import {HexColorInput, HexColorPicker} from 'react-colorful';
import './picker.css';

import useClickOutside from '../utils/useClickOutside';

interface PopoverProps {
  color: string;
  onChange: (str: string) => void;
}

export const PopoverPicker: React.FC<PopoverProps> = props => {
  const {color, onChange} = props;
  const popover = useRef<HTMLDivElement | null>(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);
  var bigint = parseInt(color.substring(1, 6), 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  console.log(color);
  return (
    <div className="picker">
      <div
        className="swatch"
        style={{backgroundColor: color}}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div
          className="popover"
          ref={popover}
        >
          <section className="custom-layout example">
            <HexColorPicker
              color={color}
              onChange={onChange}
            />

            <div className="input-wrapper">
              <p>Hex</p>
              <HexColorInput
                className="hex-input"
                color={color}
                onChange={onChange}
              />
              <p>R</p>
              <input
                className="hex-input"
                type="number"
                step={1}
                value={(parseInt(color.substring(1, 7), 16) >> 16) & 255}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const workCol = color;
                  onChange(
                    workCol[0] +
                      Number(event.target.value).toString(16).padStart(2, '0') +
                      workCol.substring(3, 7),
                  );
                }}
                min={0}
                max={255}
              />
              <p>G</p>
              <input
                className="hex-input"
                type="number"
                step={1}
                value={(parseInt(color.substring(1, 7), 16) >> 8) & 255}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const workCol = color;
                  onChange(
                    workCol.substring(0, 3) +
                      Number(event.target.value).toString(16).padStart(2, '0') +
                      workCol.substring(5, 7),
                  );
                }}
                min={0}
                max={255}
              />
              <p>B</p>
              <input
                className="hex-input"
                type="number"
                step={1}
                value={parseInt(color.substring(1, 7), 16) & 255}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const workCol = color;
                  onChange(
                    workCol.substring(0, 5) +
                      Number(event.target.value).toString(16).padStart(2, '0'),
                  );
                }}
                min={0}
                max={255}
              />
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
