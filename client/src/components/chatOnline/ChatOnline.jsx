import "./chatOnline.css";

export default function ChatOnline() {
	return (
		<div className="chatOnline">
			<div className="chatOnlineFriend">
				<div className="chatOnlineImgContainer">
					<img src="assets/person/3.jpeg" alt="" className="chatOnlineImg"/>
					<div className="chatOnlineBadge"></div>
				</div>
                <span className="chatOnlineName">John doe </span>
			</div>
		</div>
	);
}
