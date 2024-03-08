"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const questionSchema = z.object({
  questionText: z.string().min(2).max(500),
  answers: z.array(
    z.object({
      answerText: z.string().min(2).max(500),
      isCorrect: z.boolean(),
    })
  ),
});

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  duration: z.string().min(1).max(100),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  questions: z.array(questionSchema),
});

export  function NewQuizzForm({
  className,
  ecoles,
  classes,
  cours,
  ...props
}: any) {
    const [, forceUpdate] = useState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: "1",
      difficulty: "beginner",
      questions: [],
    },
  });

  function addQuestion() {
   form.setValue(
    "questions",
    [...form.getValues().questions, { questionText: "", answers: [] }]
    );
    forceUpdate({});
  }

  function removeQuestion(index: number) {
    const questions = [...form.getValues().questions];
    questions.splice(index, 1);
    form.setValue("questions", questions);
    forceUpdate({});
  }

  function onQuestionChange(index: number, fieldName: string, value: any) {
    const questions = [...form.getValues().questions];
    questions[index][fieldName] = value;
    form.setValue("questions", questions);
    forceUpdate({});
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    // todo: implement form creation
    console.log("test", data);
  }
 
  var coursId: any;
  const [dateExam, setDate] = React.useState<Date>()
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    
    <div className={cn("grid gap-8", className)} {...props}>
      <label className="mb-4">
        <strong>Titre de l`examen</strong> 
        <input type="text" className="px-2 py-2 rounded border-2 border-solid border-black form-input mt-1 block w-full focus:text-white focus:bg-black"
        value={inputValue}
        onChange={handleInputChange}/>
      </label>
      <Select>
        <SelectTrigger className="w-full bg-white border border-gray-300 p-2 rounded-md flex items-center justify-between">
          <SelectValue placeholder="Choissisez une école"></SelectValue>
        </SelectTrigger>
        <SelectContent className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md">
          {(ecoles).map((ecole: Ecole) => (
            <SelectItem key={ecole.id} value={ecole.id} className="p-2 hover:bg-gray-100 cursor-pointer">
              {ecole.nom}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full bg-white border border-gray-300 p-2 rounded-md flex items-center justify-between">
          <SelectValue placeholder="Choissisez une classe"></SelectValue>
        </SelectTrigger>
        <SelectContent className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md">
          {(classes).map((classe: Class) => (
            <SelectItem key={classe.id} value={classe.id} className="p-2 hover:bg-gray-100 cursor-pointer">
              {classe.nom}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full bg-white border border-gray-300 p-2 rounded-md flex items-center justify-between">
          <SelectValue placeholder="Choisissez un cours"></SelectValue>
        </SelectTrigger>
        <SelectContent className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md">
          {(cours).map((cours: Course) => (
            <SelectItem 
              key={cours.id} 
              value={cours.id} 
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => coursId = cours.id}
            >
              {cours.matiere}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !dateExam && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateExam ? format(dateExam, "PPP") : <span>Veuillez chosisir une date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dateExam}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* Existing form fields */}

            {/* Dynamic questions */}
            {form.getValues().questions.map((question, index) => (
              <div key={index} className="border p-4">
                <FormField
                  name={`questions.${index}.questionText`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`Question ${index + 1}`}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* isSingleChoice selection */}
                <FormField
                  name={`questions.${index}.isSingleChoice`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select  
                          onValueChange={(value) => {
                            field.onChange(value == 'false');
                            forceUpdate({})
                            console.log("test")
                          }}
                          defaultValue={field.value ? 'false' : 'true'}
                        >
                          <SelectTrigger className="w-[180px] my-2">
                            <SelectValue placeholder="Multiple Choice"></SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Multiple Choice</SelectItem>
                            <SelectItem value="false">Single Choice</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dynamic answers */}
                {question.answers &&
                  question.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="flex items-center my-2">
                      <FormField
                        name={`questions.${index}.answers.${answerIndex}.answerText`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        name={`questions.${index}.answers.${answerIndex}.isCorrect`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <label className="mx-2">
                                <input
                                  type={form.getValues(`questions.${index}.isSingleChoice`) ? 'radio' : 'checkbox'}
                                  {...field}
                                  name={`correctAnswer-${index}`} 
                                  className="mr-2"
                                />
                                Correct
                              </label>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button
                        type="button"
                        onClick={() => {
                          const answers = [...question.answers];
                          answers.splice(answerIndex, 1);
                          onQuestionChange(index, "answers", answers);
                        }}
                      >
                        Remove Answer
                      </Button>
                    </div>
                  ))}

                <Button
                  type="button"
                  onClick={() => {
                    onQuestionChange(index, "answers", [
                      ...(question.answers || []),
                      { answerText: "", isCorrect: false },
                    ]);
                  }}
                  className="mr-2"
                >
                  Add Answer
                </Button>

                <Button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="mt-4"
                >
                  Remove Question
                </Button>
              </div>
            ))}

            <Button type="button" onClick={addQuestion} className="mt-4">
              Add Question
            </Button>

            <div className={"w-full flex justify-end"}>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button type={"submit"} onClick={() => {
                
                const examenData = {
                  idCours: `api/courss/${coursId}`,
                  note: 0,
                };
                let examenId;

                axios.post('http://127.0.0.1:8000/api/examens', examenData, {
                  headers: {
                    'Content-Type': 'application/ld+json',
                  },
                })
                  .then((response: { data: any; }) => {
                    console.log('Examen created successfully:', response.data);
                    examenId = response.data['id'];

                    const formattedDate = dateExam ? format(dateExam, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : null;
                    const questionnaireData = {
                      titre: inputValue,
                      date: formattedDate,
                      idExamen: `api/examens/${examenId}`,
                    };

                    axios.post('http://127.0.0.1:8000/api/questionnaires', questionnaireData, {
                      headers: {
                        'Content-Type': 'application/ld+json',
                      },
                    })
                      .then((response: { data: any; }) => {
                        console.log('Quiz created successfully:', response.data);
                        let idQuestionnaire = response.data['id']
                        form.getValues().questions.forEach(element => {
                        const questionsData = {
                        question: `${element.questionText}`,
                        idQuestionnaire: `http://127.0.0.1:8000/api/questionnaires/${idQuestionnaire}`
                    }
                    let questionId: any;
                    axios.post('http://127.0.0.1:8000/api/questions', questionsData, {
                      headers: {
                        'Content-Type': 'application/ld+json',
                      },
                    })
                      .then((response: { data: any; }) => {
                        console.log('Question created successfully:', response.data);
                        questionId = response.data['id'];
                        element.answers.forEach(answer => {

                          
                          const reponsesData = {
                            reponse: answer.answerText,
                            idQuestion: `http://127.0.0.1:8000/api/questions/${questionId}`,
                            valide: answer.isCorrect
                            }
                          axios.post('http://127.0.0.1:8000/api/reponses', reponsesData, {
                          headers: {
                            'Content-Type': 'application/ld+json',
                            },
                          })
                          .then((response: { data: any; }) => {
                            console.log('Answer created successfully:', response.data);
                          })
                          .catch((error: any) => {
                            console.error('Error creating Answer:', error);
                          });
                            }
                          
                          
                          )
                      })
                      .catch((error: any) => {
                        console.error('Error creating Question:', error);
                      });
  
                  });
                      })
                      .catch((error: any) => {
                        console.error('Error creating quiz:', error);
                      });
                  })
                  .catch((error: any) => {
                    console.error('Error creating examen:', error);
                  });
                



              }} className={"max-w-52"}>
                Create new Quizz
              </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enregistrées !</AlertDialogTitle>
            <AlertDialogDescription>
             Vos données ont été correctement modififées
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}


