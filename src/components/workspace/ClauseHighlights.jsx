import React from 'react';

export default function ClauseHighlights({ contentText, clauses }) {
  if (!contentText) return null;
  if (!clauses || clauses.length === 0) return <>{contentText}</>;

  // Filter out clauses that don't have an exact_quote, and sort by length descending
  // to avoid smaller quotes matching inside larger ones
  const validClauses = clauses
    .filter(c => c.exact_quote && c.exact_quote.trim().length > 0)
    .sort((a, b) => b.exact_quote.length - a.exact_quote.length);

  if (validClauses.length === 0) return <>{contentText}</>;

  let replacedText = contentText;
  const replacements = [];

  validClauses.forEach((clause) => {
    // Escape regex special chars
    const escapedQuote = clause.exact_quote.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuote})`, 'gi'); // Case-insensitive for better matching

    replacedText = replacedText.replace(regex, (match) => {
      // Avoid replacing inside an already replaced token
      if (match.startsWith('__HIGHLIGHT_')) return match;
      
      const token = `__HIGHLIGHT_${replacements.length}__`;
      replacements.push({ token, match, risk: clause.risk });
      return token;
    });
  });

  // Split text by tokens
  const parts = replacedText.split(/(__HIGHLIGHT_\d+__)/g);

  return (
    <>
      {parts.map((part, i) => {
        const replacement = replacements.find(r => r.token === part);
        if (replacement) {
          let bgColor = "bg-primary/20 text-foreground"; // Default
          const risk = replacement.risk?.toLowerCase();
          
          if (risk === "low") bgColor = "bg-risk-safe/20 text-foreground border border-risk-safe/30";
          else if (risk === "medium") bgColor = "bg-amber-500/20 text-foreground border border-amber-500/30";
          else if (risk === "high") bgColor = "bg-risk-high/20 text-foreground border border-risk-high/30";

          return (
            <mark 
              key={i} 
              className={`rounded-[3px] px-1 py-0.5 mx-0.5 font-medium transition-colors cursor-pointer hover:opacity-80 ${bgColor}`}
              title={`Risk: ${replacement.risk}`}
            >
              {replacement.match}
            </mark>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}
