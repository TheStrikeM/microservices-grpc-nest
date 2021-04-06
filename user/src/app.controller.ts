import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {GrpcMethod} from "@nestjs/microservices";


interface IUserById {
  id: number
}

interface IUser {
  id: number
  name: string
  desc: string
}

type IMetadata = any

@Controller()
export class AppController {
  @GrpcMethod('UserService', 'findOne')
  findOne(data: IUserById, metadata: IMetadata): IUser {
    const users = [
      { id: 1, name: 'Gena', desc: 'This is not gay' },
      { id: 2, name: 'Vasya', desc: 'This is not gay' }
    ]
    console.log('Произошел выхов findOne')
    return users.find(({ id }) => id === data.id)
  }
}
