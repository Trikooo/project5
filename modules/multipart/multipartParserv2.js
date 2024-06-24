const { Transform } = require("node:stream");

let s = 0;
const STATE = {
  PARSER_UNINITIALIZED: s++,
  START: s++,
  START_BOUNDARY: s++,
  HEADER_FIELD_START: s++,
  HEADER_FIELD: s++,
  HEADER_VALUE_START: s++,
  HEADER_VALUE: s++,
  HEADER_VALUE_ALMOST_DONE: s++,
  HEADERS_ALMOST_DONE: s++,
  PART_DATA_START: s++,
  PART_DATA: s++,
  PART_DATA_END: s++,
  END: s++,
};

let f = 1;

const FBOUNDARY = { PART_BOUNDARY: f, LAST_BOUNDARY: (f *= 2) };

const LF = 10;
const CR = 13;
const SPACE = 32;
const HYPHEN = 45;
const COLON = 58;
const A = 97;
const Z = 122;

class MultipartParser extends Transform {
  constructor() {
    super({ readableObjectMode: true });
    this.boundary = null;
    this.boundaryChars = null;
    this.lookbehind = null;
    this.state = STATE.PARSER_UNINITIALIZED;
    this.bufferLength = null;
    this.index = null;
    this.flags = 0;
  }
  initWithBoundary(str){
    
  }
  _transform(buffer, _, callback) {
    let { index, state, flags } = this;
    const { boundary, boundaryChars, lookbehind } = this;
    for (let i; i < buffer.length; i++) {
      c = buffer[i].charCodeAt(0);
      switch (state) {
        case STATE.START:
          index = 0;
          state = STATE.START_BOUNDARY;
        case STATE.START_BOUNDARY:
          if (index === boundary.length - 2) {
            if (c === HYPHEN) {
              flags = flags | FBOUNDARY.LAST_BOUNDARY;
            }
          }
      }
    }
  }
}
