import React from 'react'
import Image from "next/image";
import {cn} from "@/lib/utils";

enum CallStatus{
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
    CONNECTING = "CONNECTING"
}

interface AgentProps {
    userName: string;
    userId: string;
    type: string;
}

const Agent = ({userName}: AgentProps) => {
    const callStatus = CallStatus.FINISHED
    const isSpeaking = true;
    const messages = [
        "What is your name?",
        "My name is John Doe, nice to meet you!"
    ];
    const lastMessage = messages[messages.length - 1];

    return (
        <>
            <div className="call-view">
                <div className="card-interviewer">
                    <div className="avatar">
                        <Image
                            src={"/ai-avatar.png"}
                            alt={"vapi"}
                            width={65}
                            height={54}
                            className={"object-cover"}/>
                        {isSpeaking && <span className={"animate-speak"}/>}
                    </div>
                    <h3>AI interviewer</h3>
                </div>
                <div className={"card-border"}>
                    <div className={"card-content"}>
                        <Image
                            src={"/user-avatar2.jpg"}
                            alt={"user-avatar"}
                            width={540}
                            height={540}
                            className={"rounded-full object-cover size-[120]"}/>
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

            {messages.length > 0 && (
                <div className={"transcript-border"}>
                    <div className={"transcript"}>
                        <p className={""} key={lastMessage}>
                            {lastMessage}
                        </p>
                    </div>
                </div>
            )}

            <div className="w-full flex justify-center">
                {callStatus !== CallStatus.ACTIVE ? (
                    <button className={"relative btn-call"}>
            <span className={cn(
                'absolute animate-ping rounded-full opacity-75',
                callStatus !== CallStatus.CONNECTING && 'hidden'
            )}
            />
                        <span>
                {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? 'Call' : '...'}
            </span>
                    </button>
                ) : (
                    <button className={"btn-disconnect"}>
                        End
                    </button>
                )}
            </div>

        </>
    )
}
export default Agent
