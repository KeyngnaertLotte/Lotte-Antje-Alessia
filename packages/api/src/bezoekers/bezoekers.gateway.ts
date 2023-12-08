import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, } from "@nestjs/websockets";
import { BezoekersService } from "./bezoekers.service";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

@WebSocketGateway(+process.env.WS_PORT || 3004, {
    cors: {
      origin: [
        'http://localhost:5173',
        process.env.URL_FRONTEND
      ],
      credentials: true,
    },
  })

  export class BezoekersGateway
  implements OnGatewayConnection<Socket>
  {
  
    constructor(
      private readonly bezoekersService: BezoekersService,
    ) {}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
      this.server.emit('message', 'Hello world!');
      return 'Hello world!';
    }

    @SubscribeMessage('messagePersoneel')
    handleMessagePersoneel(client: any, payload: any): string {
      this.server.emit('messageBezoekers', 'Hello BEZOEKERS!');
      return 'Hello world!';
    }
    handleConnection(client: Socket, ...args: any[]) {
      console.log(`Client connected: ${client.id}`);
      /// save client.id in database
    }

    

    async changeSaldoBezoeker(transactie: string, saldo: number, uid: string){
      console.log('changeSaldoBezoeker', transactie, saldo, uid);
      this.server.emit('bezoekerChangeSaldo:'+ uid , {plaats: transactie, saldo: saldo, uid: uid});
    }


    
    


    // async subscribeToSaldoChanges() {
    //   // Connect to the WebSocket gateway
    //   const gateway = this.getGateway();
    //   await gateway.on(this.channelName, (message: Message) => {
    //     // Handle saldo updates from the database or event emitter
    //     if (message.data.type === 'saldo-updated') {
    //       // Prepare a data object with the updated saldo information
    //       const updatedSaldo = message.data.data;
  
    //       // Send the updated saldo information to the PWA client
    //       await gateway.emit('saldo-updates', updatedSaldo);
    //     }
    //   });
    // }
  }







