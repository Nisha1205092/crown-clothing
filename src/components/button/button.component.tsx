import { ButtonHTMLAttributes, FC } from 'react';
import {
    BaseButton,
    GoogleSignInButton,
    GoogleRedirectButton,
    InvertedButton,
    ButtonSpinner
} from './button.styles';

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted',
    redir = 'google-redirect'
}
// const base = 'base';
// const google = 'goole';
// const inverted = 'inverted';
// const redir = 'redir';

// const mymap2 = {
//     [base]: 'BaseButton',            // 'base': 'BaseButton'
//     [google]: 'GoogleSignInButton',  // 'google': 'GoogleSignInButton'
//     [inverted]: 'InvertedButton',    // 'inverted': 'InvertedButton'
//     [redir]: 'GoogleRedirectButton'  // 'redir': 'GoogleRedirectButton'
// }

// mymap2['google']  //'GoogleSignInButton' -- output
// mymap2[google] //'GoogleSignInButton' -- output

//similar code with same concept

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton => ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    [BUTTON_TYPE_CLASSES.redir]: GoogleRedirectButton
}[buttonType]);

export type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;


// we are extending upon already existing ''ButtonHTMLAttributes'' component in React
// ButtonHTMLAttributes<HTMLButtonElement> this part is doing the 'extending' thing
// and this part is serving for the ...otherprops where it can be any props 
// allowed in 'HTMLButtonElement'
const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton>
    );
}

export default Button;

