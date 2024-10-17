import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import PlusIcon from "../../../public/icons/plus_icon.svg"

export default function ContentSection() {
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  }

  return (
    <div className="pt-6">
      <h2 className="flex gap-1.5 font-medium text-[16px] text-[#f1f1f5] leading-[19px]">
        <span className="text-[#5363ff]">*</span>제목
      </h2>
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        className="bg-[#252530] w-full rounded-xl border-[1px] border-solid border-[#353542] py-4 px-6 text-[#f1f1f5] mt-6"
      />
      <h2 className="flex gap-1.5 font-medium text-[16px] text-[#f1f1f5] leading-[19px] mt-10">
        <span className="text-[#5363ff]">*</span>내용
      </h2>
      <div className="relative">
        <textarea
          placeholder="내용을 입력해주세요."
          className="h-[240px] bg-[#252530] w-full rounded-xl border-[1px] border-solid border-[#353542] py-4 px-6 text-[#f1f1f5] mt-6"
          value={text}
          onChange={handleChange}
          maxLength={300}
        />
        <p className="absolute bottom-4 right-4 text-[#f1f1f5]">
          {text.length} / 300
        </p>
      </div>
      <h2 className="flex gap-1.5 font-medium text-[16px] text-[#f1f1f5] leading-[19px] mt-10">
        <span className="text-[#5363ff]">*</span>이미지
      </h2>
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <button onClick={handleImageClick} className="text-gray-400 flex justify-center items-center flex-col gap-3 w-[240px] h-[240px] bg-[#252530] rounded-xl border-[1px] border-solid border-[#353542] py-4 px-6 mt-6">
          <Image src={PlusIcon} alt="이미지 등록" />
          이미지 등록
        </button>
        {image && (
          <div className="absolute bottom-0">
            <Image src={image} alt="등록한 이미지" onClick={handleImageClick} width={240} height={240} className="rounded-xl cursor-pointer" style={{ width: '240px', height: '240px' }} />
          </div>
        )}
      </div>
    </div>
  );
}