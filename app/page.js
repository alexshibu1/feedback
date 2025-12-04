import ButtonLogin from "./compondents/buttonlogin";
import FaqListener from "./compondents/faqlistener";
import Image from "next/image";
import productDemo from "@/assets/productDemo.jpeg";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  const pricingFeatures = [
    "Collect customer feedback",
    "Unlimited boards",
    "Admin dashboard",
    "24/7 support",
  ];
  const greeting1 = `Hello ${session.user.name || "there"}`;

  return (
    <main>
      <div className="bg-base-200">
        <section className="max-w-3xl mx-auto flex justify-between items-center px-8 py-2">
          <div className="font-bold ">ideaBox</div>
          <div className="space-x-4 text-primary max-md:hidden">
            <a className="link link-hover" href="#pricing">
              Pricing
            </a>
            <a className="link link-hover" href="#faq">
              {" "}
              FAQ
            </a>
          </div>
          <ButtonLogin session={session} />
        </section>
      </div>
      {/* Hero Section - Text Left, Image Right */}
      <section className="py-32 p-8 max-w-6xl mx-auto">
        {/* Flex Container: Stacked on mobile, side-by-side on desktop */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left Side: Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-bold mb-6 text-gray-900 lg:text-6xl">
              {greeting1}
            </h1>
            <div className="mb-6 text-lg text-gray-500">
              <h2>You can share your pain points directly with Alex</h2>
            </div>
            <div className="mt-8">
              <ButtonLogin session={session} />
            </div>
          </div>

          {/* Right Side: Product Image */}
          <div className="flex-1">
            <Image
              src={productDemo}
              alt="productDemo"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>
      {/* pricing section */}
      <section className="bg-base-200 " id="pricing">
        <div className="py-32 p-8 max-w-3xl mx-auto">
          <p className="text-center text-xl mb-6 text-primary">Pricing</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            We making pircing simple
          </h2>
          <div className="p-8 bg-white w-96 rounded-3xl mx-auto shadow-lg">
            <div className="flex gap-2 items-baseline mb-6">
              <div className="text-5xl font-black text-gray-900">$19</div>
              <div className="uppercase text-sm font-medium text-gray-500">
                /month
              </div>
            </div>
            <ul className="space-y-4 mb-6">
              {pricingFeatures.map((priceItem) => {
                return (
                  <li key={priceItem} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {priceItem}
                  </li>
                );
              })}
            </ul>
            <ButtonLogin session={session} extraStyle="w-full" />
          </div>
        </div>
      </section>
      {/* FAQ section */}
      <section className="bg-base-200" id="faq">
        <div className="py-32 p-8 max-w-3xl mx-auto">
          <p className="text-sm uppercase text-center mb-6 text-primary">FAQ</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <ul className="space-y-4 max-w-2xl mx-auto">
            {[
              {
                question: "What is the price of the product?",
                answer: "The price is $19 per month.",
              },
              {
                question: "Can I cancel anytime?",
                answer:
                  "Yes, you can cancel your subscription at any time with no penalties.",
              },
              {
                question: "What features are included?",
                answer:
                  "You get unlimited boards, customer feedback collection, admin dashboard, and 24/7 support.",
              },
              {
                question: "Do you offer refunds?",
                answer:
                  "We offer a 30-day money-back guarantee if you're not satisfied.",
              },
            ].map((qa) => {
              return (
                <FaqListener
                  key={qa.question}
                  question={qa.question}
                  answer={qa.answer}
                />
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
