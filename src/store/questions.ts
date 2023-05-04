import {create} from 'zustand'
import { type Question } from "../types"

interface State{
     questions: Question[]
     currentQuestion: number
     fetchQuestions: (limit:number)=>Promise<void>
     selectAnswer:(questionId:number, answerIndex:number) =>void
     nextQuestion:()=>void
     previousQuestion:()=>void
}
export const useQuestionsStore = create<State>((set,get)=>{
     return{
          questions:[],
          currentQuestion:0,

          fetchQuestions:async(limit:number)=>{
               const res = await fetch('http://127.0.0.1:5173/data.json');
               const json = await res.json()
               const questions = json.sort(()=>Math.random() - 0.5).slice(0,limit);
               set({questions})
          },

          selectAnswer:(questionId:number,answerIndex:number)=>{
               const { questions } = get();
               const newQuestions:Question[] = structuredClone(questions);
               const questionIndex = newQuestions.findIndex((q)=>q.id === questionId)
               const questionInfo = newQuestions[questionIndex];
               const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;

               newQuestions[questionIndex] ={
                    ...questionInfo,
                    userSelectedAnswer: answerIndex,
                    isCorrectUserAnswer
               }

               set({questions:newQuestions});
               
          },
          nextQuestion:()=>{
               const {currentQuestion,questions} = get()
               if(questions.length > currentQuestion+1) {set({currentQuestion:currentQuestion+1})}
          },
          previousQuestion:()=>{
               const {currentQuestion,questions} = get()
               if(currentQuestion > 0) {set({currentQuestion:currentQuestion-1})}
          }

     }
})