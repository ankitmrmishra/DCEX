"use client";
import React, { useEffect, useRef } from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import { Archivo } from "next/font/google";
import { useRouter } from "next/navigation";
import { TrustedByCompanies } from "./ui/TrustedBy";
import { cn } from "@/lib/utils";
import { Shield, Zap, Globe, Users, Star, CreditCard } from "lucide-react";

import { ChevronDown } from "lucide-react";

export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
});
const HeroPage = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <main className={cn(archivo.className)}>
      <div className="bg-black  text-foreground text-center   max-h-max text- flex justify-center items-center align-middle  p-6  md:p-28 ">
        <div className="textAreahere  flex flex-col justify-center items-center align-middle text-center py-16">
          <span className="lg:text-7xl text-3xl text-white font-bold ">
            Unlock Your Crypto Future with{" "}
            <span className="text-[#F5E876]">BharatWallet</span>
          </span>{" "}
          <br />
          <span className="lg:text-base text-wrap max-w-[50rem] text-sm text-[#969696] italic">
            Create a fortified, private crypto wallet in moments with our
            intuitive generator. Experience effortless security and peace of
            mind, enhanced by Google Auth for your convenience.
          </span>
          <div className="pt-8 flex justify-center align-middle items-center gap-5">
            {session.data?.user ? (
              <Button
                disable={false}
                onClick={() => {
                  router.push("/Dashboard");
                }}
                className="bg-white"
              >
                Go To Dashboard
              </Button>
            ) : (
              <Button
                disable={false}
                onClick={() => {
                  signIn();
                }}
                className=""
              >
                Login
              </Button>
            )}
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-[#F5E876] "
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <section className="flex justify-center align-middle items-center md:py-5  md:p-16 p-3 ">
        <TrustedByCompanies />
      </section>
      <section className="">
        <div id="features" className="bg-black py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-white">
                Powerful features
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#F5E876] sm:text-4xl">
                Everything you need in a Solana wallet
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-400">
                BharatWallet combines cutting-edge technology with user-friendly
                design to provide a seamless Solana experience.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {[
                  {
                    name: "Secure key management",
                    description:
                      "Your private keys are encrypted and never leave your device, ensuring maximum security for your assets.",
                    icon: Shield,
                  },
                  {
                    name: "Fast transactions",
                    description:
                      "Experience lightning-fast transactions on the Solana network with minimal fees.",
                    icon: Zap,
                  },
                  {
                    name: "DApp integration",
                    description:
                      "Seamlessly interact with your favorite Solana DApps directly from BharatWallet.",
                    icon: Globe,
                  },
                  {
                    name: "Token swaps",
                    description:
                      "Swap tokens easily with built-in DEX aggregation for the best rates.",
                    icon: CreditCard,
                  },
                  {
                    name: "NFT support",
                    description:
                      "View, send, and receive NFTs with full metadata support.",
                    icon: Star,
                  },
                  {
                    name: "Multi-account management",
                    description:
                      "Create and manage multiple Solana accounts within a single interface.",
                    icon: Users,
                  },
                ].map((feature) => (
                  <div key={feature.name} className="flex flex-col items-start">
                    <div className="rounded-md bg-[#F5E876] p-2 text-black">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <dt className="mt-4 font-semibold text-white">
                      {feature.name}
                    </dt>
                    <dd className="mt-2 leading-7 text-gray-300">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center align-middle items-center">
        <FAQ />
      </section>
      <section className="">
        <div className="bg-black">
          <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="relative isolate overflow-hidden bg-black/85 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Boost your crypto portfolio today
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Join thousands of satisfied users who trust{" "}
                <span className="text-[#F5E876]">BharatWallet</span> for
                managing their digital assets. Start your journey to financial
                freedom now.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button
                  disable={false}
                  onClick={() => {
                    signIn();
                  }}
                  className="px-10"
                >
                  Login
                </Button>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-[#F5E876] "
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
              <svg
                viewBox="0 0 1024 1024"
                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                aria-hidden="true"
              >
                <circle
                  cx={512}
                  cy={512}
                  r={512}
                  fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                    <stop stopColor="#7775D6" />
                    <stop offset={1} stopColor="#E935C1" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-black text-white" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          BharatWallet
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <span className=" text-[#F5E876]">BharatWallet</span>
              <p className="text-sm leading-6 text-white">
                Empowering users with secure and user-friendly blockchain wallet
                solutions.
              </p>
              <div className="flex space-x-6">
                {["Twitter", "GitHub", "Discord"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-[#F5E876] hover:text-gray-500"
                  >
                    <span className="sr-only">{item}</span>
                    {/* Add appropriate icon here */}
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-[#F5E876]">
                    Solutions
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {["Wallet", "Security", "Exchange", "Portfolio"].map(
                      (item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="text-sm leading-6 text-gray-300 hover:text-gray-100"
                          >
                            {item}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-[#F5E876]">
                    Support
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {[
                      "Documentation",
                      "Guides",
                      "API Status",
                      "Help Center",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-sm leading-6 text-gray-300 hover:text-gray-100"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-[#F5E876]">
                    Company
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {["About", "Blog", "Jobs", "Press", "Partners"].map(
                      (item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="text-sm leading-6 text-gray-300 hover:text-gray-100"
                          >
                            {item}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-[#F5E876]">
                    Legal
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {[
                      "Privacy",
                      "Terms",
                      "Cookie Policy",
                      "Licensing",
                      "Contact",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-sm leading-6 text-gray-300 hover:text-gray-100"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-[#F5E876]">
              &copy; {new Date().getFullYear()} BharatWallet, Inc. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HeroPage;

const faqs = [
  {
    question: "What is BharatWallet?",
    answer:
      "BharatWallet is a secure and user-friendly crypto wallet designed for the Solana blockchain. It offers a range of features including secure key management, fast transactions, and DApp integration.",
  },
  {
    question: "How secure is BharatWallet?",
    answer:
      "BharatWallet prioritizes security. Your private keys are encrypted and never leave your device, ensuring maximum security for your assets. We also use Google Auth for an additional layer of security.",
  },
  {
    question: "What features does BharatWallet offer?",
    answer:
      "BharatWallet offers a range of features including secure key management, fast transactions, DApp integration, token swaps, NFT support, and multi-account management.",
  },
  {
    question: "Can I interact with DApps using BharatWallet?",
    answer:
      "Yes, BharatWallet allows you to seamlessly interact with your favorite Solana DApps directly from the wallet interface.",
  },
  {
    question: "Does BharatWallet support NFTs?",
    answer:
      "Yes, BharatWallet fully supports NFTs. You can view, send, and receive NFTs with full metadata support.",
  },
  {
    question: "How fast are transactions on BharatWallet?",
    answer:
      "BharatWallet leverages the Solana network to provide lightning-fast transactions with minimal fees.",
  },
];

function FAQ() {
  return (
    <section
      className={cn(archivo.className, "bg-black text-white py-16 md:w-1/2")}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details key={index} className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none ">
                <span className="text-lg">{faq.question}</span>
                <span className="transition group-open:rotate-180">
                  <ChevronDown size={24} />
                </span>
              </summary>
              <p className="rounded-xl mt-3 group-open:animate-fadeIn md:p-5 p-2 text-start text-sm md:text-base bg-black text-[#F5E876] ">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
