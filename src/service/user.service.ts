import {Injectable} from '@nestjs/common';
import {client} from "../dataSource/connection";
import {User} from "../models/create.user.dto";

@Injectable()
export class UserService {

    async getListUser(): Promise<User[]> {
        let rows = []

        try {
            const result = await client.query(`select id, name, age, location
                                               from "user"`);
            rows = result.rows;
        } catch (err) {
            console.log(err);
        }

        return rows;
    }

    async createUser({name, age, location}) {
        try {
            const result = await client.query(`insert into "user" (name, age, location)
                                               values ($1, $2, $3) `,
                [name, age, location]);
        } catch (err) {
            console.log(err);
        }

        return `user created for  ::::: ${name}`;
    }
}
