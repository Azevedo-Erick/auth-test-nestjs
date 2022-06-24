import { Injectable, Logger } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway({
    cors:{
        origin:'*',
    }
})
export class Websocket implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    

    private logger: Logger = new Logger('AppGateway');

    @WebSocketServer()
    server:Server;

    @SubscribeMessage('msgToServer')
    print(client:Socket, payload:string   ){
        this.logger.log(`Client ${client.id} send message ${payload}`);
        client.emit('msgToClient', payload);
    }


    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected ${client.id}`);
    }
    handleConnection(client: Socket, ...args: any[]) {
        client.join('sala')
        this.logger.log(`Client connected ${client.id}, total: ${this.server.engine.clientsCount}`);
    }
    afterInit(server: any) {
        this.logger.log('WebSocket is ready');
    }
}
