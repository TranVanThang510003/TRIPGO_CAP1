import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Chat = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [minimized, setMinimized] = useState(true); // Mặc định thu nhỏ
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const welcomeMessage = {
      sender: "bot",
      text: "Xin chào! Bạn muốn tôi hỗ trợ những gì?",
    };
    const popular = {
      sender: "bot",
      text: "Tour phố biến nhất",
      clickable: true,
    };
    const TypeTour = {
      sender: "bot",
      text: "Bạn có những loại tour nào?",
      clickable: true,
    };
    const bookingtour = {
      sender: "bot",
      text: "Tôi có thể đặt tour ngay được không",
      clickable: true,
    };
    const support = {
      sender: "bot",
      text: "Tư vấn tour thích hợp cho tôi",
      clickable: true,
    };

    setMessages([welcomeMessage, support, popular, TypeTour, bookingtour]);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleMinimized = () => {
    setMinimized(!minimized); // Đổi trạng thái thu nhỏ
  };

  const handleUserInput = async (input) => {
    if (input.toLowerCase().includes("tôi có thể đặt tour ngay được không")) {
      setLoading(true);
      try {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: (
              <a
                href="http://localhost:5173/tours"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline hover:text-blue-400"
              >
                Click vào đây để xem danh sách tour chi tiết để bạn đặt
              </a>
            ),
          },
        ]);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: "Lỗi khi lấy dữ liệu tour. Vui lòng thử lại.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    } else {
      fetchData(input);
    }
  };

  const fetchData = async (message) => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message,
      });
      const data = response.data;

      const sentences = data.response
        .split(". ")
        .filter((sentence) => sentence.trim() !== "");

      for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i].trim();
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: sentence + (i < sentences.length - 1 ? "." : ""),
          },
        ]);

        if (i < sentences.length - 1) {
          await new Promise((resolve) =>
            setTimeout(resolve, Math.floor(Math.random() * 1500))
          ); // Độ trễ 1,5 giây
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Error connecting to the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    await handleUserInput(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleClickableMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
    handleUserInput(text);
  };

  if (minimized) {
    return (
      <div
        onClick={toggleMinimized}
        className="fixed bottom-5 right-5 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
      >
        <img
          src="https://www.kindpng.com/picc/m/347-3479906_chatbot-icon-png-transparent-png.png"
          alt="Chatbot Icon"
          className="w-12 h-12 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 w-[400px] bg-white rounded-xl shadow-xl border border-gray-200">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 text-sm rounded-t-xl flex justify-between items-center">
        <span className="font-semibold">Hỗ trợ khách hàng</span>
        <button
          onClick={toggleMinimized}
          className="text-white hover:opacity-80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <div className="p-3 space-y-2 text-sm max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            <div className="flex items-center space-x-2">
              {message.sender === "bot" && (
                <img
                  src="https://www.kindpng.com/picc/m/347-3479906_chatbot-icon-png-transparent-png.png"
                  alt="Chatbot Icon"
                  className="w-6 h-6 rounded-full shadow-md cursor-pointer"
                  onClick={
                    message.clickable
                      ? () => handleClickableMessage(message.text)
                      : undefined
                  }
                />
              )}
              <div
                className={`p-[6px] rounded-lg shadow-md max-w-[90%] text-sm ${
                  message.sender === "bot"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white cursor-pointer"
                    : "bg-gray-100 text-gray-800"
                }`}
                onClick={
                  message.clickable
                    ? () => handleClickableMessage(message.text)
                    : undefined
                }
              >
                {typeof message.text === "string" ? message.text : message.text}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="p-2 rounded-lg bg-gray-200 text-gray-500 animate-pulse text-sm">
              Loading...
            </div>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="flex items-center p-2 border-t border-gray-300 bg-gray-50">
        <input
          type="text"
          className="flex-1 p-2 border text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tin nhắn..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white hover:opacity-90 transition-shadow shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14m-7-7l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;
