"use client";

import { useState } from "react";
const FormNewBoard = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (isLoading) {
      return;
    }
    try {
      const response = await fetch("/api/board", {
        method: "POST",
        body: JSON.stringify({
          name: name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setName(""); // Clear the form
        // Auto-hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        console.error("Failed to create board:", data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="bg-base-100 p-8 rounded-2xl space-y-6 shadow-sm border border-base-200"
      onSubmit={handleSubmit}
    >
      <p className="font-semibold text-lg">Create a new board</p>
      <p className="text-sm  text-base-content/70">
        Give your board a clear name so you can find it later.
      </p>
      {success && (
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Board created successfully!</span>
        </div>
      )}
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-sm font-medium">
          Board name
        </legend>
        <input
          required
          type="text"
          className="input input-bordered w-full"
          placeholder="e.g.  Feedback"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </fieldset>
      <button
        className="btn btn-primary w-full mt-2"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create board"}
      </button>
    </form>
  );
};

export default FormNewBoard;
