"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import VerificationInput from "react-verification-input";

const RecoverPassword = () => {
  const [disabled, setDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Format time in MM:SS format
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleComplete = async (value: string) => {
    setDisabled(true);
    try {
      const options = {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          identifier: sessionStorage.getItem("email"),
          token: value,
        }),
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/identity-verifications/otp`,
        options
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      sessionStorage.setItem("otp-token", data.data.token);
      setTimeout(() => {
        window.location.href = `/recover-password`;
      }, 2000);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
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
          <h2 className="text-center text-[22px] font-bold">Verify OTP</h2>
          <p className="text-center text-[#737372] text-base leading-6 tracking-[0.1px]">
            Kindly enter the code sent to (user.emailaddress)
          </p>
        </div>

        <div className="flex flex-col gap-2.5 bg-white pt-[22px] px-[26px] pb-8 w-full max-w-[541px] rounded-xl">
          <p className="text-[#475467] text-sm">
            Enter your one time password (OTP)
          </p>
          <VerificationInput
            onComplete={handleComplete}
            length={6}
            classNames={{
              container: cn(
                "flex gap-x-2 w-full",
                disabled && "opacity-50 cursor-not-allowed "
              ),
              character:
                "uppercase h-auto rounded-md border border-[#F5F5F5] flex items-center justify-center text-base text-[#667085] font-medium text-gray-500",
              characterInactive: "bg-white",
              characterSelected: "bg-white text-black",
              characterFilled: "bg-white text-black",
            }}
            autoFocus
          />
          <div className="bg-[#F1FEF7] p-3 rounded-lg">
            <p className="text-base leading-[25px] text-[#56555F]">
              You need to wait for a duration of{" "}
              <span className="text-[#F44363]">{formatTime(timeLeft)}</span>{" "}
              minutes before you are eligible to request another OTP code
            </p>
          </div>
          <Button type="submit" disabled={disabled} className="w-full mt-8">
            Reset Password
          </Button>
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
