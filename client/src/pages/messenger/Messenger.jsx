import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Messenger() {
	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get("/conversations/" + user._id);
				setConversations(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getConversations();
	}, [user._id]);

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get("/messages/" + currentChat?._id);
				setMessages(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getMessages();
	}, [currentChat]);

	console.log(messages);

	return (
		<>
			<Topbar />
			<div className="messenger">
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<input
							type="text"
							placeholder="Search for friends"
							className="chatMenuInput"
						/>
						{conversations.map((c) => (
							<div onClick={() => setCurrentChat(c)}>
								<Conversation conversation={c} currentUser={user} />
							</div>
						))}
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						{currentChat ? (
							<>
								<div className="chatBoxTop">
									{messages.map((m) => (
										<Message message={m} own={m.sender === user._id} />
									))}
								</div>
								<div className="chatBoxBottom">
									<textarea
										name=""
										id=""
										cols="30"
										rows="10"
										placeholder="Write something"
										className="chatMessageInput"
									></textarea>
									<button className="chatSubmitButton">Send</button>
								</div>
							</>
						) : (
							<span className="noConversationText">
								Open a conversation to start a chat
							</span>
						)}
					</div>
				</div>
				<div className="chatOnline">
					<div className="chatOnlineWrapper">
						<ChatOnline />
						<ChatOnline />
						<ChatOnline />
						<ChatOnline />
					</div>
				</div>
			</div>
		</>
	);
}
