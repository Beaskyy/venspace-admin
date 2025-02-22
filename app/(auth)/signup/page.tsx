"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

interface StatesProps {
  id: string;
  name: string;
  short_name: string;
}

const SignUp = () => {
  const [disabled, setDisabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [states, setStates] = useState<StatesProps[] | []>([]);
  const [lgas, setLgas] = useState<any[]>([]);
  const [showLga, setShowLga] = useState<boolean>(false);
  const [stateId, setStateId] = useState("");
  const [lgaId, setLgaId] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nin, setNin] = useState("");
  const [fullName, setFullName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [cacError, setCacError] = useState<string>("");
  const [ninError, setNinError] = useState<string>("");
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch states
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const options = {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        };
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/misc/states`, options)
          .then((data) => data.json())
          .then((response) => {
            setStates(response.data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchStates();
  }, []);

  // Fetch LGA
  const fetchLgas = async (id: string) => {
    const options = {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/misc/local-governments?state_id=${id}`,
      options
    )
      .then((data) => data.json())
      .then((response) => {
        setLgas(response.data);
        setShowLga(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Verify CAC
  const VerifyCac = async (cac: string) => {
    setCacError("");
    const options = {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        registration_number: cac,
      }),
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/identity-verifications/cac`,
      options
    )
      .then((data) => data.json())
      .then((response) => {
        if (response.errors) {
          setCacError(response.message);
        } else {
          setName(response.data.companyName);
          setEmail(response.data.companyEmail);
          setAddress(response.data.branchAddress);
          setContactEmail(response.data.companyEmail);
          setRegistrationNumber(response.data.rcNumber);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Verify NIN
  const VerifyNin = async (nin: string) => {
    setNinError("");
    setLoading(true);
    const options = {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        nin,
      }),
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/identity-verifications/nin`,
      options
    )
      .then((data) => data.json())
      .then((response) => {
        if (response.errors) {
          setNinError(response.message);
          setLoading(false);
        } else {
          setShowDetails(true);
          setFullName(`${response.data.firstname} ${response.data.lastname}`);
          setPhone(response.data.phone);
          setNin(response.data.nin);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  const handleSubmit = async (e: React.FormEvent<any>) => {
    e.preventDefault();

    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
      return;
    }
    // if(password == confirmPassword) {
    //   toast.error("Passwords do not match.");
    //   return
    // }

    setDisabled(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/couriers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            registration_number: registrationNumber,
            phone,
            email,
            address,
            state_id: stateId,
            lga_id: lgaId,
            contact_person: {
              first_name: fullName?.split(" ")[0],
              last_name: fullName?.split(" ")[1],
              phone,
              email,
              nin,
              address,
              password,
              password_confirmation: confirmPassword,
            },
          }),
        }
      );

      if (!response.ok) throw new Error("Something went wrong.");

      const data = await response.json();
      if (data.status === "error") throw new Error(data.message);

      toast.success(data.message);

      window.location.href = "/";
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 bg-white">
      <div className="overflow-y-auto">
        <div className="p-8">
          <Image src="/logo.svg" alt="Logo" width={64} height={64} />
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
            <form onSubmit={handleSubmit} className="mb-4">
              {currentPage === 1 ? (
                <div className="flex flex-col gap-6">
                  {/* <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-normal text-[#344054]">
                      Name{" "}
                      <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      placeholder="kkk Logisitcs"
                      className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div> */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-normal text-[#344054]">
                      CAC Registration number{" "}
                      <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      placeholder="eg, 57939507-85"
                      className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      onKeyUp={() => {
                        if (registrationNumber.length === 11) {
                          VerifyCac(registrationNumber);
                        }
                      }}
                      maxLength={11}
                      required
                    />
                    <small className="text-rose-500 text-xs">{cacError}</small>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-normal text-[#344054]">
                      Email address <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      placeholder="kkklogistics@gmail.com"
                      className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11"
                      value={email}
                      readOnly
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-normal text-[#344054]">
                      State <span className="text-rose-500">*</span>
                    </Label>
                    <select
                      required
                      className="border border-[#F5F5F5] h-11 py-2 px-4 p-2.5 rounded-lg border-r-[10.242px] border-transparent outline outline-[#F3F4F6] outline-1 text-[#5A7593] text-[13px] font-medium leading-[20.794px] w-full"
                      value={stateId}
                      onChange={(e) => {
                        setStateId(e.target.value);
                        fetchLgas(e.target.value);
                      }}
                    >
                      <option value="">Select</option>
                      {states?.map(({ id, name }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {showLga && (
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-sm font-normal text-[#344054]">
                        Local Government{" "}
                        <span className="text-rose-500">*</span>
                      </Label>
                      <select
                        required
                        className="border border-[#F5F5F5] h-11 py-2 px-4 p-2.5 rounded-lg border-r-[10.242px] border-transparent outline outline-[#F3F4F6] outline-1 text-[#5A7593] text-[13px] font-medium leading-[20.794px] w-full"
                        value={lgaId}
                        onChange={(e) => {
                          setLgaId(e.target.value);
                          setDisabled(false);
                        }}
                      >
                        <option value="">Select</option>
                        {lgas?.map(({ id, name }) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ) : currentPage === 2 ? (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-normal text-[#344054]">
                      Contact person NIN{" "}
                      <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      placeholder="1230456765"
                      className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11"
                      value={nin}
                      onChange={(e) => {
                        const re = /^[0-9\b]+$/;
                        if (e.target.value === "" || re.test(e.target.value)) {
                          setNin(e.target.value);
                        }
                      }}
                      maxLength={11}
                      onKeyUp={() => {
                        if (nin.length === 11) {
                          VerifyNin(nin);
                        }
                      }}
                      required
                    />
                  </div>
                  {loading && (
                    <div className="flex justify-center items-center">
                      <Image
                        src="/loading.svg"
                        alt="loading"
                        width={61}
                        height={33}
                      />
                    </div>
                  )}
                  {showDetails && (
                    <>
                      <div className="flex flex-col gap-1.5">
                        <Label className="text-sm font-normal text-[#344054]">
                          Full name <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          placeholder="Eze Emmanuel"
                          className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label className="text-sm font-normal text-[#344054]">
                          Email address <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          type="email"
                          placeholder="kkklogistics@gmail.com"
                          className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label className="text-sm font-normal text-[#344054]">
                          Phone number <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          placeholder="08193949504"
                          className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label className="text-sm font-normal text-[#344054]">
                          Address
                        </Label>
                        <Input
                          type="text"
                          placeholder="15C Ajose Adeogun Street, Flat 4A, Victoria Island, Lagos State"
                          className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-normal text-[#344054]">
                      Password
                      <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      type="password"
                      placeholder="**********"
                      className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-normal text-[#344054]">
                      Confirm Password <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      type="password"
                      placeholder="**********"
                      className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <Button type="submit" disabled={disabled} className="w-full mt-8">
                {currentPage < 3 ? "Proceed" : "Create account"}
              </Button>
            </form>
          </div>
          <div className="flex gap-1 pb-10">
            <p className="text-sm text-[#667085]">Already have an account?</p>
            <Link className="text-sm text-[#F44363] leading-5" href="/login">
              Log in
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:block h-full min-h-screen sticky top-0">
        <Image
          src="/homepage.svg"
          alt="Sign Up"
          fill
          className="absolute object-cover object-top"
        />
      </div>
    </div>
  );
};

export default SignUp;
