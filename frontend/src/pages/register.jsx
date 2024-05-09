import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { NavLink, useNavigate } from "react-router-dom";
//import { useSignIn } from "react-auth-kit";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be text",
    })
    .email({
      message: "Must be a valid email",
    }),
  role: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be text",
  }),
});

export function Register() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      role: "",
    },
  });

  async function onSubmit(data) {
    try {
      const response = await axios("http://localhost:3000/api/user/create", {
        method: "post",
        data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data) navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-6">
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
          <Controller
            name="role"
            control={form.control}
            render={({ field }) => {
              return (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="Creator">Creator</SelectItem>
                      <SelectItem value="Reader">Reader</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }}
          />
          <Button type="submit">Register</Button>
        </form>
      </Form>
      <NavLink to="/login">Login</NavLink>
    </div>
  );
}
