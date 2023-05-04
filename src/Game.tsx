import { Container, IconButton, Stack, Card, Typography, List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material';
import { useQuestionsStore } from './store/questions';
import {type Question as QuestionType} from './types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Footer } from './Footer';
const Question = ({info}:{info:QuestionType})=>{
     const selectAnswer = useQuestionsStore(state => state.selectAnswer);

     const handleClick=(answerId:number)=>{
          selectAnswer(info.id,answerId);
     }
     return (
     <Card variant="outlined" sx={{textAlign:'left', padding:2}}>
          <Typography variant='h5'>
               {info.question}
          </Typography>
          <SyntaxHighlighter lenguage='javascript' style={gradientDark}>
               {info.code}
          </SyntaxHighlighter>
          <List sx={{bgcolor:'#333'}} disablePadding>
               {
                    info.answers.map((answer,index)=><ListItem divider key={index} disablePadding>
                         <ListItemButton 
                              disabled={info.hasOwnProperty("isCorrectUserAnswer")} 
                              sx={info.hasOwnProperty("isCorrectUserAnswer")
                                   ? info.correctAnswer === index ? {bgcolor:'green'}
                                   : info.userSelectedAnswer === index ? {bgcolor:'red'} : null
                                   : {}}
                              onClick={()=>handleClick(index)}>
                              <ListItemText>
                                   {answer}
                              </ListItemText>
                         </ListItemButton>
                         </ListItem>)
               }
          </List>

     </Card>)
}

export const Game = () => {
     const currentQuestion = useQuestionsStore(state => state.currentQuestion);
     const questions = useQuestionsStore(state => state.questions);
     const nextQuestion = useQuestionsStore(state => state.nextQuestion);
     const previousQuestion = useQuestionsStore(state => state.previousQuestion)
     const questionInfo = questions[currentQuestion];

  return (
    <div>
     <Container maxWidth='md'>
          <Question info={questionInfo}/>
          <Button onClick={previousQuestion} disabled={currentQuestion == 0} sx={{margin:'1rem'}}>
                    Prev
          </Button>
          {currentQuestion+1} / {questions.length}
          <Button onClick={nextQuestion} disabled={currentQuestion >= questions.length-1} sx={{margin:'1rem'}}>
                    Next
          </Button>
          <Footer/>     
     </Container>

    </div>
  )
}