export enum MessageType {
    GridUpdate = 'gridUpdate',
}

export class ClientMessage {
    type!: MessageType;
    data!: any;
}

export class SocketMessage {
    status!: number;
    data!: any;
}