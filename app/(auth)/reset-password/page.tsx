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
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [disabled, setDisabled] = useState(false);

  const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
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
        }),
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        options
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      sessionStorage.setItem("email", values.email);
      toast.success(data.message);
      setTimeout(() => {
        window.location.href = `/otp`;
      }, 2000);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDisabled(false);
    }
  };
  return (
    <div className="min-h-screen">
      <div className="p-8">
        <Image src="/logo.png" alt="Logo" width={119} height={31} />
      </div>
      <div className="mt-[90px] flex flex-col justify-center items-center gap-[22px] lg:px-0 px-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-center text-[22px] font-bold text-[#0F172A]">
            Reset password
          </h1>
          <p className="text-center text-[#667085] text-sm leading-6 tracking-[0.1px]">
            Kindly enter your email to continue
          </p>
        </div>
        <div className="bg-white pt-[22px] px-[26px] pb-8 w-full max-w-[541px] rounded-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="text-sm font-normal text-[#475467]">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jorjasmith@gmail.com"
                        {...field}
                        className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#98A2B3] shadow-none h-11"
                      />
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
      </div>
    </div>
  );
};

export default ResetPassword;
