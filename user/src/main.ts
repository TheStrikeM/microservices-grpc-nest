import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices'
import { join } from 'path'

const url = '0.0.0.0:50051'

async function start() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
          transport: Transport.GRPC,
          options: { url, package: 'user', protoPath: join(__dirname, '../protos/user.proto') }
      }
  )

  await app.listen(() => console.log(`Success started on ${url}`))
}

start();
