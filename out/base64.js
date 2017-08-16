var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad="=";

function hex2b64(h) {
  var i;
  var c;
  var ret = "";
  for(i = 0; i+3 <= h.length; i+=3) {
    c = parseInt(h.substring(i,i+3),16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if(i+1 == h.length) {
    c = parseInt(h.substring(i,i+1),16);
    ret += b64map.charAt(c << 2);
  }
  else if(i+2 == h.length) {
    c = parseInt(h.substring(i,i+2),16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while((ret.length & 3) > 0) ret += b64pad;
  return ret;
}

// convert a base64 string to hex
function b64tohex(s) {
  var ret = ""
  var i;
  var k = 0; // b64 state, 0-3
  var slop;
  for(i = 0; i < s.length; ++i) {
    if(s.charAt(i) == b64pad) break;
    v = b64map.indexOf(s.charAt(i));
    if(v < 0) continue;
    if(k == 0) {
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 1;
    }
    else if(k == 1) {
      ret += int2char((slop << 2) | (v >> 4));
      slop = v & 0xf;
      k = 2;
    }
    else if(k == 2) {
      ret += int2char(slop);
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 3;
    }
    else {
      ret += int2char((slop << 2) | (v >> 4));
      ret += int2char(v & 0xf);
      k = 0;
    }
  }
  if(k == 1)
    ret += int2char(slop << 2);
  return ret;
}

// convert a base64 string to a byte/number array
function b64toBA(s) {
  //piggyback on b64tohex for now, optimize later
  var h = b64tohex(s);
  var i;
  var a = new Array();
  for(i = 0; 2*i < h.length; ++i) {
    a[i] = parseInt(h.substring(2*i,2*i+2),16);
  }
  return a;
}

function str2b64(str) {
	var out, i, len;
	var c1, c2, c3;
	len = str.length;
	i = 0;
	out = "";
	while(i < len) {
		 c1 = str.charCodeAt(i++) & 0xff;
		 if(i == len)
		 {
		 out += b64map.charAt(c1 >> 2);
		 out += b64map.charAt((c1 & 0x3) << 4);
		 out += "==";
		 break;
		 }
		 c2 = str.charCodeAt(i++);
		 if(i == len)
		 {
			 out += b64map.charAt(c1 >> 2);
		 out += b64map.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
		 out += b64map.charAt((c2 & 0xF) << 2);
		 out += "=";
		 break;
		 }
		 c3 = str.charCodeAt(i++);
		 out += b64map.charAt(c1 >> 2);
		 out += b64map.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
		 out += b64map.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
		 out += b64map.charAt(c3 & 0x3F);
	}
	return out;
}