import styled from "styled-components";
import { primaryTextColor } from "../../utils/theme/theme.utils";

export const DarkModeToggleContainer = styled.div`
    display: flex;
    margin: 0 auto;
    & > button {
        font-size: 1.2em;
        background: none;
        border: none;
        color: #ffe600;
        cursor: pointer;
        transition: color 0.3s ease;
        &:last-child {
            color: ${primaryTextColor};
        }

        &:focus {
            outline: none;
        }
    }
`;