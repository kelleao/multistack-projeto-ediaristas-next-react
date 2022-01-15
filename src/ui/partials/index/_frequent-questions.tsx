import { useState } from 'react';
import {
  SectionContainer,
  Wave,
  SectionTitle,
  SectionSubTitle,
  AccrdionStyled,
} from './_frequent-questions.styled';
import {
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from '@mui/material';

const questionsList = [
  {
    question: 'Dúvida 1',
    answer:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus veritatis nam atque in? Minima ducimus dolorum aspernatur dolores animi nisi doloremque, accusamus aliquam? Nisi vel consequuntur animi atque eos error!',
  },
  {
    question: 'Dúvida 2',
    answer:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus veritatis nam atque in? Minima ducimus dolorum aspernatur dolores animi nisi doloremque, accusamus aliquam? Nisi vel consequuntur animi atque eos error!',
  },
  {
    question: 'Dúvida 3',
    answer:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus veritatis nam atque in? Minima ducimus dolorum aspernatur dolores animi nisi doloremque, accusamus aliquam? Nisi vel consequuntur animi atque eos error!',
  },
  {
    question: 'Dúvida 4',
    answer:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus veritatis nam atque in? Minima ducimus dolorum aspernatur dolores animi nisi doloremque, accusamus aliquam? Nisi vel consequuntur animi atque eos error!',
  },
];

const FrequentQuestions = () => {
  const [activeAccontion, setActiveAccontion] = useState(0);

  function isOpen(accontionNumber: number): boolean {
    return activeAccontion === accontionNumber;
  }
  function changeOpenAccodion(accontionNumber: number) {
    if (isOpen(accontionNumber)) {
      setActiveAccontion(0);
    } else {
      setActiveAccontion(accontionNumber);
    }
  }
  function getIcon(accontionNumber: number) {
    return isOpen(accontionNumber) ? 'twf-minus' : 'twf-plus';
  }

  return (
    <SectionContainer>
      <Wave src={'/img/home/waves.svg'} />
      <Container>
        <SectionTitle>Ainda está com dúvida?</SectionTitle>
        <SectionSubTitle>Veja abaixo as perguntas frequentes?</SectionSubTitle>
        {questionsList.map((item, index) => (
          <AccrdionStyled
            key={index}
            expanded={isOpen(index + 1)}
            onChange={() => changeOpenAccodion(index + 1)}
          >
            <AccordionSummary expandIcon={<i className={getIcon(index + 1)} />}>
              <Typography color={'primary'}>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>{item.answer}</AccordionDetails>
          </AccrdionStyled>
        ))}
      </Container>
    </SectionContainer>
  );
};

export default FrequentQuestions;
