import { DarkModeToggleContainer } from './DarkModeToggle.styles';
import Toggle from '../Toggle/Toggle.component';

const DarkModeToggle = ({ toggle, setLight, setDark }) => {
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
