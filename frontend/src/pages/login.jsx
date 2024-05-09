import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { NavLink, useNavigate } from "react-router-dom";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be text",
    })
    .email({
      message: "Must be a valid email",
    }),
});

export function Login() {
  const signIn = useSignIn();
  const history = useNavigate();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data) {
    let response;
    try {
      response = await axios("http://localhost:3000/api/user/login", {
        method: "post",
        data: {
          email: data.email,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const logged = signIn({
        auth: {
          token: response.data.token,
        },
        userState: response.data.user[0],
      });

      if (logged) return history("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-6">
      <h1>Please log in to access the section</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@domain.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <NavLink to="/register">Register</NavLink>
    </div>
  );
}
