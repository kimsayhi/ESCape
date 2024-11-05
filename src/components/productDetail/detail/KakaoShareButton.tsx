import React from 'react'
import { IoChatbubbleSharp } from 'react-icons/io5'
import { useToaster } from '@/contexts/ToasterProvider'

interface KakaoShareButtonProps {
  url: string
  title: string
  description: string
  imageUrl: string
}

const KakaoShareButton: React.FC<KakaoShareButtonProps> = ({ url, title, description, imageUrl }) => {
  const toaster = useToaster()
  const handleKakaoShare = () => {
    if (!window.Kakao.isInitialized()) {
      toaster('fail', '카카오톡 공유 기능이 초기화되지 않았습니다.')
      return
    }

    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    })
  }

  return (
    <button
      type="button"
      onClick={handleKakaoShare}
      className="flex items-center justify-center rounded-lg border-unactive bg-[#252530] p-2 text-[#6E6E82] hover:bg-[#252530] hover:text-white"
    >
      <IoChatbubbleSharp size={24} />
    </button>
  )
}

export default KakaoShareButton
