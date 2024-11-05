import { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'
import PlusIcon from '@icons/plus_icon.svg'

interface ContentSectionProps {
  title: string | undefined
  titleError: string | null
  content: string | undefined
  contentError: string | null
  onFormDataChange: (value: { image: File | null; title: string | undefined; content: string | undefined }) => void
}

export default function ContentSection({
  title,
  titleError,
  content,
  contentError,
  onFormDataChange,
}: ContentSectionProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
      onFormDataChange({ title, content, image: file })
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value
    onFormDataChange({ title: result, content, image: null })
  }

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const result = e.target.value
    onFormDataChange({ title, content: result, image: null })
  }

  return (
    <div className="pt-6">
      <h2 className="flex gap-1.5 text-[16px] font-medium leading-[19px] text-brand-white">
        <span className="text-brand-indigo">*</span>제목
      </h2>
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        className={`${titleError === null ? '' : 'border-red-500'} mt-6 w-full rounded-xl border-[1px] border-solid border-brand-black-light bg-brand-black-medium px-6 py-4 text-brand-white`}
        value={title}
        onChange={handleTitleChange}
      />
      {titleError && <p className="ml-4 mt-4 text-red-500">{titleError}</p>}
      <h2 className="mt-10 flex gap-1.5 text-[16px] font-medium leading-[19px] text-brand-white">
        <span className="text-brand-indigo">*</span>내용
      </h2>
      <div className="relative">
        <textarea
          placeholder="내용을 입력해주세요."
          className={`${contentError === null ? '' : 'border-red-500'} mt-6 h-[240px] w-full rounded-xl border-[1px] border-solid border-brand-black-light bg-brand-black-medium px-6 py-4 text-brand-white`}
          value={content}
          onChange={handleContentChange}
          maxLength={300}
        />
        <p className="absolute bottom-4 right-4 text-brand-white">{content?.length} / 300</p>
      </div>
      {contentError && <p className="ml-4 mt-4 text-red-500">{contentError}</p>}
      <h2 className="mt-10 flex gap-1.5 text-[16px] font-medium leading-[19px] text-brand-white">
        <span className="text-brand-indigo">*</span>이미지
      </h2>
      <div className="relative">
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        <button
          onClick={() => fileInputRef.current?.click()}
          type="button"
          className="mt-6 flex h-[240px] w-[240px] flex-col items-center justify-center gap-3 rounded-xl border-[1px] border-solid border-brand-black-light bg-brand-black-medium px-6 py-4 text-brand-gray-dark"
        >
          <Image src={PlusIcon} alt="이미지 등록" />
          이미지 등록
        </button>
        {imagePreview && (
          <div className="absolute bottom-0 h-[240px] w-[240px]">
            <Image
              src={imagePreview}
              alt="등록한 이미지"
              fill
              className="cursor-pointer rounded-xl"
              onClick={() => fileInputRef.current?.click()}
            />
          </div>
        )}
      </div>
    </div>
  )
}
