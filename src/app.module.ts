import {Module} from '@nestjs/common';
import {ArtController} from './controller/art.controller';
import {ArtService} from './service/art.service';
import {UserService} from "./service/user.service";
import {UserController} from "./controller/user.controller";

@Module({
    imports: [],
    controllers: [ArtController, UserController],
    providers: [ArtService, UserService],
})
export class AppModule {
}
