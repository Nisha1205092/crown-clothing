import { Checkbox, Label, ToggleControl } from "./Toggle.styles";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/theme.context";

const Toggle = ({ onChange }) => {
    const { myTheme } = useContext(ThemeContext);

    return (
        <ToggleControl>
            <Checkbox
                id="checkboxId"
                onChange={onChange}
            />
            <Label $theme={myTheme} htmlFor="checkboxId" />
        </ToggleControl>
    );
};

export default Toggle;