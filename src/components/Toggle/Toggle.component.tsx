import { Checkbox, Label, ToggleControl } from "./Toggle.styles";
import { useContext, FC, ChangeEventHandler } from "react";
import { ThemeContext } from "../../contexts/theme.context";

type ToggleProps = {
    onChange: ChangeEventHandler<HTMLInputElement>;
}
const Toggle: FC<ToggleProps> = ({ onChange }) => {
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