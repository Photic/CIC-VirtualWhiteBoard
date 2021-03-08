
export class PhotoModel {
    constructor(
        public originalname: string,
        public savedas: string,
        public fileextension: string,
        public fileencoding: string,
        public bytesize: number,
        public mimetype: string,
        public buffer: any,
        public created: string
    ) { }
}