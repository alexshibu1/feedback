"use client";

import { useState } from "react";

const CardBoardLink = ({ boardid }) => {
  const [copied, setCopied] = useState(false);

  // Automatically use the current site's origin
  // This works for localhost:3000, ideafeed-alex.vercel.app, feedback.alexshibu.com, etc.
  const boardLink = `${window.location.origin}/b/${boardid}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(boardLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Share Your Board</h3>
        <p className="text-sm text-base-content/70 mb-4">
          Copy the link to share your feedback board
        </p>
      </div>

      {/* Link display and copy */}
      <div className="flex gap-2">
        <input
          type="text"
          value={boardLink}
          readOnly
          className="input input-bordered flex-1 text-sm"
        />
        <button
          onClick={copyToClipboard}
          className={`btn ${copied ? "btn-success" : "btn-primary"}`}
        >
          {copied ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CardBoardLink;
