import {Controller, Get, Inject, OnModuleInit, Param} from '@nestjs/common';
import {AppService, User, UserService} from './app.service';
import {Observable} from "rxjs";
import {ClientGrpc} from "@nestjs/microservices";

@Controller()
export class AppController implements OnModuleInit {
  private userService: UserService

  constructor(
      private readonly appService: AppService,
      @Inject('USER_PACKAGE') private client: ClientGrpc
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService')
  }

  @Get(':id')
  getUser(@Param('id') id: number): Observable<any> {
    const res = this.userService.findOne({ id })
    console.log(res)
    return res
  }
}
