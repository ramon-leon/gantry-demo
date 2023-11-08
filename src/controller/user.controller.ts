import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {UserService} from "../service/user.service";
import {CreateUserDto, User} from "../models/create.user.dto";


@Controller('/api/users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    async getListUser(): Promise<User[]> {
        return this.userService.getListUser();
    }

    @Post()
    async createUser(@Body() createUserDTO: CreateUserDto): Promise<string> {
        return this.userService.createUser(createUserDTO);
    }

}
