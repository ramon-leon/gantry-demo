import {Injectable} from '@nestjs/common';
import {client} from "../dataSource/connection";
import {ArtDto} from "../models/create.user.dto";
import {isDefined} from "../util/validate";

@Injectable()
export class ArtService {

    async getArt(id) {
        let res
        try {
            const result = await client.query(`select id, title, artist, year
                                               from arts
                                               where id = $1`, [id]);
            let result1;
            if (result.rows.length) {
                result1 = await client.query(`select "userID", name, content
                                                    from comments
                                                    where "artId" = $1`, [result.rows[0].id]);
                res = {...result.rows[0]};
                res['comment'] = result1.rows;
            } else {
                console.log('No record found');
                res = 'No record found';
            }
        } catch (err) {
            throw 500;
        }
        return res;
    }

    async getListArt(): Promise<ArtDto[]> {
        let result;
        let artRecords = [];
        try {
            result = await client.query(`select id, title, artist, year
                                               from arts
                                               where id in (20830, 20400)`);
            let result1;
            if (result.rows.length) {
                artRecords = result.rows;
                let ids = artRecords.map( x => (x.id));
                result1 = await client.query(`select "userID", name, content, "artId"
                                                    from arts A left join comments on "artId" = A.id
                                                    where A.id in ( ${ids})`);
                const comments = result1.rows;

                artRecords.forEach( x => {
                    let arr = comments.filter( y => y.artId === x.id)
                    x['comment'] = arr;
                })
            } else {
                console.log('No records found');
            }
            return artRecords;
        } catch (err) {
            throw 500;
        }
    }

    async addComment({userId, name, content, artId}): Promise<string> {
        let result;
        if (!isDefined(content) || (!isDefined(userId) && !isDefined(name))) {
            console.error('At least one required field is missing a value or is invalid');
            throw 400
        }
        if (isDefined(userId)) {
            const result = await client.query(`select id
                                               from "user" where id = $1`, [userId]);
            if (result.rows.length) {
                console.error("Invalid userId");
                throw 400
            }
        } else {
            const result = await client.query(`select id
                        from comments where "artId" = $1 and name = $2`, [artId, name]);
            if (result.rows.length) {
                console.error(`There is already a comment added by this non-user ${name}`);
                throw 400
            }
        }
        try {
            result = await client.query(`insert into comments ("userID", name, content, "artId")
                                               values ($1, $2, $3, $4)`,
                [userId, name, content, artId]);
        } catch (err) {
            throw 500;
        }

        return `${result.rowCount} comment added`;
    }

}
