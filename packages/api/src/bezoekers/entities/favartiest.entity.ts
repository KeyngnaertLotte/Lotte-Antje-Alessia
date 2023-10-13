// src/bezoekers/dto/favoartiest.input.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@ObjectType()
export class FavArtiest {
  @Field()
  artiest: string;

  @Field()
  time: string;

  @Field()
  color: string;
}
