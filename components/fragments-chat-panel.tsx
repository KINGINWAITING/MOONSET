"use client"

import { useState } from "react"
import { FragmentsChat } from "@/components/fragments-chat"

// Extend FragmentsChat prop types to include artifactMessageToArtifactIdx
export interface FragmentsChatPanelProps {
  artifactMessageToArtifactIdx?: Record<number, number>;
}

import { ChatInput } from "../../fragments/components/chat-input"
import { ChatPicker } from "../../fragments/components/chat-picker"
import { ChatSettings } from "../../fragments/components/chat-settings"
import modelsList from "../../fragments/lib/models.json"
import templates from "../../fragments/lib/templates"
import { ArtifactPreview } from "@/components/artifact-preview"

import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function FragmentsChatPanel() {
  const [chatInput, setChatInput] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [languageModel, setLanguageModel] = useState(modelsList.models[0])
  const [selectedTemplate, setSelectedTemplate] = useState("auto")
  const [messages, setMessages] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("moonset_chat_messages")
      const parsed = saved ? JSON.parse(saved) : [];
      console.log('Loaded messages from localStorage:', parsed);
      return parsed;
    }
    return [];
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [activeArtifactIndex, setActiveArtifactIndex] = useState<number | null>(null)

  // Persist messages to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("moonset_chat_messages", JSON.stringify(messages))
      console.log('Saved messages to localStorage:', messages);
    }
  }, [messages])

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setChatInput(e.target.value)
  }

  function handleFileChange(change: any) {
    setFiles(typeof change === "function" ? change(files) : change)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!chatInput.trim() && files.length === 0) return;
    setIsLoading(true);
    // Prepare user message with attachments
    setMessages(prev => [
      ...prev,
      {
        role: "user",
        content: [
          ...(chatInput.trim() ? [{ type: "text", text: chatInput }] : []),
          ...files.map((file) => ({ type: "file", name: file.name, url: URL.createObjectURL(file), mime: file.type }))
        ]
      }
    ]);
    try {
      let response, data;
      if (files.length > 0) {
        // Use multipart/form-data for file upload
        const formData = new FormData();
        formData.append("prompt", chatInput);
        files.forEach((file, idx) => formData.append(`file${idx}`, file));
        response = await fetch("/api/openai", {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch("/api/openai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: chatInput }),
        });
      }
      data = await response.json();
      if (!response.ok) throw new Error(data.error || "OpenAI API error");
      if (data.text && data.text.length > 10) {
        setMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: [
              { type: "text", text: "[Full response available in Artifacts/Preview window →]" }
            ],
            artifact: { content: data.text }
          }
        ]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: [{ type: "text", text: data.text }] }]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch response from Gemini API.");
    } finally {
      setIsLoading(false);
      setChatInput("");
      setFiles([]);
    }
  }

  return (
    <div className="w-full max-w-none h-[65vh] flex flex-col md:flex-row gap-8 bg-white/70 dark:bg-neutral-950 rounded-3xl border border-blue-100/30 dark:border-blue-800/60 shadow-xl dark:shadow-blue-900/30 p-4 md:p-10 my-8 backdrop-blur-2xl relative overflow-hidden">
  <div className="absolute inset-0 pointer-events-none z-0">
    {/* Glossy overlay for 3D glassmorphism effect */}
    <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/40 via-white/10 to-transparent dark:from-blue-200/10 dark:via-blue-300/5 dark:to-transparent rounded-t-3xl" />
    <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-white/10 via-white/0 to-transparent dark:from-blue-400/5 dark:to-transparent rounded-b-3xl" />
  </div>

      <button
        className="absolute left-4 top-4 z-10 px-3 py-1 rounded-full text-xs font-medium text-muted-foreground dark:text-neutral-400 bg-transparent border border-transparent hover:bg-neutral-200/20 dark:hover:bg-neutral-800/40 transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-blue-300"

        onClick={() => {
          setMessages([]);
          setActiveArtifactIndex(null);
          if (typeof window !== "undefined") {
            localStorage.removeItem("moonset_chat_messages");
            console.log('Cleared chat from localStorage');
          }
        }}
      >
        Clear
      </button>
      <div className={`grid gap-0 h-full ${activeArtifactIndex !== null ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} w-full flex-1`}>
        {/* Chat area */}
        <div className={`flex flex-col bg-white/80 dark:bg-neutral-900 rounded-2xl shadow-md dark:shadow-blue-900/30 border border-blue-100/30 dark:border-blue-800/60 p-4 md:p-8 mb-2 relative overflow-hidden w-full h-full flex-1 ${activeArtifactIndex !== null ? 'md:col-span-1 border-r border-blue-100/10 dark:border-blue-800/30' : ''}`}> 
  <div className="absolute inset-0 pointer-events-none z-0"></div>
          <div className="flex-1 overflow-y-auto pb-4">
            {messages.map((message, idx) => {
              const isUser = message.role === 'user';
              const hasIntelligence = message.content.some((content: any) =>
                content.type === 'text' &&
                content.text &&
                content.text.startsWith('[Full response available in Artifacts/Preview window') &&
                message.artifact
              );
              return (
                <div
                  key={idx}
                  className={`flex w-full my-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`relative flex flex-col max-w-[80%] px-5 py-3 rounded-2xl shadow-sm border border-blue-50/30 backdrop-blur-sm bg-gradient-to-br ${isUser ? 'from-blue-50 to-white dark:from-blue-900/20 dark:to-blue-800/10 items-end' : 'from-gray-50 to-blue-50/40 dark:from-blue-950/40 dark:to-blue-900/10 items-start'} gap-1`}
                    style={{minWidth: '48px'}}
                  >
                    <div className="w-full">
                      {message.content.map((content: any, cid: number) => {
                        if (
                          content.type === 'text' &&
                          content.text &&
                          content.text.startsWith('[Full response available in Artifacts/Preview window') &&
                          message.artifact
                        ) {
                          return null;
                        }
                        if (content.type === 'file') {
                          // Show image thumbnail or file icon/link
                          return (
                            <span key={cid} className="block mt-2">
                              {content.mime && content.mime.startsWith('image/') ? (
                                <img src={content.url} alt={content.name} className="rounded-lg max-w-[120px] max-h-[120px] border border-blue-100/30 dark:border-blue-800/60" />
                              ) : (
                                <a href={content.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline flex items-center gap-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m-3 0h13.5M4.5 9v10.5A2.25 2.25 0 006.75 21h10.5a2.25 2.25 0 002.25-2.25V9m-15 0h15" /></svg>
                                  {content.name}
                                </a>
                              )}
                            </span>
                          );
                        }
                        return (
                          <span
                            key={cid}
                            className={`block my-0.5 px-1 text-[0.82rem] leading-relaxed font-sans tracking-wide ${isUser ? 'text-blue-700 dark:text-blue-200 font-semibold' : 'text-blue-900 dark:text-blue-200 italic font-light'} drop-shadow-sm`}
                            style={{letterSpacing: '0.01em', fontFamily: 'Quicksand, Nunito, Inter, sans-serif'}}
                          >
                            {content.text}
                          </span>
                        );
                      })}
                    </div>
                    {hasIntelligence && (
                      <div className="flex justify-end w-full pt-4">
                        <button
                          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg font-medium shadow-sm text-blue-700 bg-gradient-to-r from-blue-100 via-blue-50 to-gray-100 hover:from-blue-200 hover:to-gray-200 transition-all duration-150 border border-blue-100 outline-none focus:ring-1 focus:ring-blue-200 ring-offset-1 text-sm ${activeArtifactIndex === idx ? 'scale-105 shadow-md bg-blue-50' : ''}`}
                          style={{letterSpacing: '0.01em', boxShadow: '0 1px 4px 0 rgba(80,110,170,0.07)', fontSize: '0.85rem'}}
                          onClick={() => setActiveArtifactIndex(activeArtifactIndex === idx ? null : idx)}
                        >
                          Intelligence
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 12H6.75m6 6 6-6-6-6" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="sticky bottom-0 bg-transparent pt-2 z-10">
            <ChatInput
              retry={() => {}}
              isErrored={!!error}
              errorMessage={error || ""}
              isLoading={isLoading}
              isRateLimited={isRateLimited}
              stop={() => {}}
              input={chatInput}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isMultiModal={false}
              files={files}
              handleFileChange={handleFileChange}
            >
              <ChatPicker
                templates={templates}
                selectedTemplate={selectedTemplate}
                onSelectedTemplateChange={setSelectedTemplate}
                models={modelsList.models}
                languageModel={languageModel}
                onLanguageModelChange={setLanguageModel}
              />
              <ChatSettings
                languageModel={languageModel}
                onLanguageModelChange={setLanguageModel}
                apiKeyConfigurable={true}
                baseURLConfigurable={true}
              />
            </ChatInput>
          </div>
        </div>
        {/* Artifacts/Preview panel */}
        <AnimatePresence>
          {activeArtifactIndex !== null && messages[activeArtifactIndex] && messages[activeArtifactIndex].artifact && (
            <motion.div
              key="artifact-panel"
              initial={{ opacity: 0, x: 64, width: 0 }}
              animate={{ opacity: 1, x: 0, width: '100%' }}
              transition={{ type: 'spring', stiffness: 220, damping: 28, duration: 0.35 }}
              className="flex flex-col h-full w-full rounded-2xl bg-white/95 dark:bg-neutral-900 shadow-lg dark:shadow-blue-900/30 border border-blue-100/30 dark:border-blue-800/60 items-center justify-start p-6 md:p-10 mt-6 md:mt-0 overflow-y-auto md:col-span-1 relative"
              style={{ minWidth: 0 }}
            >
              <div className="absolute inset-0 pointer-events-none z-0"></div>
              <div className="w-full text-sm z-10 text-blue-900 dark:text-blue-100">
                <ArtifactPreview content={messages[activeArtifactIndex].artifact.content} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

