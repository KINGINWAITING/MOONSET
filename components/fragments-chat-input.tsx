"use client"

import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { SetStateAction, useEffect, useMemo, useState, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

export function FragmentsChatInput({
  isErrored,
  errorMessage,
  isLoading,
  isRateLimited,
  input,
  handleInputChange,
  handleSubmit,
  isMultiModal,
  files,
  handleFileChange,
}: {
  isErrored: boolean
  errorMessage: string
  isLoading: boolean
  isRateLimited: boolean
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isMultiModal: boolean
  files: File[]
  handleFileChange: (change: SetStateAction<File[]>) => void
}) {
  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    handleFileChange((prev) => {
      const newFiles = Array.from(e.target.files || [])
      return [...prev, ...newFiles]
    })
  }

  function handleFileRemove(file: File) {
    handleFileChange((prev) => prev.filter((f) => f !== file))
  }

  const [dragActive, setDragActive] = useState(false)

  function handleDrag(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/'),
    )

    if (droppedFiles.length > 0) {
      handleFileChange((prev) => {
        return [...prev, ...droppedFiles]
      })
    }
  }

  import { useRef } from 'react';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filePreview = useMemo(() => {
    if (files.length === 0) return null;
    return Array.from(files).map((file) => {
      if (file.type.startsWith('image/')) {
        return (
          <div className="relative" key={file.name}>
            <span
              onClick={() => handleFileRemove(file)}
              className="absolute top-[-8] right-[-8] bg-muted rounded-full p-1 cursor-pointer"
            >
              <X className="h-3 w-3" />
            </span>
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="rounded-xl w-10 h-10 object-cover"
            />
          </div>
        );
      }
      // For non-image files, show a chip with the file name and remove option
      return (
        <div key={file.name} className="relative flex items-center px-2 py-1 bg-muted rounded-lg text-xs mr-2">
          <span className="mr-1">{file.name}</span>
          <span
            onClick={() => handleFileRemove(file)}
            className="ml-1 bg-muted rounded-full p-1 cursor-pointer"
          >
            <X className="h-3 w-3" />
          </span>
        </div>
      );
    });
  }, [files]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-2 mt-auto flex flex-col bg-background"
      onDragEnter={isMultiModal ? handleDrag : undefined}
      onDragLeave={isMultiModal ? handleDrag : undefined}
      onDragOver={isMultiModal ? handleDrag : undefined}
      onDrop={isMultiModal ? handleDrop : undefined}
    >
      {isErrored && (
        <div
          className={`flex items-center p-1.5 text-sm font-medium mx-4 mb-2 rounded-xl ${
            isRateLimited
              ? 'bg-orange-400/10 text-orange-400'
              : 'bg-red-400/10 text-red-400'
          }`}
        >
          <span className="flex-1 px-1.5">{errorMessage}</span>
        </div>
      )}
      <div className="flex gap-2 items-end px-0 pb-2 bg-gradient-to-br from-background/90 to-muted/70 shadow-2xl ring-2 ring-blue-100/40 rounded-2xl transition-all duration-200">
        <TextareaAutosize
          value={input}
          onChange={handleInputChange}
          minRows={1}
          maxRows={6}
          className="flex-1 resize-none rounded-2xl border-none bg-transparent px-5 py-3 text-base shadow-none focus:outline-none focus:ring-0 focus:bg-white/60 transition-all duration-200"
          placeholder="Type your message..."
        />
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="*/*"
          className="hidden"
          tabIndex={-1}
          onChange={handleFileInput}
        />
        <button
          type="button"
          aria-label="Attach file"
          data-testid="attach-file-btn"
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.value = ""; // allow re-upload same file
              fileInputRef.current.click();
            } else {
              (document.querySelector('input[type="file"]') as HTMLInputElement | null)?.click();
            }
          }}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/60 hover:bg-white/80 transition-all duration-150 shadow text-muted-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m-3 0h13.5M4.5 9v10.5A2.25 2.25 0 006.75 21h10.5a2.25 2.25 0 002.25-2.25V9m-15 0h15" />
          </svg>
        </button>
        <Button
          type="submit"
          disabled={(!input.trim() && files.length === 0) || isLoading}
          className="rounded-2xl px-6 py-3 h-12 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 text-white font-bold shadow-lg transition-transform duration-150 hover:scale-105 hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-400"
        >
          Send
        </Button>
      </div>
      <div className="flex gap-2 px-4 pb-2">
        {filePreview}
      </div>
    </form>
  )
}
