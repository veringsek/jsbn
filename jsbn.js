let JSBN = {};
JSBN.generate = function (object, outerscopes = []) {
    if (JSBN.notObject(object)) return object;
    let generated = Array.isArray(object) ? [] : {};
    let varscopes = outerscopes;
    let keys = Object.keys(object);
    let v = keys.indexOf("$vars");
    if (v > -1) {
        varscopes = varscopes.concat([JSBN.clone(object["$vars"])]);
        keys.splice(v, 1);
    }
    for (let key of keys) {
        if (key in JSBN.funcs) {
            return JSBN.funcs[key](object[key], varscopes);
        } else {
            generated[key] = JSBN.generate(object[key], varscopes);
        }
    }
    return generated;
};
JSBN.funcs = {
    "$var": function (object, vs) {
        let varname = JSBN.generate(object, vs);
        for (let varscope of vs.slice().reverse()) {
            if (varname in varscope) return varscope[varname];
        }
        return undefined;
    },
    "$duplicate": function (object, vs) {
        let o = JSBN.generates(object, vs);
        let contents = [];
        let count = o["%count"];
        for (let i = 0; i < count; ++i) {
            contents.push(o["%content"]);
        }
    },
    "$pick": function (object, vs) {
        let o = JSBN.generates(object, vs);
        let options = o["%options"];
        let chosen = JSBN.random(0, options.length - 1);
        if (o["%distinct"]) {
            return options.splice(chosen, 1)[0];
        } else {
            return options[chosen];
        }
    },
    "$random": function (object, vs) {
        let o = JSBN.generates(object, vs);
        return JSBN.random(o["%from"], o["%to"]);
    },
    "$gte": function (object, vs) {
        let threshold = JSBN.generate(object, vs);
        return something => something >= threshold;
    }
};
JSBN.generates = function (object, vs = []) {
    let values = {};
    let keys = Object.keys(object);
    for (let key of keys) values[key] = JSBN.generate(object[key], vs);
    return values;
};
JSBN.clone = function (object) {
    if (JSBN.notObject(object)) return object;
    let cloned = Array.isArray(object) ? [] : {};
    for (let key of Object.keys(object)) {
        cloned[key] = JSBN.clone(object[key]);
    }
    return cloned;
};
JSBN.notObject = function (object) {
    return typeof object !== "object" || object === null;
};
JSBN.random = function (lowest, highest) {
    return Math.floor(Math.random() * (highest - lowest + 1));
};
exports.JSBN = JSBN;