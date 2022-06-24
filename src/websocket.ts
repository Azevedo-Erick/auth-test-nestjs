import { Injectable, Logger } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway({
    cors: {
        origin: '*',
    }
})
export class Websocket implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


    private logger: Logger = new Logger('AppGateway');

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('msgToServer')
    print(client: Socket, payload: string) {
        this.logger.log(`Client ${client.id} send message ${payload}`);
        client.broadcast.emit('msgToClient', payload);
    }

    @SubscribeMessage('changeTurn')
    async changeTurn(client: Socket, payload: string) {
        let room;
        client.rooms.forEach((e) => {
            if (e != client.id) {
                room = e
            }
        })
        let nextPlayer;
        const players = await this.server.sockets.adapter.rooms.get(room)
        players.forEach((e)=>{
            if(e!=client.id){
                nextPlayer = e
            }
        })
        this.server.to(nextPlayer).emit('turn', 'It is your turn');


    }


    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected ${client.id}`);
    }


    async handleConnection(client: Socket, ...args: any[]) {

        const rooms: string[] = ['aba', 'aca']
        let roomToConnect;
        for (let i = 0; i < rooms.length; i++) {
            if (await this.server.sockets.adapter.rooms.get(rooms[i]) == undefined) {
                roomToConnect = rooms[i];
                break;
            }
            if (await this.server.sockets.adapter.rooms.get(rooms[i]).size < 2) {
                roomToConnect = rooms[i];
                break;
            }
        }

        if (!roomToConnect) {
            client.emit('allRoomFull', 'all room are full')
            client.disconnect(true);
            return;
        }
        client.join(roomToConnect);
        const room = await this.server.sockets.adapter.rooms.get(roomToConnect);
        const players = await this.server.sockets.adapter.rooms.get(roomToConnect).values()

        if (room.size == 2) {
            let turnOf = () => {
                if (Math.round(Math.random() * 1) == 0) {
                    return players.next().value;
                }
                return players.next().value;
            }
            this.server.to(turnOf()).emit('turn', 'It is your turn');


        }
        this.logger.log(`Client connected ${client.id}, total: ${this.server.engine.clientsCount}`);
    }
    afterInit(server: any) {
        this.logger.log('WebSocket is ready');
    }
}
