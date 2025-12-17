import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function PaymentSuccess() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="bg-base-200 min-h-screen flex items-center justify-center py-10 px-4">
      <section className="w-full max-w-2xl">
        <div className="bg-base-100 rounded-2xl p-8 shadow-sm border border-base-200 text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="rounded-full bg-success/20 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-success"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Payment Successful!</h1>
            <p className="text-base-content/70 text-lg">
              Thank you for your subscription. Your payment has been processed
              successfully.
            </p>
          </div>

          {/* Additional Info */}
          <div className="bg-base-200 rounded-xl p-4 text-left">
            <p className="text-sm text-base-content/70">
              <strong className="text-base-content">What's next?</strong>
            </p>
            <ul className="mt-2 space-y-1 text-sm text-base-content/70 list-disc list-inside">
              <li>Your subscription is now active</li>
              <li>You have access to all premium features</li>
              <li>A confirmation email has been sent to your inbox</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
            <Link href="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
