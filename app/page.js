import ButtonLogin from "./compondents/buttonlogin";

export default function Home() {
  const isLoggedIn = false;
  const name = "alex";

  const pricingFeatures = [
    "Collect customer feedback",
    "Unlimited boards",
    "Admin dashboard",
    "24/7 support",
  ];
  const greeting1 = `Hello ${isLoggedIn ? name : "there"}`;

  return (
    <main>
      <div className="bg-base-200">
        <section className="max-w-3xl mx-auto flex justify-between items-center px-8 py-2">
          <div className="font-bold ">ideaBox</div>
          <div className="space-x-4 text-red-500 max-md:hidden">
            <a className="link link-hover">Pricing</a>
            <a className="link link-hover"> FAQ</a>
          </div>
          <ButtonLogin isLoggedIn={isLoggedIn} />
        </section>
      </div>
      <section className="text-center py-32 p-8 max-w-3xl mx-auto">
        <div>
          <h1 className="text-5xl font-bold mb-6 text-gray-900 lg:text-6xl">
            {greeting1}
          </h1>
        </div>
        <div className="mb-6 text-lg text-gray-500">
          <h2>You can share your pain points directly with Alex</h2>
        </div>
        <div className="mt-8">
          <ButtonLogin isLoggedIn={isLoggedIn} />
        </div>
      </section>

      {/* pricing section */}
      <section className="bg-base-200 ">
        <div className="py-32 p-8 max-w-3xl mx-auto">
          <p className="text-center text-xl purple-500 color-primary mb-6 text-primary">
            Pricing
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabolded mb-12 text-center">
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
            <ButtonLogin isLoggedIn={true} name={name} extraStyle="w-full" />
          </div>
        </div>
      </section>
    </main>
  );
}
