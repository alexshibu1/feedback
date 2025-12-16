"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ButtonDeleteBoard = ({ boardid }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/board?boardid=${boardid}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to dashboard after successful deletion
        router.push("/dashboard");
      } else {
        alert(data.message || "Failed to delete board");
        setIsLoading(false);
        setShowConfirm(false);
      }
    } catch (error) {
      console.error("Error deleting board:", error);
      alert("An error occurred while deleting the board");
      setIsLoading(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex gap-2 items-center">
        <span className="text-sm text-base-content/70">Are you sure?</span>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="btn btn-error btn-sm"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Yes, Delete"
          )}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isLoading}
          className="btn btn-ghost btn-sm"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="btn btn-error btn-outline btn-sm gap-2"
    >
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
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      Delete Board
    </button>
  );
};

export default ButtonDeleteBoard;
