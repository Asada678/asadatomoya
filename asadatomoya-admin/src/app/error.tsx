"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h1>Error Page</h1>
      {/* <p>{error.message}</p> */}
      <button onClick={reset}>try again</button>
    </div>
  );
}
