

import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavaScriptLogo } from './components/JavaScriptLogo';
import Start from './Start';
import { useQuestionsStore } from './store/questions';
import { Game } from './Game';

function App() {
  const questions=useQuestionsStore(state=>state.questions);
  return (
    <main>
      <Container maxWidth={'sm'}>
        <Stack direction={'row'} alignItems={'cente'} justifyContent={'center'} gap={2}>
          <JavaScriptLogo/>
          <Typography variant='h2' component={'h1'}>
            JavaScript Quizz
          </Typography>
        </Stack>
      </Container>
      {questions.length === 0 && <Start/>}
      {questions.length != 0 && <Game/>}
    </main>
  )
}

export default App
