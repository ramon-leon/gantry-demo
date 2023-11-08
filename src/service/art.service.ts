import {Injectable} from '@nestjs/common';
import {client} from "../dataSource/connection";
import {ArtDto} from "../models/create.user.dto";

@Injectable()
export class ArtService {

    async getArt(id) {
        let res
        try {
            const result = await client.query(`select id, title, artist, year
                                               from arts
                                               where id = $1`, [id]);
            let result1;
            if (result.rows) {
                result1 = await client.query(`select "userID", name, content
                                                    from comments
                                                    where "artId" = $1`, [result.rows[0].id]);
            } else {
                console.log('No id found - return 204')
            }
            await client.end;
            res = {...result.rows[0]};
            res['comment'] = result1.rows;
        } catch (err) {
            console.log(err);
        }
        return res;
    }

    async getListArt(type): Promise<ArtDto[]> {
        let result;
        let temp;
        try {
            result = await client.query(`select id, title, artist, year
                                               from arts
                                               where id in (20830, 20400)`);
            let result1;
            if (result.rows) {
                temp = result.rows;
                let ids = temp.map( x => (x.id));
                result1 = await client.query(`select "userID", name, content, "artId"
                                                    from arts A left join comments on "artId" = A.id
                                                    where A.id in ( ${ids})`);
                const comments = result1.rows;

                temp.forEach( x => {
                    let arr = comments.filter( y => y.artId === x.id)
                    x['comment'] = arr;
                })
            } else {
                console.log('No id found - return 204')
            }
            await client.end;
            return temp;
        } catch (err) {
            console.log(err);
        }
    }

    async addComment({userId, name, content, artId}): Promise<string> {
        try {
            const result = await client.query(`insert into comments ("userID", name, content, "artId")
                                               values ($1, $2, $3, $4)`,
                [userId, name, content, artId]);
            await client.end;
        } catch (err) {
            console.log(err);
        }

        return `partner created for ::::: ${userId}`;
    }

}
