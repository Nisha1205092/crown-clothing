import styled from 'styled-components';

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 40px;
  height: 10px;
  background: #555;
  position: relative;
  border-radius: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  vertical-align: 2px;
  outline: none;
`;

export const Label = styled.label<{ $theme?: string; }>`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  transition: all 0.3s ease;
  cursor: pointer;
  position: absolute;
  left: 2px;
  background: #fff;
  opacity: 0.9;
  background-color: #f6f6f6;
  translate: ${props => props.$theme === 'dark' ? "35px" : "unset"};
`;

export const ToggleControl = styled.span`
    position: relative;
    padding: 0 4px;
    display: flex;
    align-items: center;
`;