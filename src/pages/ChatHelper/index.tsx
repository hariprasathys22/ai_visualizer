import { Button, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { useQueryStore } from "../../store";
import DropDownComponent from "../../components/DropDown";
import { ServerConfig } from "../../utilities/baseConfig";
import ModalWindow from "../../components/ModalComponent";
import ChatName from "../../sections/ChatName";

const ChatHelper = () => {
  const [queryData, setQueryData] = useState("");
  const [dropDownProject, setDropDownProject] = useState("");
  const [queryInput, setQueryInput] = useState("");
  const { fetchProject, projects } = useQueryStore();
  const [openAddDetails, setOpenAddDetails] = useState<boolean>(false);
  const [chatNames, setChatNames] = useState<any[]>([]);
  const [chatId, setChatId] = useState();
  const [chatDetails, setChatDetails] = useState();

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
            "Content-Type": "application/json", // Add this header
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
  const fetchSingleChatDetails = async () => {
    

  };
  const fetchQueryResponse = async () => {
    const response = await fetch(
      `${ServerConfig.BASE_URL}api/querytext/${dropDownProject}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this header
        },
        body: JSON.stringify({ query: queryInput, chatId: chatId }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setQueryData(data.message);
      console.log(data);
    }
  };
  const handleOpen = () => {
    setOpenAddDetails(true);
  };
  const handleClose = () => {
    setOpenAddDetails(false);
  };
  const handleChatClick = async (chat: any) => {
    setChatId(chat.id)
    const response = await fetch(
      `${ServerConfig.BASE_URL}api/collection/chatHistory/queryResponse/${chat.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Add this header
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data, "data ");
    
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

  return (
    <div className="w-full h-full flex">
      <div className="w-1/4  bg-[#33333E] overflow-y-hidden p-4">
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
                sx={{ marginTop: "10px", bgcolor: "#24252d", color: "#ffffff" }}
              >
                <span>{chat.payload.chatName}</span>
              </Button>
            ))}
        </div>
      </div>
      <div className="w-full p-4 ">
        <div className="w-1/4 relative">
          <DropDownComponent
            handleChange={handleProjectChange}
            content={projects}
            value={dropDownProject} // <-- Pass the state you want to bind
            label="Select Project"
          />
        </div>
        <div className="w-1/2 h-auto">
          {queryData && <span>{queryData}</span>}
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-1/2 flex justify-center items-center bottom-10 fixed gap-10">
            <TextField
              size="medium"
              variant="outlined" // Ensure you're using the outlined variant if you want to style the outline
              placeholder="What information do you love to hear today?"
              onChange={(e) => handleQueryChange(e)}
              sx={{
                width: "90%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "40px", // Set your desired border radius here
                },
              }}
            />
            <div className="w-auto">
              <IconButton
                sx={{
                  width: "56px",
                  height: "56px",
                  backgroundColor: "#ef6a36",
                  "&:hover": {
                    backgroundColor: "#24252d", // Optional: change background on hover
                  },
                }}
                onClick={fetchQueryResponse}
              >
                <GoArrowRight style={{ fontSize: "50px", color: "#ffffff" }} />
              </IconButton>
            </div>
          </div>
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
