"use client";

import Image from "next/image";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const Login = () => {
  const [disabled, setDisabled] = useState(false);

  const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string(),
    // .min(8, { message: "Password must be at least 8 characters." })
    // .regex(/[A-Z]/, {
    //   message: "Password must contain at least one uppercase letter.",
    // })
    // .regex(/[a-z]/, {
    //   message: "Password must contain at least one lowercase letter.",
    // })
    // .regex(/[0-9]/, {
    //   message: "Password must contain at least one digit.",
    // })
    // .regex(/[@$!%*?&]/, {
    //   message:
    //     "Password must contain at least one special character (@, $, !, %, *, ?, &).",
    // }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  type FormValues = z.input<typeof formSchema>;

  const onSubmit = async (values: FormValues) => {
    setDisabled(true);
    try {
      const options = {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        options
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        setDisabled(false);
      } else {
        Cookies.set("token", data.data.token.access_token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        localStorage.setItem("user", JSON.stringify(data.data.user));
        toast.success(data.message);
        window.location.href = "/";
      }
    } catch (error: any) {
      toast.error(error.message);
      setDisabled(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 bg-white">
      <div className="overflow-y-auto">
        <div className="p-8">
          <Image src="/logo.png" alt="Logo" width={119} height={31} />
        </div>
        <div className="mt-[50px] flex justify-center items-center flex-col gap-8">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-center text-[28px] font-bold">
              Let’s get you started
            </h2>
            <p className="text-center text-[#737372] text-base leading-6 tracking-[0.1px]">
              Kindly fill in your details to continue
            </p>
          </div>

          <div className="w-full lg:max-w-[432px] p-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-sm font-normal text-[#344054]">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          {...field}
                          className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11"
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
                    <FormItem className="mb-1">
                      <FormLabel className="text-sm font-normal text-[#344054]">
                        Password *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="**********"
                          {...field}
                          className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <p className="text-sm text-[#667085] leading-5">
                    Forgot password?{" "}
                    <Link
                      href="/reset-password"
                      className="text-[#00A54F] font-semibold"
                    >
                      Reset password
                    </Link>
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={disabled}
                  className="w-full mt-8"
                >
                  Sign in
                </Button>
              </form>
            </Form>
          </div>
          <div className="flex gap-1 pb-8">
            <p className="text-sm text-[#667085]">Already have an account?</p>
            <Link className="text-sm text-[#00A54F] leading-5" href="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:block h-screen sticky top-0">
        <Image
          src="/sign-up.png"
          alt="Sign Up"
          fill
          className="absolute object-cover object-top"
        />
      </div>
    </div>
  );
};

export default Login;
