"use client";

const FormNewBoard = ({ createBoard }) => {
  return (
    <div className="bg-base-100 p-8 rounded-2xl space-y-6 shadow-sm border border-base-200">
      <p className="font-semibold text-lg">Create a new board</p>
      <p className="text-sm text-base-content/70">
        Give your board a clear name so you can find it later.
      </p>
      <fieldset className="fieldset">
        <legend className="fieldset-legend text-sm font-medium">
          Board name
        </legend>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="e.g. Customer Feedback"
        />
      </fieldset>
      <button className="btn btn-primary w-full mt-2" type="submit">
        Create board
      </button>
    </div>
  );
};

export default FormNewBoard;
