import { LoaderIcon, Terminal } from 'lucide-react'
import { useEffect } from 'react'

export interface FragmentMessage {
  role: 'user' | string
  content: Array<{ type: 'text' | 'image'; text?: string; image?: string }>
  object?: any
  result?: any
}

export function FragmentsChat({
  messages,
  isLoading,
  setCurrentPreview,
  onArtifactClick,
  activeArtifactIndex,
  artifactMessageToArtifactIdx,
}: {
  messages: FragmentMessage[]
  isLoading: boolean
  setCurrentPreview: (preview: { fragment: any; result: any }) => void
  onArtifactClick?: (index: number) => void
  activeArtifactIndex?: number
  artifactMessageToArtifactIdx?: Record<number, number>
}) {
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [JSON.stringify(messages)])

  return (
    <div
      id="chat-container"
      className="flex flex-col pb-12 gap-2 overflow-y-auto max-h-full"
    >
      {messages.map((message, index) => (
        <div
          className={`flex flex-col px-4 shadow-sm whitespace-pre-wrap ${
            message.role !== 'user'
              ? 'bg-accent dark:bg-white/5 border text-accent-foreground dark:text-muted-foreground py-4 rounded-2xl gap-4 w-full'
              : 'bg-gradient-to-b from-black/5 to-black/10 dark:from-black/30 dark:to-black/50 py-2 rounded-xl gap-2 w-fit'
          } font-sans tracking-normal`}
          style={{fontFamily: 'Quicksand, Nunito, Inter, sans-serif'}}
          key={index}
        >
          {message.content.map((content, id) => {
            if (content.type === 'text') {
              // Detect artifact preview link
              if (content.text && content.text.startsWith('[Full response available in Artifacts/Preview window')) {
                const artifactIdx = artifactMessageToArtifactIdx?.[index];
                console.log('Button rendered', index, artifactIdx, typeof onArtifactClick);
                return (
                  <button
                    key={id}
                    className={`text-blue-600 underline font-semibold cursor-pointer transition hover:text-blue-800 rounded px-1 py-0.5 ${typeof activeArtifactIndex !== 'undefined' && artifactIdx === activeArtifactIndex ? 'bg-blue-50' : ''}`}
                    onClick={() => artifactIdx !== undefined && onArtifactClick?.(artifactIdx)}
                  >
                    {content.text.replace('[', '').replace(']', '')}
                  </button>
                )
              }
              return <span key={id}>{content.text}</span>
            }
            if (content.type === 'image') {
              return (
                <img
                  key={id}
                  src={content.image}
                  alt="fragment"
                  className="mr-2 inline-block w-12 h-12 object-cover rounded-lg bg-white mb-2"
                />
              )
            }
            return null
          })}
          {message.object && (
            <div
              onClick={() =>
                setCurrentPreview({
                  fragment: message.object,
                  result: message.result,
                })
              }
              className="py-2 pl-2 w-full md:w-max flex items-center border rounded-xl select-none hover:bg-white dark:hover:bg-white/5 hover:cursor-pointer"
            >
              <div className="rounded-[0.5rem] w-10 h-10 bg-black/5 dark:bg-white/5 self-stretch flex items-center justify-center">
                <Terminal strokeWidth={2} className="text-[#FF8800]" />
              </div>
              <div className="pl-2 pr-4 flex flex-col">
                <span className="font-bold font-sans text-sm text-primary">
                  {message.object.title}
                </span>
                <span className="font-sans text-sm text-muted-foreground">
                  Click to see fragment
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <LoaderIcon strokeWidth={2} className="animate-spin w-4 h-4" />
          <span>Generating...</span>
        </div>
      )}
    </div>
  )
}
