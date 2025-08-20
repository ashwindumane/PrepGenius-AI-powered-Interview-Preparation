
import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const AIResponsePreview = ({ content }: { content: string }) => {
    return (
        <div className='max-w-4xl mx-auto'>
            <div className='text-md prose prose-slate dark:prose-invert max-w-none'>
                <ReactMarkDown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        p({ children }) {
                            return <p className='mb-4 leading-5'>{children}</p>
                        },
                        strong({ children }) {
                            return <strong>{children}</strong>
                        },
                        em({ children }) {
                            return <em>{children}</em>
                        },
                        ul({ children }) {
                            return <ul className='list-disc pl-6 space-y-2 my-4'>{children}</ul>
                        },
                        ol({ children }) {
                            return <ol className='list-decimal pl-6 space-y-2 my-4'>{children}</ol>
                        },
                        li({ children }) {
                            return <li className='mb-1'>{children}</li>
                        },
                        // blackquote({children}) {
                        //     return <blackquote>{children}3</blackquote>
                        // },
                        h1({ children }) {
                            return <h1 className='text-2xl font-bold mt-6 mb-4'>{children}</h1>
                        },
                        h2({ children }) {
                            return <h2 className='text-xl font-bold mt-6 mb-3'>{children}</h2>
                        },
                        h3({ children }) {
                            return <h3 className='text-lg font-bold mt-6 mb-2'>{children}</h3>
                        },
                        h4({ children }) {
                            return <h4 className='text-md font-bold mt-6 mb-1'>{children}</h4>
                        },
                        a({ children }) {
                            return <a>{children}</a>
                        },
                        table({ children }) {
                            return <table>{children}</table>
                        },
                        thead({ children }) {
                            return <thead>{children}</thead>
                        },
                        tbody({ children }) {
                            return <tbody>{children}</tbody>
                        },
                        tr({ children }) {
                            return <tr>{children}</tr>
                        },
                        th({ children }) {
                            return <th>{children}</th>
                        },
                        img({ src, alt }) {
                            return <img src={src} alt={alt}></img>
                        },


                    }}
                >
                    {content}
                </ReactMarkDown>

            </div></div>
    )
}

export default AIResponsePreview