import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import * as Joi from 'joi';

const envFilePath = [`.env.${process.env.NODE_ENV}`, '.env'];

const schema = Joi.object({
  PORT: Joi.number().port(),
  NODE_ENV: Joi.string().valid('development', 'production').required(),
});

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      envFilePath,
      validationSchema: schema,
    }),
  ],
})
export class ConfigModule {}
