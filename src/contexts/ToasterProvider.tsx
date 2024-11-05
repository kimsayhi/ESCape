import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react'
import { Toast, ToastToggle } from 'flowbite-react'
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi'

type ToastType = 'success' | 'fail' | 'warn'

interface ToastComponentProps {
  type: ToastType
  message: string
  onClick: () => void
}

interface ToastItem {
  id: number
  type: ToastType
  message: string
}

const ICONS: Record<ToastType, React.ElementType> = {
  success: HiCheck,
  fail: HiExclamation,
  warn: HiX,
}

function ToastComponent({ type, message, onClick }: ToastComponentProps) {
  const Icon = ICONS[type]

  return (
    <Toast className="flex items-center">
      <button
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200"
        onClick={onClick}
      >
        <Icon className="h-5 w-5" />
      </button>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <ToastToggle onClick={onClick} />
    </Toast>
  )
}

interface ToasterContextType {
  toaster: (type: ToastType, message: string) => void
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined)

interface ToasterProviderProps {
  children: ReactNode
}

function ToasterProvider({ children }: ToasterProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  function addToast(type: ToastType, message: string): ToastItem {
    const newToast: ToastItem = {
      id: Date.now(),
      type,
      message,
    }

    setToasts(prevToasts => [...prevToasts, newToast])
    return newToast
  }

  function removeToast(id: number) {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
  }

  const toaster = useCallback((type: ToastType, message: string) => {
    const newToast = addToast(type, message)
    setTimeout(() => removeToast(newToast.id), 2000)
  }, [])

  const contextValue = useMemo(() => ({ toaster }), [toaster])

  return (
    <ToasterContext.Provider value={contextValue}>
      {children}
      <div className="fixed left-1/2 top-5 z-50 flex -translate-x-1/2 transform flex-col gap-4">
        {toasts.map(toast => (
          <ToastComponent
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClick={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToasterContext.Provider>
  )
}

export function useToaster() {
  const context = useContext(ToasterContext)
  if (!context) {
    throw new Error('ToasterContext 안에서만 사용할 수 있습니다.')
  }
  return context.toaster
}

export default ToasterProvider
