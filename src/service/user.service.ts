import {Injectable} from '@nestjs/common';
import {client} from "../dataSource/connection";
import {User} from "../models/create.user.dto";
import {isDefined} from "../util/validate";

@Injectable()
export class UserService {

    async getListUser(): Promise<User[]> {
        let rows = []

        try {
            const result = await client.query(`select id, name, age, location
                                               from "user"`);
            rows = result.rows;
        } catch (err) {
            throw 500;
        }

        return rows;
    }

    async createUser({name, age, location}) {
        try {
            if (!isDefined(name) || !isDefined(location) || !age || age < 0 || age >= 200) {
                console.error(`At least one required field is missing a value or is invalid`);
                throw 400
            }
            const resultUser = await client.query(`select id
                                               from "user" where name = $1`, [name]);
            if (resultUser.rows.length) {
                console.error(`Unable to create user, User ${name} already exists`);
                throw 400
            }
            await client.query(`insert into "user" (name, age, location)
                                               values ($1, $2, $3) `,
                [name, age, location]);
        } catch (err) {
            throw 500;
        }

        return `User ${name} created`;
    }
}
