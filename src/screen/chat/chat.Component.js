
import './chat.css';
import { Card } from 'react-bootstrap';

const ChatComponent = (props) => {
    return (
        <div>
            <div className="container">
                <h3>Messaging</h3>
                <div style={{textAlign: 'end'}}>
                    <span onClick={props.logout}>Logout</span>
                </div>
                <div className="messaging">
                    <div className="inbox_msg">
                        <div className="inbox_people">
                            <div className="headind_srch">
                                <div className="recent_heading">
                                    <h4>Recent</h4>
                                </div>
                                <div className="srch_bar">
                                    <div className="stylish-input-group">
                                        <input type="text" className="search-bar" placeholder="Search" />
                                        <span className="input-group-addon">
                                            <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                        </span> </div>
                                </div>
                            </div>
                            <div className="inbox_chat">
                                {props.chat.usersList && props.chat.usersList.length > 0 ? props.chat.usersList.map((data) => (
                                    <Card onClick={() => props.onClickUser(data.id)} className="chat_list active_chat">
                                        <div className="chat_people">
                                            <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                            <div className="chat_ib">
                                                <h5>{data.userEmail} <span className="chat_date">Dec 25</span></h5>
                                            </div>
                                        </div>
                                    </Card>
                                )) :
                                    <div>No users found</div>}
                            </div>
                        </div>
                        <div className="mesgs">
                            <div className="msg_history">
                                {props.chat.userMessage && props.chat.userMessage.length > 0 ? props.chat.userMessage.map(msg => (
                                    msg.recieverId == props.chat.recieverId ?
                                        <div className="incoming_msg">
                                            <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                                            </div>
                                            <div className="received_msg">
                                                <div className="received_withd_msg">
                                                    <p>{msg.message}</p>
                                                    <span className="time_date"> 11:01 AM | June 9</span>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="outgoing_msg">
                                            <div className="sent_msg">
                                                <p>{msg.message}</p>
                                                <span className="time_date"> 11:01 AM | June 9</span>
                                            </div>
                                        </div>
                                )) : <div>No Messages found</div>}
                            </div>
                            <div className="type_msg">
                                <div className="input_msg_write">
                                    <input value={props.chat.inputChange} onChange={props.onChangeInput} type="text" className="write_msg" placeholder="Type a message" />
                                    <button onClick={props.onClickSend} className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ChatComponent;