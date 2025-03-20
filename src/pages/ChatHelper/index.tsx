import { Button, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { useQueryStore } from "../../store";
import DropDownComponent from "../../components/DropDown";
import { ServerConfig } from "../../utilities/baseConfig";
import ModalWindow from "../../components/ModalComponent";
import ChatName from "../../sections/ChatName";

const ChatHelper = () => {
  const [dropDownProject, setDropDownProject] = useState("");
  const [queryInput, setQueryInput] = useState("");
  // State for new chat messages when no chatId is selected
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  // State for storing messages for a selected chat conversation
  const [chatDetails, setChatDetails] = useState<any[]>([]);
  const { fetchProject, projects } = useQueryStore();
  const [openAddDetails, setOpenAddDetails] = useState<boolean>(false);
  const [chatNames, setChatNames] = useState<any[]>([]);
  const [chatId, setChatId] = useState<string | number | undefined>(undefined);
  // Loading state to show "Thinking..." while waiting for the API response
  const [isLoading, setIsLoading] = useState(false);

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
          headers: {
            "Content-Type": "application/json",
          },
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

  // Fetch the details for a specific chat conversation based on chatId
  const fetchSingleChatDetails = async (id: string | number) => {
    try {
      const response = await fetch(
        `${ServerConfig.BASE_URL}api/collection/chatHistory/queryResponse/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Assume the API returns an object with a chatHistory property that is an array.
      setChatDetails(data.chatHistory);
    } catch (e) {
      console.error(e, "error fetching single chat details");
    }
  };

  const fetchQueryResponse = async () => {
    if (!queryInput.trim()) return;

    // Save current query text locally before clearing the text field
    const queryText = queryInput;
    const queryTimestamp = new Date().toISOString();

    // Update conversation with the query text
    if (chatId) {
      setChatDetails((prev) => [
        ...prev,
        { type: "query", text: queryText, timestamp: queryTimestamp },
      ]);
    } else {
      setChatHistory((prev) => [
        ...prev,
        { type: "query", text: queryText, timestamp: queryTimestamp },
      ]);
    }

    // Clear the text field
    setQueryInput("");

    // Show loading indicator ("Thinking...")
    setIsLoading(true);

    try {
      const response = await fetch(
        `${ServerConfig.BASE_URL}api/querytext/${dropDownProject}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: queryText, chatId: chatId }),
        }
      );
      const data = await response.json();
      const responseTimestamp = new Date().toISOString();
      if (response.ok) {
        // Log the response to verify the structure
        console.log("API response:", data);
        // If data.message is undefined, fallback to an empty string (or a default text)
        const responseText = data.message || "";
        if (chatId) {
          setChatDetails((prev) => [
            ...prev,
            { type: "response", text: responseText, timestamp: responseTimestamp },
          ]);
        } else {
          setChatHistory((prev) => [
            ...prev,
            { type: "response", text: responseText, timestamp: responseTimestamp },
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

  // When a chat is clicked, update the chatId and fetch its conversation details.
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

  // Determine which conversation to render:
  // If a chatId is selected, use chatDetails; otherwise, use chatHistory.
  const conversation = chatId ? chatDetails : chatHistory;
  // Sort the conversation based on timestamp
  const sortedConversation = [...conversation].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="w-full h-full flex">
      {/* Sidebar with chat names */}
      <div className="w-1/4 bg-[#33333E] overflow-y-auto p-4">
        <div className="w-full">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm w-full cursor-pointer py-2.5 text-center me-2 mb-2"
            onClick={handleOpen}
          >
            New Chat
          </button>
        </div>
        <div className="w-full h-full overflow-y-auto">
          {chatNames &&
            chatNames.map((chat, index) => (
              <Button
                key={index}
                variant="contained"
                className="w-full"
                onClick={() => handleChatClick(chat)}
                sx={{
                  marginTop: "10px",
                  bgcolor: "#24252d",
                  color: "#ffffff",
                }}
              >
                <span>{chat.payload.chatName}</span>
              </Button>
            ))}
        </div>
      </div>

      {/* Main chat area with flex layout */}
      <div className="w-3/4 p-4 flex flex-col h-full">
        <div className="w-1/4 mb-4">
          <DropDownComponent
            handleChange={handleProjectChange}
            content={projects}
            value={dropDownProject}
            label="Select Project"
          />
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-y-auto mb-4" style={{ paddingBottom: "70px" }}>
          {sortedConversation.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: msg.type === "query" ? "flex-end" : "flex-start",
                margin: "10px 0",
              }}
            >
              <div
                style={{
                  background: msg.type === "query" ? "#ef6a36" : "#24252d",
                  color: "#fff",
                  padding: "10px 15px",
                  borderRadius: "15px",
                  maxWidth: "70%",
                  wordBreak: "break-word",
                }}
              >
                <span>{msg.text || "No response"}</span>
                <div style={{ fontSize: "0.8em", marginTop: "5px", textAlign: "right" }}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {/* "Thinking..." bubble */}
          {isLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                margin: "10px 0",
              }}
            >
              <div
                style={{
                  background: "#24252d",
                  color: "#fff",
                  padding: "10px 15px",
                  borderRadius: "15px",
                  maxWidth: "70%",
                  wordBreak: "break-word",
                }}
              >
                <span>Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="w-full flex justify-center items-center gap-10 p-2 px-6">
          <TextField
            size="medium"
            variant="outlined"
            placeholder="What information do you love to hear today?"
            value={queryInput}
            onChange={handleQueryChange}
            sx={{
              width: "90%",
              "& .MuiOutlinedInput-root": { borderRadius: "40px" },
            }}
          />
          <div className="w-auto">
            <IconButton
              sx={{
                width: "56px",
                height: "56px",
                backgroundColor: "#ef6a36",
                "&:hover": { backgroundColor: "#24252d" },
              }}
              onClick={fetchQueryResponse}
            >
              <GoArrowRight style={{ fontSize: "50px", color: "#ffffff" }} />
            </IconButton>
          </div>
        </div>
      </div>

      <ModalWindow open={openAddDetails} onClose={handleClose}>
        <ChatName setOpenAddDetails={setOpenAddDetails} fetchChatHistory={fetchChatHistory} />
      </ModalWindow>
    </div>
  );
};

export default ChatHelper;
