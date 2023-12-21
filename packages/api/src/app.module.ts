import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArtiestenModule } from './artiesten/artiesten.module'
import { PersoneelModule } from './personeel/personeel.module'
import { BezoekersModule } from './bezoekers/bezoekers.module'
import { SeedModule } from './seed/seed.module'
import { AuthenticationModule } from './authentication/authentication.module'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { MateriaalModule } from './materiaal/materiaal.module'
import { TakenModule } from './taken/taken.module'
import { NotificationsModule } from './notifications/notifications.module'
import { MongoMemoryServer } from 'mongodb-memory-server'

@Module({
  imports: [
    ConfigModule.forRoot(),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: process.env.NODE_ENV == 'production' ? false : true,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
          const mongo = await MongoMemoryServer.create({
            instance: {
              dbName: process.env.DB_NAME,
            },
          })

          const mongoUri = mongo.getUri()
          console.log('🍃 mongoUri', mongoUri)

          return {
            type: 'mongodb',
            url: `${mongoUri}${process.env.DB_NAME}`,
            entities: [__dirname + '/**/*.entity.{js,ts}'],
            synchronize: process.env.NODE_ENV == 'production' ? false : true, // Careful with this in production
            useNewUrlParser: true,
            useUnifiedTopology: true, // Disable deprecated warnings
          }
        } else {
          if (process.env.NODE_ENV == 'dev') {
            return {
              type: 'mongodb',
              url: 'mongodb://localhost:27027/api',
              entities: [__dirname + '/**/*.entity.{js,ts}'],
              useNewUrlParser: true,
              useUnifiedTopology: true, // Disable deprecated warnings
            }
          } else {
            return {
              type: 'mongodb',
              url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, // DOCKER
              entities: [__dirname + '/**/*.entity.{js,ts}'],
              synchronize: process.env.NODE_ENV == 'production' ? false : true, // Careful with this in production
              useNewUrlParser: true,
              useUnifiedTopology: true, // Disable deprecated warnings
            }
          }
        }
      },
    }),

    ArtiestenModule,
    BezoekersModule,
    PersoneelModule,
    SeedModule,
    AuthenticationModule,
    UsersModule,
    MateriaalModule,
    TakenModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
