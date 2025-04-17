import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function ArtifactPreview({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral max-w-none text-[0.85rem] leading-relaxed bg-transparent p-0 rounded-none shadow-none font-sans tracking-wide text-blue-900 dark:text-blue-200" style={{fontFamily: 'Quicksand, Nunito, Inter, sans-serif', letterSpacing: '0.012em'}}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 className="font-semibold text-xl mt-0 mb-2 border-b pb-1 text-blue-900 dark:text-blue-100" style={{fontWeight: 500, letterSpacing: '0.01em'}} {...props} />,
          h2: ({node, ...props}) => <h2 className="font-semibold text-lg mt-4 mb-1 border-b pb-1 text-blue-900 dark:text-blue-100" style={{fontWeight: 500, letterSpacing: '0.01em'}} {...props} />,
          h3: ({node, ...props}) => <h3 className="font-medium text-base mt-3 mb-1 text-blue-900 dark:text-blue-100" style={{fontWeight: 500, letterSpacing: '0.01em'}} {...props} />,
          p: ({node, ...props}) => <p className="my-2 leading-relaxed text-[0.85rem] font-light italic text-blue-900 dark:text-blue-200" style={{fontFamily: 'Quicksand, Nunito, Inter, sans-serif', letterSpacing: '0.012em'}} {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc ml-8 my-4 space-y-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal ml-8 my-4 space-y-2" {...props} />,
          li: ({node, ...props}) => <li className="mb-1 text-[0.85rem] font-light italic text-blue-900 dark:text-blue-200" style={{fontFamily: 'Quicksand, Nunito, Inter, sans-serif', letterSpacing: '0.012em'}} {...props} />,
          strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 pl-4 italic text-muted-foreground my-4" {...props} />,
          code: ({node, ...props}) => <code className="bg-muted text-sm px-1 rounded" {...props} />,
          pre: ({node, ...props}) => <pre className="bg-muted p-4 rounded my-4 overflow-x-auto" {...props} />,
          table: ({node, ...props}) => <table className="w-full my-6 border" {...props} />,
          th: ({node, ...props}) => <th className="border px-2 py-1 bg-muted font-semibold" {...props} />,
          td: ({node, ...props}) => <td className="border px-2 py-1" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
