import { Button } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
const LIMIT_QUESTIONS=10;
const Start = () => {
     const fetchQuestion = useQuestionsStore(state => state.fetchQuestions);
     const handleClick =()=>{
          fetchQuestion(LIMIT_QUESTIONS);
     }
  return (
    <Button onClick={handleClick} variant="contained">
          !Empezar!
    </Button>
  )
}
export default Start