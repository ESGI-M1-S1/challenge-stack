"use client";

import * as React from "react";

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
import { useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  email: z.string().min(2).max(50).email("Invalid email"),
  password: z.string().min(8).max(50),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    //todo: implement login
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
            <Button type={"submit"} onClick={
              () => {
                axios.get("http://127.0.0.1:8000/api/users", {
                  headers: {
                    'Content-Type': 'application/ld+json',
                  },
                })
                  .then((response: { data: any; }) => {
                  const { email, password } = form.getValues();
                  const users = response.data['hydra:member']
                  const matchedUser = users.find((user) => user.email === email && user.mdp === password);
                  if (matchedUser) {
                    sessionStorage.setItem('user', JSON.stringify(matchedUser.id));
                    router.push("/schools")
                    }
                  else {
                    alert("Identifiant(s) Incorrect(s)")
                    }
                })
                .catch((error: any) => {
                  console.error(error);
                });
              }
            }>Login</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
