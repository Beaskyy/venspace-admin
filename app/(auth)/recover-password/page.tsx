"use client";

import Image from "next/image";

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
import { Icons } from "@/components/icons";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const RecoverPassword = () => {
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let token: any;

  if (token !== null) {
    token = sessionStorage.getItem("otp-token");
  }

  const formSchema = z
    .object({
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." })
        .regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter.",
        })
        .regex(/[a-z]/, {
          message: "Password must contain at least one lowercase letter.",
        })
        .regex(/[0-9]/, {
          message: "Password must contain at least one digit.",
        })
        .regex(/[@$!%*?&]/, {
          message:
            "Password must contain at least one special character (@, $, !, %, *, ?, &).",
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords must match.",
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
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
          "X-Otp-Verification-Token": token,
        }),
        body: JSON.stringify({
          email: sessionStorage.getItem("email"),
          password: values.password,
          password_confirmation: values.confirmPassword,
        }),
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        options
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        toast.error(data.message);
        setDisabled(false);
      } else {
        toast.success(data.message);
        setTimeout(() => {
          window.location.href = `/login`;
        }, 2000);
      }
    } catch (error: any) {
      toast.error(error.message);
      setDisabled(false);
    }
  };

  return (
    <div className="">
      <div className="p-8">
        <Image src="/logo.svg" alt="Logo" width={64} height={64} />
      </div>
      <div className="mt-[50px] flex justify-center items-center flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-center text-[28px] font-bold">Reset password</h2>
          <p className="text-center text-[#737372] text-base leading-6 tracking-[0.1px]">
            Kindly enter a new password
          </p>
        </div>

        <div className="bg-white pt-[22px] px-[26px] pb-8 w-full max-w-[541px] rounded-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-1">
                    <FormLabel className="text-sm font-normal text-[#475467]">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="**********"
                          {...field}
                          className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11 pr-10" // Added padding-right for space
                        />
                        <div
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#718096] cursor-pointer"
                        >
                          {showPassword ? <Eye /> : <EyeOff />}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mb-1">
                    <FormLabel className="text-sm font-normal text-[#475467]">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="**********"
                          {...field}
                          className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11 pr-10" // Added padding-right for space
                        />
                        <div
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#718096] cursor-pointer"
                        >
                          {showPassword ? <Eye /> : <EyeOff />}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={disabled} className="w-full mt-8">
                Proceed
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex gap-1 pb-8">
          <p className="text-sm text-[#667085]">Already have an account?</p>
          <Link
            className="text-sm text-[#F44363] leading-5 font-semibold"
            href="/login"
          >
            Go back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
