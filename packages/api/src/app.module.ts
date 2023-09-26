import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArtiestenModule } from './artiesten/artiesten.module'
import { PersoneelModule } from './personeel/personeel.module'
import { BezoekersModule } from './bezoekers/bezoekers.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27027/api',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true, // Careful with this in production
      useNewUrlParser: true,
      useUnifiedTopology: true, // Disable deprecated warnings
    }),
    
    ArtiestenModule,
    BezoekersModule,
    PersoneelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
