import { useQuestionsStore } from "../store/questions";

export const useQuestionData=()=>{
     const questions = useQuestionsStore(state => state.questions);
     const questionsStatus={
          'correct':0,
          'incorrect':0,
          'unanswered':0
     }
     questions.forEach(question=>{
          if(question.isCorrectUserAnswer ==null) questionsStatus.unanswered++
          if(question.isCorrectUserAnswer) questionsStatus.correct++
          if(question.isCorrectUserAnswer===false) questionsStatus.incorrect++
     })
     const {correct,incorrect,unanswered} = questionsStatus;
     return {correct,incorrect,unanswered}
}