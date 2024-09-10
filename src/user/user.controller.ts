import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';

import { avatarMulterOptions } from '@/common/avatar.multer';
import { Cookies } from '@/common/cookie.param';
import { Roles } from '@/common/roles.decorator';
import { RolesGuard } from '@/common/roles.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserVisible } from './entities/user.visible';
import { UserService } from './user.service';

@Controller({
  version: '2',
  path: 'user',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file', avatarMulterOptions))
  async uploadFile(
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg|png',
        })
        .addMaxSizeValidator({
          maxSize: 1024000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    console.log('file', file);
    return {
      success: true,
      data: file,
    };
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(RolesGuard)
  @Roles(['admin'])
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @CacheTTL(60000)
  @UseInterceptors(CacheInterceptor)
  findAll(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Cookies('mycookie') mycookie: string,
  ) {
    console.log('request.cookies', request.cookies, 'mycookie', mycookie);
    // throw new HttpException('Well, not really forbidden', HttpStatus.FORBIDDEN);
    response.cookie('mycookie', 'very good');
    return this.userService.findAll();
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user || null;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    const user = await this.userService.findOne(+id);
    return user ? new UserVisible(user) : null;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
