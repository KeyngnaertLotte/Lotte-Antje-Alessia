import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ArtiestenModule } from './artiesten/artiesten.module';
import { PersoneelModule } from './personeel/personeel.module';
import { BezoekersModule } from './bezoekers/bezoekers.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ArtiestenModule,
    BezoekersModule,
    PersoneelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
