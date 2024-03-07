"use client";

import * as React from "react";
import { Controller } from 'react-hook-form';

import { z } from "zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import axios from "axios";

const formSchema = z
  .object({
    email: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
    role: z.array(z.enum(["formateur", "etudiant"]))
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "etudiant"
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    //todo: implement the fetch
    console.log(data);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoCapitalize="none"
                      autoCorrect="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Controller
                      render={({ field }) => (
                        <Select {...field}>
                          <SelectTrigger className="w-full bg-white border border-gray-300 p-2 rounded-md flex items-center justify-between">
                            <SelectValue placeholder="Type de compte"></SelectValue>
                          </SelectTrigger>
                          <SelectContent className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md">
                            <SelectItem
                              value={"etudiant"}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                            >
                              Étudiant
                            </SelectItem>
                            <SelectItem
                              value={"formateur"}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                            >
                              Formateur
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      control={form.control}
                      name="role"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type={"submit"} onClick={() => {
              if (form.getValues().password == form.getValues().confirmPassword) {
              console.log(form.getValues())
              const userData = {
                  email: form.getValues().email,
                  mdp: form.getValues().password,
                  roles: [form.getValues().role]
                  }
              axios.post('http://127.0.0.1:8000/api/users', userData, {
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
                form.getValues().email
              }
             }}>
              Create an account</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
