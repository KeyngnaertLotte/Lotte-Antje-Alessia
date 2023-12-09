import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { BezoekersService } from 'src/bezoekers/bezoekers.service'
import { Server } from 'socket.io'

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

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!'
  }

  async changeSaldoBezoeker(transactie: string, saldo: number, uid: string) {
    this.server.emit('bezoekerChangeSaldo:' + uid, {
      plaats: transactie,
      saldo: saldo,
      uid: uid,
    })
  }
}
