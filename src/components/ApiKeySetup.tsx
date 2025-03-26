import React, { useState } from 'react';
import { Key, ExternalLink } from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';

const ApiKeySetup = () => {
  const { apiKey, setApiKey } = useWeatherStore();
  const [isOpen, setIsOpen] = useState(!apiKey);
  const [inputKey, setInputKey] = useState(apiKey);

  const handleSave = () => {
    setApiKey(inputKey);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:absolute md:right-0 md:top-0 w-full md:w-auto flex items-center justify-center md:justify-start gap-2 px-3 py-1.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-white text-sm transition-colors"
      >
        <Key className="w-4 h-4" />
        {apiKey ? '變更 API 金鑰' : '設定 API 金鑰'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <Key className="w-6 h-6" />
                設定 API 金鑰
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="apiKey" className="block text-gray-700 mb-2">
                    請輸入您的 WeatherAPI.com API 金鑰
                  </label>
                  <input
                    type="text"
                    id="apiKey"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="您的 API 金鑰"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>還沒有 API 金鑰？</span>
                  <a
                    href="https://www.weatherapi.com/signup.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    免費註冊取得
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                disabled={!inputKey}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApiKeySetup;