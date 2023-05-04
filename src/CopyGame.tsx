import { Container, IconButton, Stack, Card, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useQuestionsStore } from './store/questions';
import {type Question as QuestionType} from './types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
const Question = ({info}:{info:QuestionType})=>{
     const hanldeClick=()=>{
          
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
                         <ListItemButton disabled={false}>
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
     const questionInfo = questions[currentQuestion];
  return (
    <div>
     <Container maxWidth='md'>
          <Question info={questionInfo}/>
     </Container>
    </div>
  )
}