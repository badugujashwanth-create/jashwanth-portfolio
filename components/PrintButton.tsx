"use client";

export function PrintButton() {
  return (
    <button className="button button-secondary print-button" type="button" onClick={() => window.print()}>
      Print recruiter view
    </button>
  );
}
