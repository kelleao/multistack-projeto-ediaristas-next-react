import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles'; 

export const FormElementContainer = styled('div')` 
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 650px;
    margin: 0 auto ${({ theme }) =>theme.spacing(7)};
    ${({ theme }) => theme.breakpoints.down('md')} {
        gap: ${({ theme }) => theme.spacing(3)};
    }
`;

export const ProfissinaisPaper = styled(Paper) `
    padding: ${({ theme }) => theme.spacing(7)};
    margin: 0 auto ${({ theme }) => theme.spacing(10)};
    ${({ theme }) => theme.breakpoints.down('md')} {
        box-shadow: nome;
        padding: 0;
    }
`;

export const ProfissinaisContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  ${({ theme }) => theme.breakpoints.up('md')} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing(6)}
  }
   ${({ theme }) => theme.breakpoints.down('md')} {
      margin-left: ${({ theme }) => theme.spacing(-2)};
      margin-right: ${({ theme }) => theme.spacing(-2)};
      > :nth-of-type(odd) {
          background-color: ${({ theme }) => theme.palette.background.paper};
      }
   }
`;