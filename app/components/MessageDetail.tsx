"use client"

interface MessageDetailProps {
  message: {
    id: number
    title: string
    content: string
    is_read: boolean
    created_at: string
  }
  onBack: () => void
  onDelete: () => void
  isDeleting: boolean
}

export default function MessageDetail({ message, onBack, onDelete, isDeleting }: MessageDetailProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          返回
        </button>
        <button
          onClick={onDelete}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          disabled={isDeleting}
        >
          {isDeleting ? "删除中..." : "删除消息"}
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-2">{message.title}</h1>

      <p className="text-sm text-gray-500 mb-6">
        {new Date(message.created_at).toLocaleString("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <div className="prose max-w-none">
        <p className="whitespace-pre-line">{message.content}</p>
      </div>
    </div>
  )
}
