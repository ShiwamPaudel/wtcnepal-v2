type RichTextProps = {
  content: string;
  className?: string;
};

function renderInlineFormatting(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={`${part}-${index}`}>{part.slice(1, -1)}</em>;
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export function RichText({ content, className = '' }: RichTextProps) {
  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className={className}>
      {blocks.map((block, blockIndex) => {
        const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
        const isList = lines.length > 0 && lines.every((line) => line.startsWith('- '));

        if (isList) {
          return (
            <ul key={`${blockIndex}-${block}`} className="my-4 list-disc space-y-2 pl-5">
              {lines.map((line, lineIndex) => (
                <li key={`${lineIndex}-${line}`}>{renderInlineFormatting(line.slice(2))}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`${blockIndex}-${block}`} className="my-4">
            {lines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {index > 0 && <br />}
                {renderInlineFormatting(line)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
