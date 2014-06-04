// t is a binpack typename
var sizeOfType = function(t) {
    // unsigned are the same length as signed
    if(t[0] === 'U') {
        t = t.slice(1);
    }

    return {
        'Float32' : 4,
        'Float64' : 8,
        'Int8' : 1,
        'Int16' : 2,
        'Int32' : 4,
        'Int64' : 8
    }[t];
};

var endianConv = function(e, t) {
    // node doesn't define 8 bit endianness
    if(t[t.length - 1] === '8')
        return '';

    if(e === 'big') {
        return 'BE';
    }
    return 'LE';
};

var addBindings = function(binpackTypename, nodeTypename){
    if(!(typeof nodeTypename !== "undefined" && nodeTypename !== null)) {
        nodeTypename = binpackTypename;
    }
    module.exports['pack' + binpackTypename] = function(num, endian){
        b = new Buffer(sizeOfType(binpackTypename));
        b['write' + nodeTypename + endianConv(endian, binpackTypename)](num, 0, true);
        return b;
    }

    module.exports['unpack' + binpackTypename] = function(buff, endian){
        return buff['read' + nodeTypename + endianConv(endian, binpackTypename)](0);
    }
}

var addIntBindings = function(n) {
    addBindings("Int" + n);
    addBindings("UInt" + n);
}

addIntBindings(8);
addIntBindings(16);
addIntBindings(32);

twoToThe32 = Math.pow(2, 32);

// 64 bit bindings require special care
var read64 = function(unsigned){return function(buff, endian){
    var e = endianConv(endian, '');
    var u = unsigned ? 'U' : '';
    var low, high;
    if(e === 'LE') {
        low = buff.readUInt32LE(0);
        high = buff['read' + u + 'Int32LE'](4);
    } else {
        low = buff.readUInt32BE(4);
        high = buff['read' + u + 'Int32BE'](0);
    }
    return high * twoToThe32 + low;
};};

var write64 = function(unsigned){return function(num, endian){
    var e = endianConv(endian, '');
    var u = unsigned ? 'U' : '';
    var b = new Buffer(8);
    var high = Math.floor(num / twoToThe32);
    var low = Math.floor(num - high * twoToThe32);
    if(e == 'LE') {
        b.writeUInt32LE(low, 0, true);
        b['write' + u + 'Int32LE'](high, 4, true);
    } else {
        b.writeUInt32BE(low, 4, true);
        b['write' + u + 'Int32BE'](high, 0, true);
    }
    return b;
};};

module.exports.unpackInt64 = read64(false);
module.exports.unpackUInt64 = read64(true);
module.exports.packInt64 = write64(false);
module.exports.packUInt64 = write64(true);

addBindings("Float32", "Float");
addBindings("Float64", "Double");
