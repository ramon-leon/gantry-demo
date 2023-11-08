import {Injectable} from '@nestjs/common';
import {client} from "../dataSource/connection";
import {User} from "../models/create.user.dto";
import {isDefined} from "../util/validate";

@Injectable()
export class UserService {

    async getListUser(page, pagesize): Promise<User[]> {
        let rows = []
        let limit = pagesize && pagesize > 0 ? pagesize : 100;
        let offset = page && page >0 ? limit * (page -1) : 0;

        try {
            const result = await client.query(`select id, name, age, location
                                               from "user" order by id desc limit $1 offset $2`, [limit, offset]);
            rows = result.rows;
        } catch (err) {
            console.error(err);
            throw 500;
        }

        return rows;
    }

    async createUser({name, age, location}) {
        try {
            if (!isDefined(name) || !isDefined(location) || !age || age < 0 || age >= 200) {
                console.error(`Bad Request, at least one required field is missing a value or is invalid`);
                throw 400
            }
            const resultUser = await client.query(`select id
                                               from "user" where name = $1`, [name]);
            if (resultUser.rows.length) {
                console.error(`Bad Request, unable to create user, User ${name} already exists`);
                throw 400
            }
            await client.query(`insert into "user" (name, age, location)
                                               values ($1, $2, $3) `,
                [name, age, location]);
        } catch (err) {
            console.error(err);
            throw 500;
        }

        return `User ${name} created`;
    }
}
