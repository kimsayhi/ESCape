import React from 'react'
import Modal from '../@shared/modal/Modal'
import CustomButton from '../@shared/ui/CustomButton'

interface ConfirmModalProps {
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({ title, description, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <Modal onClick={onCancel} modalFrameClassNames="w-[40%] max-w-md">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="mt-4 text-lg text-gray-300">{description}</p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <CustomButton type="button" active styleType="primary" onClick={onConfirm}>
            확인
          </CustomButton>
          <CustomButton type="button" active styleType="secondary" onClick={onCancel}>
            취소
          </CustomButton>
        </div>
      </div>
    </Modal>
  )
}
