import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { BezoekersService } from 'src/bezoekers/bezoekers.service'
import { Server, Socket } from 'socket.io'

@WebSocketGateway(+process.env.WS_PORT || 3004, {
  cors: {
    origin: ['http://localhost:5173', process.env.URL_FRONTEND],
    credentials: true,
  },
})


export class NotificationsGateway {
  constructor(
    private readonly bezoekersService: BezoekersService,
  ) {}

  @WebSocketServer()
  server: Server

  async changeSaldoBezoeker(transactie: string, saldo: number, uid: string) {
    this.server.emit('bezoekerChangeSaldo:' + uid, {
      plaats: transactie,
      saldo: saldo,
      uid: uid,
    })
  }


  @SubscribeMessage('adminNotification:admin')
  handleAdminNotificationVisitors(client: Socket, message: string, role: string): void {
    console.log('Received adminNotification:' + role, message);
    // Process the message as needed, e.g., broadcast it to all visitors
    client.broadcast.emit('adminNotification:' + role, message);
  }

}
