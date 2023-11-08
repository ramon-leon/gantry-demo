import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ArtService} from '../service/art.service';
import {ArtDto, CommentDto, CreateUserDto} from "../models/create.user.dto";

@Controller('/api/art')
export class ArtController {
    constructor(private readonly artService: ArtService) {
    }

    // GET, view the entire art data set
    // need to implement pagination
    @Get()
    async getListArts(@Query('page') page: string, @Query('pagesize') pagesize: string): Promise<ArtDto[]> {
        return this.artService.getListArt(page, pagesize);
    }

    // GET, view art data by ID
    @Get(':id')
    async getArt(@Param('id') id: string): Promise<string> {
        return this.artService.getArt(id);
    }

    // POST, add a comment for the art data entry
    @Post(':id/comments')
    async createComment(@Body() comment: CommentDto): Promise<string> {
        return this.artService.addComment(comment);
    }

}
