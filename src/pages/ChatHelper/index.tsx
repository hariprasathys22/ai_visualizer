import { Button, IconButton, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { useQueryStore } from "../../store";
import DropDownComponent from "../../components/DropDown";
import { ServerConfig } from "../../utilities/baseConfig";
import ModalWindow from "../../components/ModalComponent";
import ChatName from "../../sections/ChatName";
import "./index.css";

const ChatHelper = () => {
  // Remove queryData and use conversation states instead.
  const [dropDownProject, setDropDownProject] = useState("");
  const [queryInput, setQueryInput] = useState("");
  const { fetchProject, projects } = useQueryStore();
  const [openAddDetails, setOpenAddDetails] = useState<boolean>(false);
  const [chatNames, setChatNames] = useState<any[]>([]);
  const [chatId, setChatId] = useState<string | number | null>(null);
  // For new chats: conversation stored in chatHistory
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  // For existing chats: conversation stored in chatDetails
  const [chatDetails, setChatDetails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleQueryChange = (e: any) => {
    setQueryInput(e.target.value);
  };

  const handleProjectChange = (event: any) => {
    setDropDownProject(event.target.value);
  };

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(
        `${ServerConfig.BASE_URL}api/collection/retrieveAllVectors/chatHistory`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setChatNames(data.result.points);
    } catch (e) {
      console.error(e, "error fetching chat history");
    }
  };

  // Fetch conversation details for an existing chat.
  const fetchSingleChatDetails = async (id: string | number) => {
    try {
      const response = await fetch(
        `${ServerConfig.BASE_URL}api/collection/chatHistory/queryResponse/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data, "data ");
      // Assume API returns an object with a chatHistory property that's an array.
      setChatDetails(data.chatHistory || []);
    } catch (e) {
      console.error(e, "error fetching chat details");
    }
  };

  const fetchQueryResponse = async () => {
    if (!queryInput.trim()) return;

    const queryText = queryInput;
    const timestamp = new Date().toISOString();

    // Append the query message to the appropriate conversation.
    if (chatId) {
      setChatDetails((prev: any[]) => [
        ...prev,
        { type: "query", text: queryText, timestamp }
      ]);
    } else {
      setChatHistory((prev: any[]) => [
        ...prev,
        { type: "query", text: queryText, timestamp }
      ]);
    }

    // Clear the text field immediately.
    setQueryInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${ServerConfig.BASE_URL}api/querytext/${dropDownProject}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: queryText, chatId })
        }
      );
      const data = await response.json();
      const responseTimestamp = new Date().toISOString();
      if (response.ok) {
        const responseText = data.message || "";
        if (chatId) {
          setChatDetails((prev: any[]) => [
            ...prev,
            {
              type: "response",
              text: responseText,
              timestamp: responseTimestamp
            }
          ]);
          // Optionally refresh conversation after a short delay.
          setTimeout(() => {
            fetchSingleChatDetails(chatId);
          }, 500);
        } else {
          setChatHistory((prev: any[]) => [
            ...prev,
            {
              type: "response",
              text: responseText,
              timestamp: responseTimestamp
            }
          ]);
        }
      }
    } catch (error) {
      console.error("Error fetching query response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    setOpenAddDetails(true);
  };

  const handleClose = () => {
    setOpenAddDetails(false);
  };

  // When a chat is clicked, update the chatId and load its conversation.
  const handleChatClick = async (chat: any) => {
    setChatId(chat.id);
    await fetchSingleChatDetails(chat.id);
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    console.log(chatNames, "chat names");
  }, [chatNames]);

  // Choose the conversation based on whether a chat is selected.
  const conversation = chatId ? chatDetails : chatHistory;
  const sortedConversation = [...conversation].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sortedConversation]);
  return (
    <div className="w-full h-full flex">
      {/* Sidebar with chat names */}
      <div className="w-1/4 bg-[#33333E] overflow-y-auto p-4">
        <div className="w-full">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm w-full cursor-pointer py-2.5 text-center mb-2"
            onClick={handleOpen}
          >
            New Chat
          </button>
        </div>
        <div className="w-full h-full overflow-y-auto mt-2">
          {chatNames &&
            chatNames.map((chat, index) => (
              <Button
                key={index}
                variant="contained"
                className="w-full mt-2"
                onClick={() => handleChatClick(chat)}
                sx={{
                  bgcolor: "#24252d",
                  color: "#ffffff",
                  marginBottom: "10px"
                }}
              >
                <span>{chat.payload.chatName}</span>
              </Button>
            ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="w-3/4 p-4 flex flex-col h-full">
        <div className="mb-4">
          <DropDownComponent
            handleChange={handleProjectChange}
            content={projects}
            value={dropDownProject}
            label="Select Project"
          />
        </div>

        {/* Messages container */}
        <div
          className="flex-1 overflow-y-auto mb-2"
          style={{ paddingBottom: "70px" }}
        >
          {sortedConversation.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.type === "query" ? "flex-end" : "flex-start",
                margin: "10px 0"
              }}
            >
              <div
                style={{
                  background: msg.type === "query" ? "#ef6a36" : "#24252d",
                  color: "#fff",
                  padding: "10px 15px",
                  borderRadius: "15px",
                  maxWidth: "70%",
                  wordBreak: "break-word"
                }}
              >
                <span>{msg.text}</span>
                <div
                  style={{
                    fontSize: "0.8em",
                    marginTop: "5px",
                    textAlign: "right"
                  }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                margin: "10px 0"
              }}
            >
              
                <div className="loader">
                  <span className="loader-text">thinking</span>
                  <span className="load"></span>
                </div>
              
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="w-full flex justify-center items-center gap-10 p-2 pb-8 px-6">
          <TextField
            size="medium"
            variant="outlined"
            placeholder="What information do you love to hear today?"
            value={queryInput}
            onChange={handleQueryChange}
            sx={{
              width: "90%",
              "& .MuiOutlinedInput-root": { borderRadius: "40px" }
            }}
          />
          <IconButton
            sx={{
              width: "56px",
              height: "56px",
              backgroundColor: "#ef6a36",
              "&:hover": { backgroundColor: "#24252d" }
            }}
            onClick={fetchQueryResponse}
          >
            <GoArrowRight style={{ fontSize: "50px", color: "#ffffff" }} />
          </IconButton>
        </div>
      </div>

      <ModalWindow open={openAddDetails} onClose={handleClose}>
        <ChatName
          setOpenAddDetails={setOpenAddDetails}
          fetchChatHistory={fetchChatHistory}
        />
      </ModalWindow>
    </div>
  );
};

export default ChatHelper;
