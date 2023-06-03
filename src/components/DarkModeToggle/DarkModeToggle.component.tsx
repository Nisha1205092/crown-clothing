import { DarkModeToggleContainer } from './DarkModeToggle.styles';
import Toggle from '../Toggle/Toggle.component';
import { FC } from 'react';

type DarkModeToggleProps = {
    toggle: () => void;
    setLight: () => void;
    setDark: () => void;
}
const DarkModeToggle: FC<DarkModeToggleProps> = ({ toggle, setLight, setDark }) => {
    return (
        <DarkModeToggleContainer>
            <button type="button" onClick={setLight}>
                ☀
            </button>
            <Toggle onChange={toggle} />
            <button type="button" onClick={setDark}>
                ☾
            </button>
        </DarkModeToggleContainer>
    );
};

export default DarkModeToggle;
