import { User } from "../user/User";
import { Socket } from "socket.io";
import { SocketConnection } from "../socket_connection/SocketConnection";
import { Questions } from "../questions/Questions";

export class Player {
    public user: User;
    public socket: Socket;
    public answerIsCorrect: boolean = false;
    public score: number = 0;

    public constructor(user: User) {
        this.user = user;
        this.socket = <Socket> SocketConnection.get(this.user.sessionID);
        this.socket.on('testAnswer', this.TestAnswerEvent.bind(this));
    }

    private async TestAnswerEvent(message: any): Promise<void> {
        this.answerIsCorrect = await Questions.test(message.answerId, message.questionId);
    }

}