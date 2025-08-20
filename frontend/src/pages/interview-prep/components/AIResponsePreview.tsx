import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const AIResponsePreview = ({ content }: { content: string }) => (
  <div className="max-w-4xl mx-auto px-2">
    <div className="prose prose-slate max-w-none">
      <ReactMarkDown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 my-3">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 my-3">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-bold mt-4 mb-1">{children}</h3>,
          h4: ({ children }) => <h4 className="text-base font-bold mt-3 mb-1">{children}</h4>,
          a: ({ children, href }) => (
            <a href={href} className="text-blue-600 underline" target="_blank" rel="noreferrer">
              {children}
            </a>
          ),
          table: ({ children }) => (
            <table className="w-full border-collapse border border-gray-300 my-4">{children}</table>
          ),
          thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr className="border-b border-gray-300">{children}</tr>,
          th: ({ children }) => <th className="border border-gray-300 px-3 py-1 text-left">{children}</th>,
          td: ({ children }) => <td className="border border-gray-300 px-3 py-1">{children}</td>,
          img: ({ src, alt }) => <img src={src} alt={alt} className="rounded my-2" />
        }}
      >
        {content}
      </ReactMarkDown>
    </div>
  </div>
)

export default AIResponsePreview