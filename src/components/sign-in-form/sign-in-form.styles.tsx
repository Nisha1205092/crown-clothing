import styled from "styled-components";

export const SignInFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 430px;
    margin: auto;

    h2 {
        margin: 10px 0;
    }
`;

export const RedirectContainer = styled.div`
    display: flex;
    flex-flow: column wrap;
`;

export const RedirectButton = styled.div`
    align-self: center;
`;

export const SignInButtonsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-flow: row nowrap;
`;

// .sign-in-form-container {
//     display: flex;
//     flex-direction: column;
//     width: 430px;
//     margin: auto;

//     h2 {
//         margin: 10px 0;
//     }

//     .redirect-container {
//         display: flex;
//         flex-flow: column wrap;

//         .redirect-button {
//             align-self: center;
//         }
//         .sign-in-buttons-container {
//             display: flex;
//             justify-content: space-around;
//             flex-flow: row nowrap;
             
//         }
//     }
    
// }