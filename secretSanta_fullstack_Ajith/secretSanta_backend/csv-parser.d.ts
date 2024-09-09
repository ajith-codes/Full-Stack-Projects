declare module 'csv-parser' {
    import { Readable } from 'stream';
    function csvParser(options?: any): Readable;
    export default csvParser;
  }
  