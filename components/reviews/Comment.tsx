"use client";
import { useState } from "react";
import { Button } from "../ui/button";

const staticText = `This is Sitecore's default approach. The problem with this approach is, that if if you add body_2col to the same page more than once, this model has a problem. `;

function Comment({ text }: { text: string }) {
  const [showMoreText, setShowMoreText] = useState(false);

  const textLen = showMoreText ? staticText : staticText.slice(0, 110);
  return (
    <>
      <p className="text-sm">{textLen}</p>
      <button
        className="text-muted-foreground hover:underline"
        onClick={() => setShowMoreText((prev) => !prev)}
      >
        {!showMoreText ? "Show More" : "Show Less"}
      </button>
    </>
  );
}

export default Comment;
