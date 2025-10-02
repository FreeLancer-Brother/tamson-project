import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
// import imagemin from 'imagemin';
import * as fs from 'fs';
import * as path from 'path';
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

@Controller("upload")
export class UploadController {
  @Post("/image")
  @UseInterceptors(FilesInterceptor("files", 100))
  async uploadFilesImage(@UploadedFiles() files: Array<Express.Multer.File>) {

    const results = [];
    const _files = await imagemin(files.map(file => file.path ), {
      plugins: [
        imageminWebp({quality: 80})
      ]
    });
    for (let i = 0; i < _files.length; i++) {
      const file = files[i];
      const _file = _files[i];

      fs.writeFileSync(   _file.sourcePath.replace(path.extname(_file.sourcePath), ".webp"), _file.data);
      fs.unlinkSync(_file.sourcePath);
      results.push({
        uri: `${file.destination.split("/public/")[1]}/${file.filename.replace(path.extname(file.filename), ".webp")}`,
      });
    }
    return {
      data: results,
    };
  }
  @Post("/video")
  @UseInterceptors(FilesInterceptor("files", 100))
  async uploadFilesVideo(@UploadedFiles() files: Array<Express.Multer.File>) {
   const _file = files[0];
    if (!_file) {
      throw new HttpException("Upload failed", HttpStatus.INTERNAL_SERVER_ERROR);
    }



    return {
      data: {
			uri: `${_file.destination.split("/public/")[1]}/${_file.filename.replace(path.extname(_file.filename), ".mp4")}`
	  },
    };
  }
  @Post("/ckeditor")
  @UseInterceptors(FileInterceptor("upload"))
  async uploadFileCkeditor(@UploadedFile() file: Express.Multer.File) {
    const result = {
      url: '',
      default: '',
    };

    const _files = await imagemin([path.resolve(file.path)], {
      plugins: [
        imageminWebp({quality: 80})
      ]
    });

    const _file = _files[0];
    if (!_file) {
      throw new HttpException("Upload failed", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    fs.writeFileSync(_file.sourcePath.replace(path.extname(_file.sourcePath), '.webp'), _file.data);
    fs.unlinkSync(_file.sourcePath);
    result.url = `https://api.tamsonyachting.com/${file.destination.split("/public/")[1]}/${file.filename.replace(path.extname(file.filename), '.webp')}`;
    result.default = `https://api.tamsonyachting.com/${file.destination.split("/public/")[1]}/${file.filename.replace(path.extname(file.filename), '.webp')}`;

    return result;
  }
}
