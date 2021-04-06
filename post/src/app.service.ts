import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {ClientGrpc} from "@nestjs/microservices";
import {Observable} from "rxjs";

export interface User {
  id: number
  name: string
  desc: string
}

export interface UserById {
  id: number
}

export interface UserService {
  findOne: (data: UserById) => Observable<User>
}

@Injectable()
export class AppService implements OnModuleInit {
  private userService: UserService

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService')
  }

  getUser(id: number): Observable<any> {
    return this.userService.findOne({id})
  }
}
