"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function WebhookClientExample() {
  const [code, setCode] = useState(` // 使用 fetch API 发送 webhook 请求的示例
const sendWebhook = async () => {
  try {
    const response = await fetch('https://your-website.com/api/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'user123',
        title: '订单通知',
        message: '您的订单 #12345 已发货，预计3-5天送达。'
      }),
    });
    
    const data = await response.json();
    console.log('Webhook response:', data);
    
    if (response.ok) {
      console.log('Message sent successfully!');
    } else {
      console.error('Failed to send message:', data.error);
    }
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
};

// 调用函数发送 webhook
sendWebhook();`);

  const router = useRouter()

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Webhook 客户端示例</h1>

      <div className="mb-6">
        <p className="text-gray-700 mb-4">
          以下是如何从外部系统调用 webhook 的代码示例。您可以将此代码集成到您的应用程序中，以便向用户发送消息。
        </p>

        <button onClick={() => router.push("/webhook")} className="text-blue-600 hover:text-blue-800 underline mb-4">
          返回 Webhook 测试页面
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">JavaScript / TypeScript 示例</h2>

        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <pre className="overflow-auto text-sm">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">其他语言示例</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-md font-medium mb-2">Python</h3>
            <pre className="bg-gray-800 text-white p-3 rounded-lg text-xs overflow-auto">
              {`import requests

def send_webhook():
    url = 'https://your-website.com/api/webhook'
    payload = {
        'username': 'user123',
        'title': '订单通知',
        'message': '您的订单 #12345 已发货，预计3-5天送达。'
    }
    
    try:
        response = requests.post(url, json=payload)
        data = response.json()
        
        if response.status_code == 200:
            print('Message sent successfully!')
        else:
            print(f'Failed to send message: {data.get("error")}')
    except Exception as e:
        print(f'Error sending webhook: {e}')

# 调用函数发送 webhook
send_webhook()`}
            </pre>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-md font-medium mb-2">PHP</h3>
            <pre className="bg-gray-800 text-white p-3 rounded-lg text-xs overflow-auto">
              {`<?php
function sendWebhook() {
    $url = 'https://your-website.com/api/webhook';
    $payload = array(
        'username' => 'user123',
        'title' => '订单通知',
        'message' => '您的订单 #12345 已发货，预计3-5天送达。'
    );
    
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($payload)
        )
    );
    
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    if ($result === FALSE) {
        echo "Error sending webhook";
    } else {
        $data = json_decode($result, true);
        if (isset($data['success']) && $data['success']) {
            echo "Message sent successfully!";
        } else {
            echo "Failed to send message: " . $data['error'];
        }
    }
}

// 调用函数发送 webhook
sendWebhook();
?>`}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">集成建议</h2>

        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            确保您的 webhook 请求包含所有必需的字段：<code className="bg-gray-200 px-1 rounded">username</code> 和{" "}
            <code className="bg-gray-200 px-1 rounded">message</code>。
          </li>
          <li>考虑在生产环境中添加身份验证机制，例如 API 密钥或令牌。</li>
          <li>实现重试机制，以处理临时网络故障或服务器错误。</li>
          <li>记录所有 webhook 调用，以便于调试和审计。</li>
          <li>考虑实现 webhook 事件的队列处理，以提高系统的可靠性和性能。</li>
        </ul>
      </div>
    </div>
  )
}
