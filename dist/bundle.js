/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Created by david-maser on 21/09/15.
 */
// The validateJSON plugin depends on the caret plugin, the JSON lint parser,
// and the JSON lint formatter from jsonlint.com.
(function($) {
    if (typeof $.fn.caret === "undefined") {
        $.fn.caret = function(begin, end) {
            if (this.length === 0) {
                return;
            }
            if (typeof begin === 'number') {
                end = (typeof end === 'number') ? end : begin;
                return this.each(function() {
                    if (this.setSelectionRange) {
                        this.focus();
                        this.setSelectionRange(begin, end);
                    } else if (this.createTextRange) {
                        var range = this.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', end);
                        range.moveStart('character', begin);
                        range.select();
                    }
                });
            } else {
                if (this[0].setSelectionRange) {
                    begin = this[0].selectionStart;
                    end = this[0].selectionEnd;
                } else if (document.selection && document.selection.createRange) {
                    var range = document.selection.createRange();
                    begin = -range.duplicate().moveStart('character', -100000);
                    end = begin + range.text.length;
                }
                return {
                    "begin": begin,
                    "end": end
                };
            }
        };
    }
})(jQuery);

// JSON lint plugin gratefully swiped from
// [GitHub](https://github.com/umbrae/jsonlintdotcom)
(function($) {
    $.fn.validateJSON = function(options) {

        var settings, jsl;

        // Defaults, extended with options
        settings = $.extend({
            'reformat': true,
            'compress': false,
            'onSuccess': function() {},
            'onError': function(error) {}
        }, options);

        jsl = typeof(jsl) === 'undefined' ? {} : jsl;

        /**
         * JSON Lint Parser gratefully provided by Zach Carter
         * https://github.com/zaach/jsonlint
         **/
        jsl.parser = function() {
            var a = !0,
                b = !1,
                c = {},
                d = function() {
                    var a = {
                            trace: function() {},
                            yy: {},
                            symbols_: {
                                error: 2,
                                JSONString: 3,
                                STRING: 4,
                                JSONNumber: 5,
                                NUMBER: 6,
                                JSONNullLiteral: 7,
                                NULL: 8,
                                JSONBooleanLiteral: 9,
                                TRUE: 10,
                                FALSE: 11,
                                JSONText: 12,
                                JSONObject: 13,
                                EOF: 14,
                                JSONArray: 15,
                                JSONValue: 16,
                                "{": 17,
                                "}": 18,
                                JSONMemberList: 19,
                                JSONMember: 20,
                                ":": 21,
                                ",": 22,
                                "[": 23,
                                "]": 24,
                                JSONElementList: 25,
                                $accept: 0,
                                $end: 1
                            },
                            terminals_: {
                                2: "error",
                                4: "STRING",
                                6: "NUMBER",
                                8: "NULL",
                                10: "TRUE",
                                11: "FALSE",
                                14: "EOF",
                                17: "{",
                                18: "}",
                                21: ":",
                                22: ",",
                                23: "[",
                                24: "]"
                            },
                            productions_: [0, [3, 1],
                                [5, 1],
                                [7, 1],
                                [9, 1],
                                [9, 1],
                                [12, 2],
                                [12, 2],
                                [16, 1],
                                [16, 1],
                                [16, 1],
                                [16, 1],
                                [16, 1],
                                [16, 1],
                                [13, 2],
                                [13, 3],
                                [20, 3],
                                [19, 1],
                                [19, 3],
                                [15, 2],
                                [15, 3],
                                [25, 1],
                                [25, 3]
                            ],
                            performAction: function(a, b, c, d, e, f, g) {
                                var h = f.length - 1;
                                switch (e) {
                                    case 1:
                                        this.$ = a;
                                        break;
                                    case 2:
                                        this.$ = Number(a);
                                        break;
                                    case 3:
                                        this.$ = null;
                                        break;
                                    case 4:
                                        this.$ = !0;
                                        break;
                                    case 5:
                                        this.$ = !1;
                                        break;
                                    case 6:
                                        return this.$ = f[h - 1];
                                    case 7:
                                        return this.$ = f[h - 1];
                                    case 8:
                                        this.$ = f[h];
                                        break;
                                    case 9:
                                        this.$ = f[h];
                                        break;
                                    case 10:
                                        this.$ = f[h];
                                        break;
                                    case 11:
                                        this.$ = f[h];
                                        break;
                                    case 12:
                                        this.$ = f[h];
                                        break;
                                    case 13:
                                        this.$ = f[h];
                                        break;
                                    case 14:
                                        this.$ = {};
                                        break;
                                    case 15:
                                        this.$ = f[h - 1];
                                        break;
                                    case 16:
                                        this.$ = [f[h - 2], f[h]];
                                        break;
                                    case 17:
                                        this.$ = {}, this.$[f[h][0]] = f[h][1];
                                        break;
                                    case 18:
                                        this.$ = f[h - 2], f[h - 2][f[h][0]] = f[h][1];
                                        break;
                                    case 19:
                                        this.$ = [];
                                        break;
                                    case 20:
                                        this.$ = f[h - 1];
                                        break;
                                    case 21:
                                        this.$ = [f[h]];
                                        break;
                                    case 22:
                                        this.$ = f[h - 2], f[h - 2].push(f[h])
                                }
                            },
                            table: [{
                                12: 1,
                                13: 2,
                                15: 3,
                                17: [1, 4],
                                23: [1, 5]
                            }, {
                                1: [3]
                            }, {
                                14: [1, 6]
                            }, {
                                14: [1, 7]
                            }, {
                                3: 11,
                                4: [1, 12],
                                18: [1, 8],
                                19: 9,
                                20: 10
                            }, {
                                3: 18,
                                4: [1, 12],
                                5: 19,
                                6: [1, 25],
                                7: 16,
                                8: [1, 22],
                                9: 17,
                                10: [1, 23],
                                11: [1, 24],
                                13: 20,
                                15: 21,
                                16: 15,
                                17: [1, 4],
                                23: [1, 5],
                                24: [1, 13],
                                25: 14
                            }, {
                                1: [2, 6]
                            }, {
                                1: [2, 7]
                            }, {
                                14: [2, 14],
                                18: [2, 14],
                                22: [2, 14],
                                24: [2, 14]
                            }, {
                                18: [1, 26],
                                22: [1, 27]
                            }, {
                                18: [2, 17],
                                22: [2, 17]
                            }, {
                                21: [1, 28]
                            }, {
                                18: [2, 1],
                                21: [2, 1],
                                22: [2, 1],
                                24: [2, 1]
                            }, {
                                14: [2, 19],
                                18: [2, 19],
                                22: [2, 19],
                                24: [2, 19]
                            }, {
                                22: [1, 30],
                                24: [1, 29]
                            }, {
                                22: [2, 21],
                                24: [2, 21]
                            }, {
                                18: [2, 8],
                                22: [2, 8],
                                24: [2, 8]
                            }, {
                                18: [2, 9],
                                22: [2, 9],
                                24: [2, 9]
                            }, {
                                18: [2, 10],
                                22: [2, 10],
                                24: [2, 10]
                            }, {
                                18: [2, 11],
                                22: [2, 11],
                                24: [2, 11]
                            }, {
                                18: [2, 12],
                                22: [2, 12],
                                24: [2, 12]
                            }, {
                                18: [2, 13],
                                22: [2, 13],
                                24: [2, 13]
                            }, {
                                18: [2, 3],
                                22: [2, 3],
                                24: [2, 3]
                            }, {
                                18: [2, 4],
                                22: [2, 4],
                                24: [2, 4]
                            }, {
                                18: [2, 5],
                                22: [2, 5],
                                24: [2, 5]
                            }, {
                                18: [2, 2],
                                22: [2, 2],
                                24: [2, 2]
                            }, {
                                14: [2, 15],
                                18: [2, 15],
                                22: [2, 15],
                                24: [2, 15]
                            }, {
                                3: 11,
                                4: [1, 12],
                                20: 31
                            }, {
                                3: 18,
                                4: [1, 12],
                                5: 19,
                                6: [1, 25],
                                7: 16,
                                8: [1, 22],
                                9: 17,
                                10: [1, 23],
                                11: [1, 24],
                                13: 20,
                                15: 21,
                                16: 32,
                                17: [1, 4],
                                23: [1, 5]
                            }, {
                                14: [2, 20],
                                18: [2, 20],
                                22: [2, 20],
                                24: [2, 20]
                            }, {
                                3: 18,
                                4: [1, 12],
                                5: 19,
                                6: [1, 25],
                                7: 16,
                                8: [1, 22],
                                9: 17,
                                10: [1, 23],
                                11: [1, 24],
                                13: 20,
                                15: 21,
                                16: 33,
                                17: [1, 4],
                                23: [1, 5]
                            }, {
                                18: [2, 18],
                                22: [2, 18]
                            }, {
                                18: [2, 16],
                                22: [2, 16]
                            }, {
                                22: [2, 22],
                                24: [2, 22]
                            }],
                            defaultActions: {
                                6: [2, 6],
                                7: [2, 7]
                            },
                            parseError: function(a, b) {
                                throw new Error(a)
                            },
                            parse: function(a) {
                                function o() {
                                    var a;
                                    a = b.lexer.lex() || 1, typeof a != "number" && (a = b.symbols_[a] || a);
                                    return a
                                }

                                function n(a) {
                                    c.length = c.length - 2 * a, d.length = d.length - a, e.length = e.length - a
                                }
                                var b = this,
                                    c = [0],
                                    d = [null],
                                    e = [],
                                    f = this.table,
                                    g = "",
                                    h = 0,
                                    i = 0,
                                    j = 0,
                                    k = 2,
                                    l = 1;
                                this.lexer.setInput(a), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, typeof this.lexer.yylloc == "undefined" && (this.lexer.yylloc = {});
                                var m = this.lexer.yylloc;
                                e.push(m), typeof this.yy.parseError == "function" && (this.parseError = this.yy.parseError);
                                var p, q, r, s, t, u, v = {},
                                    w, x, y, z;
                                for (;;) {
                                    r = c[c.length - 1], this.defaultActions[r] ? s = this.defaultActions[r] : (p == null && (p = o()), s = f[r] && f[r][p]);
                                    if (typeof s == "undefined" || !s.length || !s[0]) {
                                        if (!j) {
                                            z = [];
                                            for (w in f[r]) this.terminals_[w] && w > 2 && z.push("'" + this.terminals_[w] + "'");
                                            var A = "";
                                            this.lexer.showPosition ? A = "Parse error on line " + (h + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + z.join(", ") : A = "Parse error on line " + (h + 1) + ": Unexpected " + (p == 1 ? "end of input" : "'" + (this.terminals_[p] || p) + "'"), this.parseError(A, {
                                                text: this.lexer.match,
                                                token: this.terminals_[p] || p,
                                                line: this.lexer.yylineno,
                                                loc: m,
                                                expected: z
                                            })
                                        }
                                        if (j == 3) {
                                            if (p == l) throw new Error(A || "Parsing halted.");
                                            i = this.lexer.yyleng, g = this.lexer.yytext, h = this.lexer.yylineno, m = this.lexer.yylloc, p = o()
                                        }
                                        for (;;) {
                                            if (k.toString() in f[r]) break;
                                            if (r == 0) throw new Error(A || "Parsing halted.");
                                            n(1), r = c[c.length - 1]
                                        }
                                        q = p, p = k, r = c[c.length - 1], s = f[r] && f[r][k], j = 3
                                    }
                                    if (s[0] instanceof Array && s.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + r + ", token: " + p);
                                    switch (s[0]) {
                                        case 1:
                                            c.push(p), d.push(this.lexer.yytext), e.push(this.lexer.yylloc), c.push(s[1]), p = null, q ? (p = q, q = null) : (i = this.lexer.yyleng, g = this.lexer.yytext, h = this.lexer.yylineno, m = this.lexer.yylloc, j > 0 && j--);
                                            break;
                                        case 2:
                                            x = this.productions_[s[1]][1], v.$ = d[d.length - x], v._$ = {
                                                first_line: e[e.length - (x || 1)].first_line,
                                                last_line: e[e.length - 1].last_line,
                                                first_column: e[e.length - (x || 1)].first_column,
                                                last_column: e[e.length - 1].last_column
                                            }, u = this.performAction.call(v, g, i, h, this.yy, s[1], d, e);
                                            if (typeof u != "undefined") return u;
                                            x && (c = c.slice(0, -1 * x * 2), d = d.slice(0, -1 * x), e = e.slice(0, -1 * x)), c.push(this.productions_[s[1]][0]), d.push(v.$), e.push(v._$), y = f[c[c.length - 2]][c[c.length - 1]], c.push(y);
                                            break;
                                        case 3:
                                            return !0
                                    }
                                }
                                return !0
                            }
                        },
                        f = function() {
                            var a = {
                                EOF: 1,
                                parseError: function(a, b) {
                                    if (this.yy.parseError) this.yy.parseError(a, b);
                                    else throw new Error(a)
                                },
                                setInput: function(a) {
                                    this._input = a, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                                        first_line: 1,
                                        first_column: 0,
                                        last_line: 1,
                                        last_column: 0
                                    };
                                    return this
                                },
                                input: function() {
                                    var a = this._input[0];
                                    this.yytext += a, this.yyleng++, this.match += a, this.matched += a;
                                    var b = a.match(/\n/);
                                    b && this.yylineno++, this._input = this._input.slice(1);
                                    return a
                                },
                                unput: function(a) {
                                    this._input = a + this._input;
                                    return this
                                },
                                more: function() {
                                    this._more = !0;
                                    return this
                                },
                                pastInput: function() {
                                    var a = this.matched.substr(0, this.matched.length - this.match.length);
                                    return (a.length > 20 ? "..." : "") + a.substr(-20).replace(/\n/g, "")
                                },
                                upcomingInput: function() {
                                    var a = this.match;
                                    a.length < 20 && (a += this._input.substr(0, 20 - a.length));
                                    return (a.substr(0, 20) + (a.length > 20 ? "..." : "")).replace(/\n/g, "")
                                },
                                showPosition: function() {
                                    var a = this.pastInput(),
                                        b = Array(a.length + 1).join("-");
                                    return a + this.upcomingInput() + "\n" + b + "^"
                                },
                                next: function() {
                                    if (this.done) return this.EOF;
                                    this._input || (this.done = !0);
                                    var a, b, c, d;
                                    this._more || (this.yytext = "", this.match = "");
                                    var e = this._currentRules();
                                    for (var f = 0; f < e.length; f++) {
                                        b = this._input.match(this.rules[e[f]]);
                                        if (b) {
                                            d = b[0].match(/\n.*/g), d && (this.yylineno += d.length), this.yylloc = {
                                                first_line: this.yylloc.last_line,
                                                last_line: this.yylineno + 1,
                                                first_column: this.yylloc.last_column,
                                                last_column: d ? d[d.length - 1].length - 1 : this.yylloc.last_column + b[0].length
                                            }, this.yytext += b[0], this.match += b[0], this.matches = b, this.yyleng = this.yytext.length, this._more = !1, this._input = this._input.slice(b[0].length), this.matched += b[0], a = this.performAction.call(this, this.yy, this, e[f], this.conditionStack[this.conditionStack.length - 1]);
                                            if (a) return a;
                                            return
                                        }
                                    }
                                    if (this._input === "") return this.EOF;
                                    this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                                        text: "",
                                        token: null,
                                        line: this.yylineno
                                    })
                                },
                                lex: function() {
                                    var a = this.next();
                                    return typeof a != "undefined" ? a : this.lex()
                                },
                                begin: function(a) {
                                    this.conditionStack.push(a)
                                },
                                popState: function() {
                                    return this.conditionStack.pop()
                                },
                                _currentRules: function() {
                                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
                                }
                            };
                            a.performAction = function(a, b, c, d) {
                                var e = d;
                                switch (c) {
                                    case 0:
                                        break;
                                    case 1:
                                        return 6;
                                    case 2:
                                        b.yytext = b.yytext.substr(1, b.yyleng - 2);
                                        return 4;
                                    case 3:
                                        return 17;
                                    case 4:
                                        return 18;
                                    case 5:
                                        return 23;
                                    case 6:
                                        return 24;
                                    case 7:
                                        return 22;
                                    case 8:
                                        return 21;
                                    case 9:
                                        return 10;
                                    case 10:
                                        return 11;
                                    case 11:
                                        return 8;
                                    case 12:
                                        return 14;
                                    case 13:
                                        return "INVALID"
                                }
                            }, a.rules = [/^\s+/, /^-?([0-9]|[1-9][0-9]+)(\.[0-9]+)?([eE][-+]?[0-9]+)?\b/, /^"(\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^\0-\x09\x0a-\x1f"\\])*"/, /^\{/, /^\}/, /^\[/, /^\]/, /^,/, /^:/, /^true\b/, /^false\b/, /^null\b/, /^$/, /^./], a.conditions = {
                                INITIAL: {
                                    rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                                    inclusive: !0
                                }
                            };
                            return a
                        }();
                    a.lexer = f;
                    return a
                }();
            typeof a != "undefined" && typeof c != "undefined" && (c.parser = d, c.parse = function() {
                return d.parse.apply(d, arguments)
            }, c.main = function(b) {
                if (!b[1]) throw new Error("Usage: " + b[0] + " FILE");
                if (typeof process != "undefined") var d = a("fs").readFileSync(a("path").join(process.cwd(), b[1]), "utf8");
                else var e = a("file").path(a("file").cwd()),
                    d = e.join(b[1]).read({
                        charset: "utf-8"
                    });
                return c.parser.parse(d)
            }, typeof b != "undefined" && a.main === b && c.main(typeof process != "undefined" ? process.argv.slice(1) : a("system").args));
            return c
        }()

        /**
         * jsl.format - Provide json reformatting in a character-by-character approach, so that even invalid JSON may be reformatted (to the best of its ability).
         *
         **/
        jsl.format = (function() {

            function repeat(s, count) {
                return new Array(count + 1).join(s);
            }

            function formatJson(json) {
                var i = 0,
                    il = 0,
                    tab = "    ",
                    newJson = "",
                    indentLevel = 0,
                    inString = false,
                    currentChar = null;

                for (i = 0, il = json.length; i < il; i += 1) {
                    currentChar = json.charAt(i);

                    switch (currentChar) {
                        case '{':
                        case '[':
                            if (!inString) {
                                newJson += currentChar + "\n" + repeat(tab, indentLevel + 1);
                                indentLevel += 1;
                            } else {
                                newJson += currentChar;
                            }
                            break;
                        case '}':
                        case ']':
                            if (!inString) {
                                indentLevel -= 1;
                                newJson += "\n" + repeat(tab, indentLevel) + currentChar;
                            } else {
                                newJson += currentChar;
                            }
                            break;
                        case ',':
                            if (!inString) {
                                newJson += ",\n" + repeat(tab, indentLevel);
                            } else {
                                newJson += currentChar;
                            }
                            break;
                        case ':':
                            if (!inString) {
                                newJson += ": ";
                            } else {
                                newJson += currentChar;
                            }
                            break;
                        case ' ':
                        case "\n":
                        case "\t":
                            if (inString) {
                                newJson += currentChar;
                            }
                            break;
                        case '"':
                            if (i > 0 && json.charAt(i - 1) !== '\\') {
                                inString = !inString;
                            }
                            newJson += currentChar;
                            break;
                        default:
                            newJson += currentChar;
                            break;
                    }
                }

                return newJson;
            }

            return {
                "formatJson": formatJson
            };

        }());


        /**
         * Get the Nth position of a character in a string
         * @searchStr the string to search through
         * @char the character to find
         * @pos int the nth character to find, 1 based.
         *
         * @return int the position of the character found
         **/

        function getNthPos(searchStr, char, pos) {
            var i, charCount = 0,
                strArr = searchStr.split(char);

            if (pos === 0) {
                return 0;
            }

            for (i = 0; i < pos; i++) {
                if (i >= strArr.length) {
                    return -1;
                }

                // +1 because we split out some characters
                charCount += strArr[i].length + char.length;
            }

            return charCount;
        }


        /**
         * Validate the JSON we've been given, displaying an error or success message.
         * @return void
         **/

        function validate() {
            var el, val, valid, lineNum, lineMatches, lineStart, lineEnd, result;

            el = $(this);
            val = el.val().trim();
            valid = false;

            try {
                result = jsl.parser.parse(val);

                if (result) {
                    if (settings.reformat) {
                        el.val(JSON.stringify(JSON.parse(val), null, "    "));
                    }

                    if (settings.compress) {
                        el.val(JSON.stringify(JSON.parse(val), null, ""));
                    }
                    valid = true;

                } else {
                    result = {};
                    valid = false;
                }
            } catch (parseException) {

                /**
                 * If we failed to validate, run our manual formatter and then re-validate so that we
                 * can get a better line number. On a successful validate, we don't want to run our
                 * manual formatter because the automatic one is faster and probably more reliable.
                 **/
                try {
                    if (settings.reformat) {
                        val = jsl.format.formatJson(val);
                        el.val(val);
                        result = jsl.parser.parse(el.val());
                    }
                } catch (e) {
                    parseException = e;
                }

                lineMatches = parseException.message.match(/line ([0-9]*)/);
                if (lineMatches && typeof lineMatches === "object" && lineMatches.length > 1) {
                    lineNum = parseInt(lineMatches[1], 10);

                    if (lineNum === 1) {
                        lineStart = 0;
                    } else {
                        lineStart = getNthPos(val, "\n", lineNum - 1);
                    }

                    lineEnd = val.indexOf("\n", lineStart);
                    if (lineEnd < 0) {
                        lineEnd = val.length;
                    }

                    result = JSON.stringify(parseException);
                    el.focus().caret(lineStart, lineEnd);
                }

                valid = false;
            }

            return {
                valid: valid,
                json: result
            };
        }
        // Do it
        return this.each(function() {
            var resp = validate.apply(this);

            // Call the handler
            settings[(resp.valid ? 'onSuccess' : 'onError')].apply(this, [resp]);
        });

    };
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _validateJson = __webpack_require__(0);

var _validateJson2 = _interopRequireDefault(_validateJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @type {{server: {accepted: [*]}, lang: string, user: string, callback: boolean, export: string, dialog: boolean, save: boolean, listener: string, version: string, languageRoot: string, methods: {g: string, p: string}, dom: {b: string, h: string}, objects: {o: string, e: string, h: string, w: string, i: string, b: string, c: string, ca: string, he: string, hi: string, cl: string, r: string, bo: string, g: string, l: string, ls: string, ro: string, re: string, el: string, form: {l: string}}, handlers: {d: string, t: string, i: string, r: string, s: string}, params: {s: string, e: string, g: string}, storage: {t: string, n: string}, language: {e: string, f: string}, animation: {d: {min: number, max: number}}}}
 */
var app = {
    server: {
        accepted: [{
            alias: "tlh",
            url: "https://cdn.shopify.com/s/files/1/0050/3522/t/22/assets/banners.json"
        }, {
            alias: "alti",
            url: "https://cdn.shopify.com/s/files/1/1230/9376/t/2/assets/ALTI-banners.json"
        }]
    },
    lang: "en_EN",
    user: "guest",
    callback: true,
    export: "json",
    dialog: true,
    save: true,
    listener: "window",
    version: "assets/project/release.json",
    languageRoot: "data/language/",
    methods: {
        g: "get",
        p: "post"
    },
    dom: {
        b: "body",
        h: "html"
    },
    objects: {
        o: "#output",
        e: "#entry",
        h: "#html-zone",
        w: "#wrapper",
        i: ".input_holders",
        b: ".blackify_overlay",
        c: ".check_image",
        ca: ".check_alt_image",
        he: "#help",
        hi: ".help_item",
        cl: ".clonedInput",
        r: "html,body",
        bo: "body",
        g: ".glyphicon",
        l: ".loadLsItems",
        ls: "#loadandsave-zone",
        ro: ".render_output",
        re: ".reordered",
        el: ".errorList",
        form: {
            l: "schema/layout.json"
        }
    },
    handlers: {
        d: 'data-handler',
        t: 'data-theme',
        i: 'data-item',
        r: 'data-reason',
        s: 'data-split'
    },
    params: {
        s: 'small',
        e: 'error',
        g: 'good'
    },
    storage: {
        t: 'pgb_Theme',
        n: 'pgb_SavedNode_LS'
    },
    language: {
        e: 'en',
        f: 'fr'
    },
    animation: {
        d: {
            min: 500,
            max: 5000
        }
    }
}; /*
    * Webapp created by David Maser for use on The Last Hunt site. Use outside of the Altitude-Sports domains is not allowed.
    */

var pfHero = 0;
var pfMode = app.params.s;
var pfExport = 'hero';
var sPos = 0;
var pfLang = app.lang;
/**
 *
 * @type {{panelAlert: core.panelAlert, getVersion: core.getVersion, languageManager: core.languageManager, initVersionUpdate: core.initVersionUpdate, tagNew: core.tagNew, initializeForm: core.initializeForm, switchModes: core.switchModes, initializeTheme: core.initializeTheme, initHelp: core.initHelp, setHeadSec: core.setHeadSec, launchBats: core.launchBats, killBats: core.killBats, resetItems: core.resetItems, choseLocalSave: core.choseLocalSave, doLocalSave: core.doLocalSave, scrollState: core.scrollState, openInNewTab: core.OpenInNewTab, addMulti: core.addMulti, jumpToHelper: core.jumpToHelper, saveNodeToLS: core.saveNodeToLS, addItems: core.addItems, deleteItems: core.deleteItems, validateJSON: core.validateJSON, errorHandler: core.errorHandler, registerErrorButtons: core.registerErrorButtons, traverseJSON: core.traverseJSON, jsonToForm: core.jsonToForm, prepareJSON: core.prepareJSON, outputJson: core.outputJson, urlExists: core.urlExists, validateImage: core.validateImage, previewFeature: core.previewFeature, loadAPIparams: core.loadAPIparams, planBify: core.planBify, cleanWhitespace: core.cleanWhitespace, cacheClickedItem: core.cacheClickedItem}}
 * @constructor
 */
var core = {
    /**
     * Panel alert function - Creates a bottom panel alert view
     * that slides into view with a
     * defined message.
     * @param {String} mess Defines the message that will be displayed in the alert panel
     * @param {String} state State defines the reason for the alert. Can be 'error' or 'good'
     * @constructor
     */
    panelAlert: function panelAlert(mess, state) {
        var dispLeng = 10000;
        if (app.dialog === true) {
            var mPane = '.panel-body.bottom_level_bt';
            if (state === app.params.e) {
                $(mPane).find(app.objects.g).removeClass('allGood').removeClass('glyphicon-ok').addClass('allBad').addClass('glyphicon-remove');
                dispLeng = app.animation.d.max;
            } else if (state === app.params.g) {
                $(mPane).find(app.objects.g).removeClass('allBad').removeClass('glyphicon-remove').addClass('allGood').addClass('glyphicon-ok');
                dispLeng = 10000;
            }
            $(mPane).slideDown();
            $(mPane).find('.inner_message').html(mess);
            window.setTimeout(function () {
                $('.panel-body.bottom_level_bt').slideUp();
            }, dispLeng);
        }
    },

    /**
     * Recovers and displays the app version from
     * the release.json file. init=false checks the
     * current version against the server json and
     * initializes and update prompt if the local
     * version is outdated.
     * @param {Boolean} init Define wether the function is initializing or if this is a summary execution
     * @constructor
     */
    getVersion: function getVersion(init) {
        try {
            $.ajax({
                type: app.methods.g,
                url: app.version,
                success: function success(data) {
                    var ver = data.project.version;
                    var sup = data.project.history.length - 1;
                    var lup = data.project.history[sup].date;
                    if (init === true) {
                        document.title = "Page Builder " + ver;
                        $('.version_number').attr('title', "You are using version " + ver + ", last updated " + lup).html(ver);
                        $('html').attr('data-version', ver);
                        core.tagNew(ver);
                    } else if (init === false) {
                        var cur = $('html').attr('data-version');
                        if (cur < ver || cur > ver) {
                            core.initVersionUpdate();
                        }
                    }
                }
            });
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * Language manager that handles the switching between
     * english and french
     * @param {String} lng Define the language to be queried. Can be en_EN or fr_FR
     * @param {Boolean} init Define wether the language manager should be initialized or if this is a summary language translation process
     * @constructor
     */
    languageManager: function languageManager(lng, init) {
        var newLang = void 0;
        lng = $(app.dom.h).attr('data-language') || lng;
        switch (lng) {
            case "en_EN":
                newLang = 'fr_FR';
                $('.app_lang_toggle').attr('data-set-lang', newLang);
                init !== true ? $(app.dom.h).attr('data-language', newLang) : null;
                break;
            case "fr_FR":
                newLang = 'en_EN';
                $('.app_lang_toggle').attr('data-set-lang', newLang);
                init !== true ? $(app.dom.h).attr('data-language', newLang) : null;
                break;
        }
        /**
         * Function iterates through page objects and
         * applies the translations
         * @param {Object} obj Object contains an array of language items picked up by html data attributes. This is used by the parent function
         * @constructor
         */
        function translatePageItems(obj) {
            for (var o in obj) {
                $("[data-lang-id=\"" + obj[o].objID + "\"]").html(obj[o].objTran);
            }
        }
        try {
            if (init === true) {
                newLang = lng;
            }
            $.ajax({
                type: app.methods.g,
                url: "data/language/" + newLang + ".json",
                success: function success(data) {
                    var actionLen = data.node.section[0].actions.length;
                    var loadLen = data.node.section[1].load.length;
                    var errorLen = data.node.section[2].errors.length;
                    var helpLen = data.node.section[3].help.length;
                    var lngContainer = [];
                    for (var i = 0; i < actionLen; i++) {
                        lngContainer.push({
                            objID: data.node.section[0].actions[i].id,
                            objTran: data.node.section[0].actions[i].translate
                        });
                    }
                    for (var j = 0; j < loadLen; j++) {
                        lngContainer.push({
                            objID: data.node.section[1].load[j].id,
                            objTran: data.node.section[1].load[j].translate
                        });
                    }
                    for (var k = 0; k < errorLen; k++) {
                        lngContainer.push({
                            objID: data.node.section[2].errors[k].id,
                            objTran: data.node.section[2].errors[k].translate
                        });
                    }
                    for (var l = 0; l < helpLen; l++) {
                        lngContainer.push({
                            objID: data.node.section[3].help[l].id,
                            objTran: data.node.section[3].help[l].translate
                        });
                    }
                    new translatePageItems(lngContainer);
                }
            });
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * Prompts the user to reload the page if a
     * newer version of the app has been detected
     * remotely.
     * @constructor
     */
    initVersionUpdate: function initVersionUpdate() {
        $('.init-update').remove();
        var pageData = '<div class="init-update"><div class="blackify_overlay"><div class="prompt-update"><div class="prompt-icon"><span class="glyphicon glyphicon-cloud-download" aria-hidden="true"></span></div><div class="prompt-message">A newer version of the PageBuilder app has been detected. Do you want to load the newer version now? <br><br>Make sure you save all your work before answering YES.</div><div class="prompt-choice"><button type="button" class="btn btn-update true" data-toggle="dropdown" aria-expanded="false">YES</button><button type="button" class="btn btn-update false" data-toggle="dropdown" aria-expanded="false">NO</button></div></div></div></div>';
        $(app.dom.b).append(pageData).on('click', '.btn-update.true', function () {
            location.reload();
        }).on('click', '.btn-update.false', function () {
            $('.btn-update.false').parent().parent().parent().parent().remove();
            core.panelAlert('Version update stopped. The update prompt will reappear at the next update interval.', 'good');
        });
    },

    /**
     * Tags new items by comparing the current app
     * version to the data-version attribute on
     * main menu links
     * @param {Number} ver
     * @constructor
     */
    tagNew: function tagNew(ver) {
        var cssBlock = "<style>.main_nav a[data-version=\"" + ver + "\"]:after,.bigboy a[data-version=\"" + ver + "\"]:after {content: \"new\";float: right;background-color: #f0ad4e;padding: 2px 5px;font-size: 10px;color: #fff;font-weight: bold;}</style>";
        $(app.dom.b).append(cssBlock).find("a[data-version=\"" + ver + "\"]").attr('title', 'This feature is new to the current version');
    },

    /**
     * creates the initial form instance by
     * populating the parent container with
     * elements defined in a layout.json
     * file
     * @constructor
     */
    initializeForm: function initializeForm() {
        $.ajax({
            type: app.methods.g,
            url: app.objects.form.l,
            success: function success(data) {
                var dataBlock = data.layout;
                var htmlBlock = "<div id=\"entry1\" class=\"clonedInput\" " + app.handlers.s + "=\"1\"><form action=\"" + dataBlock.form_action + "\" method=\"" + dataBlock.method + "\" id=\"" + dataBlock.form_id + "\" role=\"form\">";
                htmlBlock += dataBlock.header;
                htmlBlock += '<fieldset>';
                var blockContent = dataBlock.block;
                var blockLen = blockContent.length;
                for (var i = 0; i < blockLen; i++) {
                    if (blockContent[i].display !== 'custom') {
                        if (i % 2 === 0 || i === 0) {
                            if (blockContent[i].wrap_group === true) {
                                htmlBlock += "<div class=\"" + blockContent[i].wrap_group_class + "\">";
                            }
                            htmlBlock += '<div class="form-group">';
                            var blocker = ' lItem';
                        } else {
                            blocker = '';
                        }
                        if (blockContent[i].display !== 'empty') {
                            switch (blockContent[i].display) {
                                case "full":
                                    var _line = '';
                                    blocker = '';
                                    break;
                                case "half":
                                    _line = 'half_span';
                                    break;
                            }
                            htmlBlock += "<div class=\"" + line + " " + blocker + "\">";
                            htmlBlock += "<label class=\"label_fn control-label\" for=\"" + blockContent[i].obj_id + "\">" + blockContent[i].label + "</label>";
                            if (blockContent[i].wrap === true) {
                                htmlBlock += "<div class=\"" + blockContent[i].wrap_class + "\">";
                            }
                            if (blockContent[i].inject_code !== '') {
                                htmlBlock += blockContent[i].inject_code;
                            }
                            if (blockContent[i].input_obj === 'text') {
                                htmlBlock += '<input';
                                if (blockContent[i].obj_id !== '') {
                                    htmlBlock += " id=\"" + blockContent[i].obj_id + "\" name=\"" + blockContent[i].obj_id + "\"";
                                }
                                htmlBlock += " type=\"text\" placeholder=\"" + blockContent[i].placeholder + "\" class=\"input_fn form-control";
                                if (blockContent[i].class !== '') {
                                    htmlBlock += " " + blockContent[i].class;
                                }
                                if (blockContent[i].obj_label !== '') {
                                    htmlBlock += " " + blockContent[i].obj_label;
                                }
                                htmlBlock += '"';
                                if (blockContent[i].options !== null) {
                                    var opLen = blockContent[i].options.length;
                                    for (var j = 0; j < opLen; j++) {
                                        htmlBlock += " " + blockContent[i].options[j].item + "=\"" + blockContent[i].options[j].value + "\"";
                                    }
                                }
                                if (blockContent[i].data !== null) {
                                    var dtLen = blockContent[i].data.length;
                                    for (var k = 0; k < dtLen; k++) {
                                        htmlBlock += " data-" + blockContent[i].data[k].item + "=\"" + blockContent[i].data[k].value + "\"";
                                    }
                                }
                                htmlBlock += '>';
                            } else if (blockContent[i].input_obj === 'radio') {
                                htmlBlock += '<input';
                                htmlBlock += ' type="radio"';
                                if (blockContent[i].class !== '') {
                                    htmlBlock += " class=\"" + blockContent[i].class + "\"";
                                }
                                if (blockContent[i].obj_label !== '') {
                                    htmlBlock += " " + blockContent[i].obj_label;
                                }
                                if (blockContent[i].obj_id !== '') {
                                    htmlBlock += " id=\"" + blockContent[i].obj_id + "\" name=\"" + blockContent[i].obj_id + "\"";
                                }
                                if (blockContent[i].options !== null) {
                                    opLen = blockContent[i].options.length;
                                    for (j = 0; j < opLen; j++) {
                                        htmlBlock += " " + blockContent[i].options[j].item + "=\"" + blockContent[i].options[j].value + "\"";
                                        if (blockContent[i].options[j].default !== undefined) {
                                            htmlBlock += " " + blockContent[i].options[j].default;
                                        }
                                    }
                                }
                                if (blockContent[i].data !== null) {
                                    dtLen = blockContent[i].data.length;
                                    for (k = 0; k < dtLen; k++) {
                                        htmlBlock += " data-" + blockContent[i].data[k].item + "=\"" + blockContent[i].data[k].value + "\"";
                                    }
                                }
                                htmlBlock += '>';
                            } else if (blockContent[i].input_obj === 'select') {
                                htmlBlock += '<select';
                                if (blockContent[i].class !== '') {
                                    htmlBlock += " class=\"form-control " + blockContent[i].class + "\"";
                                }
                                if (blockContent[i].obj_label !== '') {
                                    htmlBlock += " " + blockContent[i].obj_label;
                                }
                                if (blockContent[i].obj_id !== '') {
                                    htmlBlock += " id=\"" + blockContent[i].obj_id + "\" name=\"" + blockContent[i].obj_id + "\"";
                                    if (blockContent[i].data !== null) {
                                        dtLen = blockContent[i].data.length;
                                        for (k = 0; k < dtLen; k++) {
                                            htmlBlock += " data-" + blockContent[i].data[k].item + "=\"" + blockContent[i].data[k].value + "\"";
                                        }
                                    }
                                }
                                htmlBlock += '>';
                                if (blockContent[i].options !== null) {
                                    opLen = blockContent[i].options.length;
                                    for (j = 0; j < opLen; j++) {
                                        htmlBlock += '<option';
                                        htmlBlock += " " + blockContent[i].options[j].item + "=\"" + blockContent[i].options[j].value + "\"";
                                        if (blockContent[i].options[j].default !== undefined) {
                                            htmlBlock += " " + blockContent[i].options[j].default;
                                        }
                                        htmlBlock += ">" + blockContent[i].options[j].label;
                                        htmlBlock += '</option>';
                                    }
                                }
                                htmlBlock += '</select>';
                            }
                            if (blockContent[i].append !== '') {
                                htmlBlock += blockContent[i].append;
                            }
                            if (blockContent[i].wrap === true) {
                                htmlBlock += '</div>';
                            }
                            htmlBlock += '</div>';
                        }
                        if (i % 2 === 1) {
                            htmlBlock += '</div>';
                            if (blockContent[i].wrap_group === true) {
                                htmlBlock += '</div>';
                            }
                        }
                    } else {
                        htmlBlock += blockContent[i].inject_code;
                    }
                }
                htmlBlock += '</fieldset>';
                htmlBlock += '</form></div>';
            }
        });
    },

    /**
     * switches the page builder mode from
     * Hero builder mode to Hello Bar
     * builder mode
     * @param {String} va Can be 'hello' or 'hero'. If null or undefined, defaults to 'hero'
     * @constructor
     */
    switchModes: function switchModes(va) {
        if (va === 'hello') {
            $('*[data-role="hero"]').css('display', 'none');
            $('*[data-role="hello"]').css('display', 'block');
            pfExport = 'hello';
            $('.submit_json').attr('data-nmode', 'hello');
            core.panelAlert('Switched to Hello Banner Creation mode', 'good');
        } else {
            $('*[data-role="hello"]').css('display', 'none');
            $('*[data-role="hero"]').attr('style', '');
            pfExport = 'hero';
            $('.submit_json').attr('data-nmode', 'hero');
            core.panelAlert('Switched to Hero Banner Creation mode', 'good');
        }
    },

    /**
     * reads and/or sets the html theme data attribute
     * from the local storage item
     * @constructor
     */
    initializeTheme: function initializeTheme() {
        if (window.localStorage) {
            var tm = localStorage.getItem(app.storage.t);
            if (tm === null || tm === undefined) {
                $('html').attr(app.handlers.t, 'light');
            } else {
                $('html').attr(app.handlers.t, tm);
            }
        } else {
            $('html').attr(app.handlers.t, 'light');
        }
    },

    /**
     * Initialize the help view by loading items
     * from the help.json file
     * @constructor
     */
    initHelp: function initHelp() {
        $.ajax({
            type: app.methods.g,
            url: 'data/help.json',
            success: function success(data) {
                for (var h = 0; h < data.items.length; h++) {
                    if (h > 0) {
                        var push = 'push_block';
                    } else {
                        push = '';
                    }
                    $('.help-items').append("<li><a class=\"helpItem\" data-target=\"" + h + "\">" + data.items[h].title + "</a></li>");
                    $('.help_panel_holder').append("<div class=\"help_item\" id=\"hlp" + h + "\" data-helper=\"" + h + "\"><h4 class=\"" + push + "\">" + data.items[h].title + "</h4>" + data.items[h].block + "</div>");
                }
            },
            error: function error() {
                core.panelAlert('Unable to load Help Contents from JSON source', 'error');
            }
        });
    },

    /**
     * sets head section items that display in a button model
     * the locally saved hero items for rapid translation of
     * the JSON data
     * @constructor
     */
    setHeadSec: function setHeadSec() {
        try {
            var isReady = localStorage.getItem(app.storage.n);
            if (isReady !== null) {
                $(app.objects.l).css('display', 'inline-block');
                $('#import_json').css('display', 'block');
                $('.lsLoad').find('li').remove();
                var a = localStorage.getItem(app.storage.n).split(',');
                var long = a.length;
                if (long > 1) {
                    for (var i = 0; i < long; i++) {
                        if (a[i] !== '') {
                            $('.lsLoad').append("<li><a href=\"#\" class=\"loadItem\" " + app.handlers.i + "=\"" + a[i] + "\">" + a[i] + "</a></li>");
                        }
                    }
                } else {
                    $(app.objects.l).hide();
                }
            } else {
                $(app.objects.l).css('display', 'none');
                $('#import_json').css('display', 'none');
            }
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * A useless script that runs at halloween
     * and shows flying bats on the page.
     * @constructor
     */
    launchBats: function launchBats() {
        var r = Math.random;
        var n = 0;
        var d = document;
        var w = window;
        var i = d.createElement('img');
        var z = d.createElement('div');
        var zs = z.style;
        var a = w.innerWidth * r();
        var b = w.innerHeight * r();
        z.className = 'oooobats';
        zs.position = "fixed";
        zs.left = 0;
        zs.top = 0;
        zs.opacity = 0;
        z.appendChild(i);
        i.src = 'data:image/gif;base64,R0lGODlhMAAwAJECAAAAAEJCQv///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAQACACwAAAAAMAAwAAACdpSPqcvtD6NcYNpbr4Z5ewV0UvhRohOe5UE+6cq0carCgpzQuM3ut16zvRBAH+/XKQ6PvaQyCFs+mbnWlEq0FrGi15XZJSmxP8OTRj4DyWY1lKdmV8fyLL3eXOPn6D3f6BcoOEhYaHiImKi4yNjo+AgZKTl5WAAAIfkECQEAAgAsAAAAADAAMAAAAnyUj6nL7Q+jdCDWicF9G1vdeWICao05ciUVpkrZIqjLwCdI16s+5wfck+F8JOBiR/zZZAJk0mAsDp/KIHRKvVqb2KxTu/Vdvt/nGFs2V5Bpta3tBcKp8m5WWL/z5PpbtH/0B/iyNGh4iJiouMjY6PgIGSk5SVlpeYmZqVkAACH5BAkBAAIALAAAAAAwADAAAAJhlI+py+0Po5y02ouz3rz7D4biSJbmiabq6gCs4B5AvM7GTKv4buby7vsAbT9gZ4h0JYmZpXO4YEKeVCk0QkVUlw+uYovE8ibgaVBSLm1Pa3W194rL5/S6/Y7P6/f8vp9SAAAh+QQJAQACACwAAAAAMAAwAAACZZSPqcvtD6OctNqLs968+w+G4kiW5omm6ooALeCusAHHclyzQs3rOz9jAXuqIRFlPJ6SQWRSaIQOpUBqtfjEZpfMJqmrHIFtpbGze2ZywWu0aUwWEbfiZvQdD4sXuWUj7gPos1EAACH5BAkBAAIALAAAAAAwADAAAAJrlI+py+0Po5y02ouz3rz7D4ZiCIxUaU4Amjrr+rDg+7ojXTdyh+e7kPP0egjabGg0EIVImHLJa6KaUam1aqVynNNsUvPTQjO/J84cFA3RzlaJO2495TF63Y7P6/f8vv8PGCg4SFhoeIg4UQAAIfkEBQEAAgAsAAAAADAAMAAAAnaUj6nL7Q+jXGDaW6+GeXsFdFL4UaITnuVBPunKtHGqwoKc0LjN7rdes70QQB/v1ykOj72kMghbPpm51pRKtBaxoteV2SUpsT/Dk0Y+A8lmNZSnZlfH8iy93lzj5+g93+gXKDhIWGh4iJiouMjY6PgIGSk5eVgAADs=';
        d.body.appendChild(z);

        function R(o, m) {
            return Math.max(Math.min(o + (r() - .5) * 400, m - 50), 50);
        }

        function A() {
            var x = R(a, w.innerWidth);
            var y = R(b, w.innerHeight);
            var d = 5 * Math.sqrt((a - x) * (a - x) + (b - y) * (b - y));
            zs.opacity = n;
            n = 1;
            zs.transition = zs.webkitTransition = d / 1e3 + "s linear";
            zs.transform = zs.webkitTransform = "translate(" + x + "px," + y + "px)";
            i.style.transform = i.style.webkitTransform = a > x ? '' : 'scaleX(-1)';
            a = x;
            b = y;
            setTimeout(A, d);
        }

        setTimeout(A, r() * 3e3);
    },
    killBats: function killBats() {
        /**
         * Removes the flying bats from the dom
         */
        $('.oooobats').remove();
        $('.batsToggle').attr('data-status', 'allGone').html('Let In The Bats');
    },

    /**
     * Checks if page items have been moved
     * and resets them to their original position
     * based on the numeric value of their ID
     * @constructor
     */
    resetItems: function resetItems() {
        if ($(app.objects.re).length > 0) {
            $(app.objects.w).find(app.objects.cl).sort(function (a, b) {
                return $(a).attr('id').replace('entry', '') - $(b).attr('id').replace('entry', '');
            }).appendTo(app.objects.w);
            $(app.objects.re).remove();
            core.panelAlert('Items reset to their original position', 'good');
        } else {
            core.panelAlert('All items are in their original position', 'error');
        }
    },

    /**
     * Populates the load saved data from
     * localstorage item and presents it
     * in a dropdown modal
     * @constructor
     */
    choseLocalSave: function choseLocalSave() {
        try {
            $('#loadandsave-zone').attr(app.handlers.r, 'load').css('display', 'block');
            var a = localStorage.getItem(app.storage.n);
            var target = $('.lsOptions');
            if (a !== null || a !== undefined) {
                var _b = a.split(',');
                var bLen = _b.length;
                $('.lsOptions').find('option').remove();
                $(target).append('<option value="null">SELECT</option>');
                for (var i = 0; i < bLen; i++) {
                    $(target).append("<option value=\"" + _b[i] + "\">" + _b[i] + "</option>");
                }
            } else {
                $(target).append('<option value="null">No Local Storage Found</option>');
            }
        } catch (e) {}
    },

    /**
     * Executes a save of the json data into a localstorage
     * object
     * @param {String} method If method is 'do' or empty, object will be marked to save. If method is 'reset', localstorage object will be flushed
     * @constructor
     */
    doLocalSave: function doLocalSave(method) {
        if (method === 'do' || method === null) {
            $('#loadandsave-zone').attr('data-reason', 'save').css('display', 'block');
        } else if (method === 'reset') {
            localStorage.setItem('pgb_SavedNode_LS', "");
            for (var i = 0, len = localStorage.length; i < len; i++) {
                var key = localStorage.key(i);
                if (key.includes('pgb_SavedNode_') && !key.includes('pgb_SavedNode_LS')) {
                    localStorage.removeItem(key);
                }
            }
        }
    },

    /**
     * Checks the users scroll position on the
     * window and displays a progress bar
     * below the main menu navs
     * @param {String} meth A declares the method as window height, B declares the method as window innerHeight
     * @constructor
     */
    scrollState: function scrollState(meth) {
        var winHeight = $(window).height();
        var docHeight = $(document).height();
        var progressBar = $('progress');
        var max = void 0;
        var value = void 0;
        max = docHeight - winHeight;
        progressBar.attr('max', max);
        if (meth === 'a') {
            winHeight = $(window).height(), docHeight = $(document).height();

            max = docHeight - winHeight;
            progressBar.attr('max', max);

            value = $(window).scrollTop();
            progressBar.attr('value', value);
        } else if (meth === 'b') {
            value = $(window).scrollTop();
            progressBar.attr('value', value);
        }
    },

    /**
     * Simple open url in new tab function
     * @param {String} url The URL to open in the new tab
     * @constructor
     */
    OpenInNewTab: function OpenInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    },

    /**
     * Adds multiple hero items to the current
     * instance
     * @param {Number} num How may new objects should the script create
     * @constructor
     */
    addMulti: function addMulti(num) {
        for (var i = 0; i < num; i++) {
            core.addItems();
        }
        core.panelAlert('Items Added', 'good');
    },

    /**
     * Animates the help item click to bring
     * into view the correct help item
     * @param {Number} a Defines which form item the function will jump to.
     * @constructor
     */
    jumpToHelper: function jumpToHelper(a) {
        $('.help_panel_holder').animate({
            scrollTop: $(app.objects.hi + "[data-helper=\"" + a + "\"]").offset().top,
            duration: app.animation.d.min
        });
        $(app.objects.hi).animate({
            opacity: 0.4,
            duration: app.animation.d.min
        });
        $(app.objects.hi + "[data-helper=\"" + a + "\"]").animate({
            opacity: 1,
            duration: app.animation.d.min
        });
    },

    /**
     * Saves a json node to localStorage
     * @param {String} val Defines the object position in the localStorage object
     * @param {String} name Defines the node name to be stored in the localStorag
     * @constructor
     */
    saveNodeToLS: function saveNodeToLS(val, name) {
        if (window.localStorage) {
            if (localStorage.getItem('pgb_SavedNode_LS') === null || localStorage.getItem('pgb_SavedNode_LS') === undefined) {
                localStorage.setItem('pgb_SavedNode_LS', "");
            }
            var getList = localStorage.getItem('pgb_SavedNode_LS');
            var getListLen = getList.split(',').length;
            if (getListLen > 0) {
                var _newList = getList + "," + name;
            } else {
                newList = name;
            }
            localStorage.setItem('pgb_SavedNode_LS', newList);
            localStorage.setItem("pgb_SavedNode_" + name, val);
            core.panelAlert('Data Saved To Local Storage', 'good');
        }
    },

    /**
     * Add new items to the form. Duplicates a
     * form block
     * @constructor
     */
    addItems: function addItems() {
        if ($(app.objects.o).css('display') === 'block') {
            $(app.objects.o).css('display', 'none');
        }

        var // Checks to see how many "duplicatable" input fields we currently have
        num = $(app.objects.cl).length; // create the new element via clone(), and manipulate it's ID using newNum value

        var // The numeric ID of the new input field being added, increasing by 1 each time
        newNum = new Number(num + 1);

        var newElem = $(app.objects.e + num).clone().attr('id', "entry" + newNum);

        newElem.find('.heading-reference').attr('id', "ID" + newNum + "_reference").attr('name', "ID" + newNum + "_reference").html("<div class=\"btn-group bigboy\"><button type=\"button\" class=\"btn btn-info\">ITEM <span class=\"label label-default\">" + newNum + "</span></button><button type=\"button\" class=\"btn btn-info dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><span class=\"caret\"></span><span class=\"sr-only\">Toggle Dropdown</span></button><ul class=\"dropdown-menu\"><li><a class=\"previewItem large\" href=\"javascript:;\" data-hero=\"" + newNum + "\" data-role=\"hero\">Preview Large</a></li><li><a class=\"previewItem small\" href=\"javascript:;\" data-hero=\"" + newNum + "\" data-role=\"hero\">Preview Small</a></li></ul></div>");
        newElem.attr(app.handlers.s, newNum);

        newElem.find('.label_ttl').attr('for', "ID" + newNum + "_title");
        newElem.find('.select_ttl:not(".objButtonPopupLink")').attr('id', "ID" + newNum + "_title").attr('name', "ID" + newNum + "_title").val('');

        newElem.find('.label_fn').attr('for', "ID" + newNum + "_first_name");
        newElem.find('.input_fn').attr('id', "ID" + newNum + "_first_name").attr('name', "ID" + newNum + "_first_name").val('');

        newElem.find('.label_ln').attr('for', "ID" + newNum + "_last_name");
        newElem.find('.input_ln').attr('id', "ID" + newNum + "_last_name").attr('name', "ID" + newNum + "_last_name").val('');

        newElem.find('.label_checkboxitem').attr('for', "ID" + newNum + "_checkboxitem");
        newElem.find('.input_checkboxitem').attr('id', "ID" + newNum + "_checkboxitem").attr('name', "ID" + newNum + "_checkboxitem").val([]);

        newElem.find('.radio:nth-child(1)').attr('for', "ID" + newNum + "_radioitemA").find('.input_radio').attr('id', "ID" + newNum + "_radioitemA").attr('name', "ID" + newNum + "_radioitem").val([]);
        newElem.find('.radio:nth-child(2)').attr('for', "ID" + newNum + "_radioitemB").find('.input_radio').attr('id', "ID" + newNum + "_radioitemB").attr('name', "ID" + newNum + "_radioitem").val([]);

        newElem.find('.label_email').attr('for', "ID" + newNum + "_email_address");
        newElem.find('.input_email').attr('id', "ID" + newNum + "_email_address").attr('name', "ID" + newNum + "_email_address").val('');

        newElem.find('.label_twt').attr('for', "ID" + newNum + "_twitter_handle");
        newElem.find('.input_twt').attr('id', "ID" + newNum + "_twitter_handle").attr('name', "ID" + newNum + "_twitter_handle").val('');
        newElem.find(app.objects.c).attr(app.handlers.d, newNum);
        newElem.find('.check_alt_image').attr(app.handlers.d, newNum);
        newElem.find('.input-group-addon.image_count').attr('style', '').html('Shopify CDN');
        newElem.find('.mod-radio').attr('style', '');

        $('.clonedInput:last').after(newElem);
        $("#ID" + newNum + "_title").focus();

        $('#btnDel').attr('disabled', false);

        if (newNum === 10) $('.btnAdd').attr('disabled', true).prop('value', "You've reached the limit"); // value here updates the text in the 'add' button when the limit is reached
        var dateNow = new Date();
        $('.date_obj').datetimepicker({ format: 'MM/DD/YYYY HH:mm' });
        $('.snapTo').append("<li><a href=\"#\" class=\"gotoItem\" " + app.handlers.i + "=\"" + newNum + "\">Item " + newNum + "</a></li>");
        $(app.objects.r).animate({
            scrollTop: $(app.objects.e + newNum).offset().top - 60
        }, app.animation.d.min);
        $('.btn-group.bigboy:not(.helpMePlease)').last().find('ul').append("<li class=\"divider\" data-role=\"hero\"></li><li><a class=\"removeThisItem\" " + app.handlers.i + "=\"" + newNum + "\" href=\"javascript:;\">Remove</a></li><li class=\"divider\"></li><li><a class=\"moveUpThisItem\" " + app.handlers.i + "=\"" + newNum + "\" href=\"javascript:;\">Move Up<span class=\"glyphicon glyphicon-arrow-up\"></span></a></li><li><a class=\"moveDownThisItem\" " + app.handlers.i + "=\"" + newNum + "\" href=\"javascript:;\">Move Down<span class=\"glyphicon glyphicon-arrow-down\"></span></a></li><li class=\"divider\" data-role=\"hero\"></li><li data-role=\"hero\"><a class=\"addConditions\" data-hero=\"1\" data-role=\"hero\" data-lang-id=\"action17\" data-version=\"3.2.1\">Toggle Conditions</a></li><li data-role=\"hero\"><a class=\"hideItem\" data-hero=\"1\" data-role=\"hero\" data-lang-id=\"action18\" data-version=\"3.2.1\">Hide Item</a></li>");
        $(app.objects.e + newNum).find('.mod-radio').find('input').first().prop('checked', true);
        core.scrollState('a');
        core.panelAlert('Item Added', 'good');
    },

    /**
     * Delete items from the form instance and
     * removes them from the dom reference
     * @param {String} elem Defines the DOM element that is targeted for deletion
     * @returns {boolean}
     * @constructor
     */
    deleteItems: function deleteItems(elem) {
        if ($(app.objects.cl).length > 1) {
            if ($(app.objects.o).css('display') === 'block') {
                $(app.objects.o).css('display', 'none');
            }
            //var num = $(app.objects.cl).length;
            if (elem === 'last') {
                var a = $('.clonedInput:last').attr('id');
                var _b2 = a.replace('entry', '');
                $("#" + a).slideUp('slow', function () {
                    $(this).remove();
                    // if only one element remains, disable the "remove" button
                    if (elem - 1 === 1) $('.btnDel').attr('disabled', true);
                    // enable the "add" button
                    $('.btnAdd').attr('disabled', false).prop('value', "add section");
                });
                $('.snapTo').find(".gotoItem[" + app.handlers.i + "=\"" + _b2 + "\"]").parent().remove();
                core.scrollState('a');
            } else {
                $(app.objects.e + elem).slideUp('slow', function () {
                    $(this).remove();
                    // if only one element remains, disable the "remove" button
                    if (elem - 1 === 1) $('.btnDel').attr('disabled', true);
                    // enable the "add" button
                    $('.btnAdd').attr('disabled', false).prop('value', "add section");
                });
                $('.snapTo').find(".gotoItem[" + app.handlers.i + "=\"" + elem + "\"]").parent().remove();
                core.scrollState('a');
            }
            core.panelAlert('Last Item Removed', 'good');
            return false; // Removes the last section you added
        }
    },

    /**
     * Validate the JSON that has been exported
     * when the user clicks the button
     * @constructor
     */
    validateJSON: function validateJSON() {
        $("#output_code").validateJSON({
            compress: false,
            reformat: true,
            onSuccess: function onSuccess(json) {
                core.panelAlert('JSON Code is valid', 'good');
            },
            onError: function onError(error) {
                core.panelAlert('A JSON error has been encountered. The line on which the error has occured is highlighted.', 'error');
            }
        });
    },

    /**
     * Generic error handler that checks if certain
     * form objects are filled and outputs a dropdown
     * list with anchor links
     * @constructor
     */
    errorHandler: function errorHandler() {
        var errorLog = [];
        var a = JSON.parse($(app.objects.o + "[" + app.handlers.r + "=\"output\"]").find('textarea').val()).hero;
        var b = a.length;
        var c = 0;
        for (var i = 0; i < b; i++) {
            if (a[i].date.start === '') {
                errorLog.push({ form: i + 1, obj: "Start Date", prob: "No Value. FATAL", elem: "objStart", die: true });
                c++;
            }
            if (a[i].date.end === '') {
                errorLog.push({ form: i + 1, obj: "End Date", prob: "No Value. FATAL", elem: "objEnd", die: true });
                c++;
            }
            if (a[i].title.en === '') {
                errorLog.push({ form: i + 1, obj: "English Title", prob: "No Value", elem: "objTitleEN", die: false });
                c++;
            }
            if (a[i].title.fr === '') {
                errorLog.push({ form: i + 1, obj: "French Title", prob: "No Value", elem: "objTitleFR", die: false });
                c++;
            }
            if (a[i].text.en === '') {
                errorLog.push({ form: i + 1, obj: "English Text", prob: "No Value", elem: "objTextEN", die: false });
                c++;
            }
            if (a[i].text.fr === '') {
                errorLog.push({ form: i + 1, obj: "French Text", prob: "No Value", elem: "objTextFR", die: false });
                c++;
            }
            if (a[i].button.label.en === '') {
                errorLog.push({
                    form: i + 1,
                    obj: "English Button Label",
                    prob: "No Value",
                    elem: "objButtonEN",
                    die: false
                });
                c++;
            }
            if (a[i].button.label.fr === '') {
                errorLog.push({
                    form: i + 1,
                    obj: "French Button Label",
                    prob: "No Value",
                    elem: "objButtonFR",
                    die: false
                });
                c++;
            }
            if (a[i].button.url === '') {
                errorLog.push({ form: i + 1, obj: "Button URL", prob: "No Value", elem: "objButtonLink", die: false });
                c++;
            }
            if (a[i].image.url === '') {
                errorLog.push({ form: i + 1, obj: "Image URL", prob: "No Value", elem: "objImageMain", die: false });
                c++;
            }
        }
        errorLog.reverse(); //present the errors in the right direction
        if (c > 0) {
            $(app.objects.el).css('display', 'inline-block');
            $('.errorListing').empty();
            for (var j = 0; j < errorLog.length; j++) {
                $('.errorListing').prepend("<li><a href=\"javascript:;\" class=\"errorItem " + errorLog[j].die + "\" " + app.handlers.i + "=\"" + j + "\">Item " + errorLog[j].form + " : " + errorLog[j].obj + " : " + errorLog[j].prob + "</a></li>");
                core.registerErrorButtons(errorLog[j].form, errorLog[j].elem, j, errorLog[j].prob, errorLog[j].die);
            }
            $(app.objects.el).find('button').html("Warnings<span class=\"label label-default numerrors\">" + errorLog.length + "</span><span class=\"caret\"></span>");
        } else {
            $(app.objects.el).css('display', 'none');
        }
    },

    /**
     * Binds each error item created by the
     * errorHandler function to a click handler
     * that animates scroll to the specific
     * error item
     * @param {Number} num Defines which form node is being targetted by the function
     * @param {String} elem Defines the dom element that will be highlighted when function fires
     * @param {String} item Defines the form element that triggered the error
     * @param {String} prob Receives a summary description of the problem that was encountered
     * @param {Boolean} die Defines whether the button is registered to an event/error that will cause the script to fail
     * @constructor
     */
    registerErrorButtons: function registerErrorButtons(num, elem, item, prob, die) {
        $(app.objects.bo).on('click', ".errorItem[" + app.handlers.i + "=\"" + item + "\"]", function () {
            if (die === true) {
                $(app.objects.e + num).find("." + elem).css('background-color', 'rgba(238, 54, 54, 0.3)').css('border-color', 'red').attr('placeholder', 'Leaving this field empty will cause the hero banner function to fail');
            } else {
                $(app.objects.e + num).find("." + elem).css('background-color', 'rgba(238, 162, 54, 0.3)');
            }
            $(app.objects.o).hide();
            $(app.objects.r).css('overflow', 'auto');
            $(app.objects.r).animate({
                scrollTop: $(app.objects.e + num + " ." + elem).offset().top - 100
            }, app.animation.d.min);
            if ($("." + elem).parent().attr('class') !== 'input_holders') {
                $("." + elem).wrap('<div class="input_holders"></div>').parent().append("<div class=\"input_alerts\" title=\"" + prob + "\"><span class=\"glyphicon glyphicon-exclamation-sign\"></span></div>");
            }
        });
    },

    /**
     * Reads JSON that is pasted in the form in
     * translate JSON mode and prepares and formats
     * it to be output to the corresponding
     * form objects
     * @param {Boolean} storage Defines whether to store the data in localStorage when the JSON is traversed
     * @param {String} nodeName Defines the name to be used. Will be appended to the localStorage object's save name
     * @constructor
     */
    loadFromServer: function loadFromServer(path) {
        var xPath = path === 'tlh' ? 'https://cdn.shopify.com/s/files/1/0050/3522/t/22/assets/banners.json' : 'https://cdn.shopify.com/s/files/1/1230/9376/t/2/assets/ALTI-banners.json';
        $.ajax({
            url: xPath,
            success: function success(data) {
                var badString = JSON.stringify(data);
                var goodString = badString.slice(0, -1);
                goodString = "{" + goodString.substr(1) + "}";
                core.traverseJSON(false, '', goodString);
            }
        });
    },
    traverseJSON: function traverseJSON(storage, nodeName, fromAJAX) {
        var ctc = void 0;
        if ($(app.objects.b + " textarea").val() !== '' || localStorage.getItem('pgb_SavedNode') !== '' && fromAJAX === undefined) {
            if (storage === false) {
                ctc = $(app.objects.b + " textarea").val();
                if (ctc === '') {
                    core.panelAlert('Form Does Not Contain JSON Data', 'error');
                }
            } else if (storage === true && nodeName !== '') {
                if (localStorage.getItem("pgb_SavedNode_" + nodeName) !== undefined && localStorage.getItem("pgb_SavedNode_" + nodeName) !== null && localStorage.getItem("pgb_SavedNode_" + nodeName) !== '') {
                    ctc = localStorage.getItem("pgb_SavedNode_" + nodeName).replace(',null', '');
                } else {
                    core.panelAlert('No Data Found In Local Storage', 'error');
                }
            }
            var prs = JSON.parse(ctc);
            var obj = prs.hero;
            var len = obj.length;
            var formItems = $(app.objects.cl).length;
            var formArray = [];
            if (formItems < len) {
                var build = true,
                    bItems = len - formItems;
            }
            for (var h = 0; h < bItems; h++) {
                core.addItems();
            }
            for (var i = 0; i < len; i++) {
                formArray.push(obj[i]);
            }
            core.jsonToForm(formArray);
            core.panelAlert('Data Translated To Form', 'good');
        } else if (fromAJAX !== '') {
            if (storage === false) {
                ctc = fromAJAX;
                if (ctc === '') {
                    core.panelAlert('Form Does Not Contain JSON Data', 'error');
                }
            } else if (storage === true && nodeName !== '') {
                if (localStorage.getItem("pgb_SavedNode_" + nodeName) !== undefined && localStorage.getItem("pgb_SavedNode_" + nodeName) !== null && localStorage.getItem("pgb_SavedNode_" + nodeName) !== '') {
                    ctc = localStorage.getItem("pgb_SavedNode_" + nodeName).replace(',null', '');
                } else {
                    core.panelAlert('No Data Found In Local Storage', 'error');
                }
            }
            var _prs = JSON.parse(ctc);
            var _obj = _prs.hero;
            var _len = _obj.length;
            var _formItems = $(app.objects.cl).length;
            var _formArray = [];
            if (_formItems < _len) {
                var build = true,
                    bItems = _len - _formItems;
            }
            for (var _h = 0; _h < bItems; _h++) {
                core.addItems();
            }
            for (var _i = 0; _i < _len; _i++) {
                _formArray.push(_obj[_i]);
            }
            core.jsonToForm(_formArray);
            core.panelAlert('Data Translated To Form', 'good');
        } else {
            core.panelAlert('Please generate or paste JSON before using this function', 'error');
        }
    },

    /**
     * Takes formatted JSON sent from the TraverseJSON
     * function and outputs it to the mapped form
     * element
     * @param {Object} aCode Param is a JSON formatted object. Object can not be a string. Pass the string through JSON.parse first
     * @constructor
     */
    jsonToForm: function jsonToForm(aCode) {
        var jsLen = aCode.length;
        for (var i = 0; i < jsLen; i++) {
            var jsForm = "entry" + (i + 1);
            var formEl = "#" + jsForm;
            $(formEl).find('.objStart').val(aCode[i].date.start);
            $(formEl).find('.objEnd').val(aCode[i].date.end);
            $(formEl).find('.objTitleEN').val(aCode[i].title.en);
            $(formEl).find('.objTitleFR').val(aCode[i].title.fr);
            $(formEl).find('.objTitleCol').val(aCode[i].title.color);
            $(formEl).find('.objTextEN').val(aCode[i].text.en);
            $(formEl).find('.objTextFR').val(aCode[i].text.fr);
            try {
                if (aCode[i].conditions.en !== null && aCode[i].conditions.en !== undefined && aCode[i].conditions.en !== '') {
                    $(formEl).find('.objConditionsEN').val(aCode[i].conditions.en);
                } else {
                    $(formEl).find('.objConditionsEN').val('');
                }
                if (aCode[i].conditions.fr !== null && aCode[i].conditions.fr !== undefined && aCode[i].conditions.fr !== '') {
                    $(formEl).find('.objConditionsFR').val(aCode[i].conditions.fr);
                } else {
                    $(formEl).find('.objConditionsFR').val('');
                }
            } catch (e) {
                console.log(e);
            }
            $(formEl).find('.objImageMain').val(aCode[i].image.url);
            $(formEl).find('.objImageAlt').val(aCode[i].image.altUrl);
            $(formEl).find('.objButtonEN').val(aCode[i].button.label.en);
            $(formEl).find('.objButtonFR').val(aCode[i].button.label.fr);
            $(formEl).find('.objButtonLink').val(aCode[i].button.url);
            if (aCode[i].date.delay === true || aCode[i].date.delay === false) {
                window.setTimeout(function () {
                    core.panelAlert('Some delay entries are not numerical. Make sure to set all delay entries to a numerical value manually.', 'error');
                }, 2000);
            } else if (aCode[i].date.delay === '' || aCode[i].date.delay === null || aCode[i].date.delay === undefined || aCode[i].date.delay === 'undefined') {
                $(formEl).find('.objDelay').val(0);
            } else {
                $(formEl).find('.objDelay').val(aCode[i].date.delay);
            }
            $(formEl).find('.objCountdownShow').val(aCode[i].showCountdown);
            $(formEl).find(".objButtonPopup option[value=\"" + aCode[i].popUpLink + "\"]").attr('selected', true).prop('selected', true);
            $(formEl).find(".objButtonPopupLink option[value=\"" + aCode[i].button.popUpLinkID + "\"]").attr('selected', true).prop('selected', true);
            $(formEl).find(".objCountdownShow option[value=\"" + aCode[i].showCountdown + "\"]").attr('selected', true).prop('selected', true);
            $(formEl).find(".objHeroSticky option[value=\"" + aCode[i].sticky + "\"]").attr('selected', true).prop('selected', true);
            $(formEl).find(".objHeroTitleShow option[value=\"" + aCode[i].title.showTitle + "\"]").attr('selected', true).prop('selected', true);
            $(formEl).find(".objHeroSubtitleShow option[value=\"" + aCode[i].text.showSubTitle + "\"]").attr('selected', true).prop('selected', true);
            $(formEl).find(".objHeroPromote option[value=\"" + aCode[i].promote + "\"]").attr('selected', true).prop('selected', true);
            if (aCode[i].active == true) {
                $(formEl).find('.mod-radio').find('input[type="radio"]').first().prop('checked', true);
                $(formEl).find('.mod-radio').find('input[type="radio"]').last().prop('checked', false);
            } else if (aCode[i].active == false) {
                $(formEl).find('.mod-radio').css('border-left-width', '6px').css('border-left-style', 'solid').css('border-left-color', 'rgb(253, 0, 0)');
                $(formEl).find('.mod-radio').find('input[type="radio"]').first().prop('checked', false);
                $(formEl).find('.mod-radio').find('input[type="radio"]').last().prop('checked', true);
            }
            if ($(app.objects.o).css('display') == 'block') {
                $(app.objects.o).hide();
                $(app.objects.r).css('overflow', 'auto');
            }
            $(app.objects.r).css('overflow', 'auto');
        }
    },

    /**
     * Serializes the form data in a JSON format
     * and passes the data to the outputJson
     * function
     * @param {String} meth
     * @param {String} name
     * @param {String} mode
     * @constructor
     */
    prepareJSON: function prepareJSON(meth, name, mode) {
        var c = [];
        if (mode === 'hero' || mode === '' || mode === null || mode === undefined) {
            $('.clonedInput form fieldset[data-role="hero"]').each(function () {
                var a = $(this).serializeArray();
                c.push(a);
            });
            if (meth === 'full') {
                core.outputJson(c, meth, null, mode);
            } else if (meth === 'save') {
                core.outputJson(c, meth, name, 'hero');
            }
        } else if (mode === 'hello') {
            $('.clonedInput form fieldset[data-role="hello"]').each(function () {
                var a = $(this).serializeArray();
                c.push(a);
            });
            core.outputJson(c, 'full', null, 'hello');
        }
    },

    /**
     * Receives the serialized data parsed in the
     * prepareJSON function and outputs JSON
     * formatted code to the output view
     * @param {Object} aCode
     * @param {String} meth
     * @param {String} name
     * @param {String} mode
     * @constructor
     */
    outputJson: function outputJson(aCode, meth, name, mode) {
        try {
            var nodes = aCode.length;
            var lastItem = nodes - 1;
            if (mode === 'hello') {
                var page_model = '{\n    "hello": [\n';
                for (var i = 0; i < nodes; i++) {
                    page_model += "       {\n        \"helloItem\": \"hello" + i + "\",";
                    page_model += '\n        "date": {';
                    page_model += "\n          \"start\": \"" + aCode[i][0].value + "\",";
                    page_model += "\n          \"end\": \"" + aCode[i][1].value + "\"";
                    page_model += '\n        },';
                    page_model += '\n        "text": {';
                    page_model += "\n          \"en\": \"" + aCode[i][2].value.trim().replace(/"/g, '') + "\",";
                    page_model += "\n          \"fr\": \"" + aCode[i][3].value.trim().replace(/"/g, '') + "\"";
                    page_model += '\n        }';
                    if (i < lastItem) {
                        page_model += '\n},\n';
                    }
                }
                page_model += '\n      }\n   ]\n}';
            } else if (mode === 'hero') {
                page_model = '{\n    "hero": [\n';
                for (i = 0; i < nodes; i++) {
                    //mapping
                    if (aCode[i][15].value === '' || aCode[i][15].value === null || aCode[i][15].value === undefined) {
                        var elemAAAA = 'null';
                    } else {
                        elemAAAA = aCode[i][15].value;
                    }
                    if (aCode[i][16].value === '' || aCode[i][16].value === null || aCode[i][16].value === undefined) {
                        var elemA = true;
                    } else {
                        elemA = aCode[i][16].value;
                    }
                    if (aCode[i][17].value === '' || aCode[i][17].value === null || aCode[i][17].value === undefined) {
                        var elemAA = true;
                    } else {
                        elemAA = aCode[i][17].value;
                    }
                    if (aCode[i][18].value === '' || aCode[i][18].value === null || aCode[i][18].value === undefined) {
                        var elemAAA = true;
                    } else {
                        elemAAA = aCode[i][18].value;
                    }
                    if (aCode[i][14].value === '' || aCode[i][14].value === null || aCode[i][14].value === undefined) {
                        var elemB = false;
                    } else {
                        elemB = aCode[i][14].value;
                    }
                    if (aCode[i][19].value === '' || aCode[i][19].value === null || aCode[i][19].value === undefined) {
                        var elemC = false;
                    } else {
                        elemC = aCode[i][19].value;
                    }
                    if (aCode[i][22] !== undefined) {
                        if (aCode[i][22].value === '' || aCode[i][22].value === null || aCode[i][22].value === undefined) {
                            var elemD = true;
                        } else {
                            elemD = aCode[i][22].value;
                        }
                    } else {
                        elemD = true;
                    }
                    if (aCode[i][20] !== undefined) {
                        if (aCode[i][20].value === '' || aCode[i][20].value === null || aCode[i][20].value === undefined) {
                            var elemDD = false;
                        } else {
                            elemDD = aCode[i][20].value;
                        }
                    } else {
                        elemDD = false;
                    }
                    if (aCode[i][21] !== undefined) {
                        if (aCode[i][21].value === '' || aCode[i][21].value === null || aCode[i][21].value === undefined) {
                            var elemE = 0;
                        } else {
                            elemE = aCode[i][21].value;
                        }
                    } else {
                        elemE = 0;
                    }
                    page_model += "{\n        \"heroId\": \"hero-elem" + i + "\",";
                    page_model += "\n        \"active\": " + elemD + ",";
                    page_model += "\n        \"sticky\": " + elemDD + ",";
                    page_model += "\n        \"showCountdown\": " + elemA + ",";
                    page_model += "\n        \"popUpLink\": " + elemB + ",";
                    page_model += '\n        "date": {';
                    page_model += "\n          \"start\": \"" + aCode[i][0].value + "\",";
                    page_model += "\n          \"end\": \"" + aCode[i][1].value + "\",";
                    page_model += "\n          \"delay\": " + elemE;
                    page_model += '\n        },';
                    page_model += '\n        "title": {';
                    page_model += "\n          \"en\": \"" + aCode[i][2].value.trim() + "\",";
                    page_model += "\n          \"fr\": \"" + aCode[i][3].value.trim() + "\",";
                    page_model += "\n          \"color\": \"" + aCode[i][4].value + "\",";
                    page_model += "\n          \"showTitle\": " + elemAA;
                    page_model += '\n        },';
                    page_model += '\n        "text": {';
                    page_model += "\n          \"en\": \"" + aCode[i][5].value.trim() + "\",";
                    page_model += "\n          \"fr\": \"" + aCode[i][6].value.trim() + "\",";
                    page_model += "\n          \"showSubTitle\": " + elemAAA;
                    page_model += '\n        },';
                    page_model += '\n        "conditions": {';
                    page_model += "\n          \"en\": \"" + aCode[i][7].value.trim() + "\",";
                    page_model += "\n          \"fr\": \"" + aCode[i][8].value.trim() + "\"";
                    page_model += '\n        },';
                    page_model += "\n        \"promote\": " + elemC + ",";
                    page_model += '\n        "button": {';
                    page_model += '\n          "label": {';
                    page_model += "\n            \"en\": \"" + aCode[i][11].value.trim() + "\",";
                    page_model += "\n            \"fr\": \"" + aCode[i][12].value.trim() + "\"";
                    page_model += '\n          },';
                    page_model += "\n        \"url\": \"" + aCode[i][13].value + "\",";
                    page_model += "\n        \"popUpLinkID\": \"" + elemAAAA + "\"";
                    page_model += '\n        },';
                    page_model += '\n        "image": {';
                    page_model += "\n          \"url\": \"" + aCode[i][9].value + "\",";
                    page_model += "\n          \"altUrl\": \"" + aCode[i][10].value + "\"";
                    page_model += '\n        }';
                    if (i < lastItem) {
                        page_model += '\n},\n';
                    }
                }
                page_model += '\n      }\n   ]\n}';
            }
            if (meth === 'full') {
                if ($(app.objects.he).css('display') === 'block') {
                    $(app.objects.he).css('display', 'none');
                }
                if ($(app.objects.h).css('display') === 'block') {
                    $(app.objects.h).css('display', 'none');
                }
                if ($(app.objects.ls).css('display') === 'block') {
                    $(app.objects.ls).css('display', 'none');
                }
                $(app.objects.o).attr(app.handlers.r, 'output');
                $(app.objects.o).css('display', 'block');
                $(app.objects.o + " textarea").val(page_model);
                $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css('overflow', 'hidden');
                if (mode === 'hero') {
                    core.errorHandler();
                }
                core.panelAlert('JSON Exported Successfuly', 'good');
            } else {
                core.saveNodeToLS(page_model, name);
            }
        } catch (e) {
            core.panelAlert('An unknown error has occured. Please make sure all required fields are filled.', 'error');
        }
    },

    /**
     *
     * @param {String} testUrl
     * @constructor
     */
    urlExists: function urlExists(testUrl) {
        var http = jQuery.ajax({
            type: "HEAD",
            url: "https:" + testUrl,
            async: false
        });
        return http.status;
        // this will return 200 on success, and 0 or negative value on error
    },

    /**
     * Gets the image url input by the user and runs it
     * through the urlExists function. Depending on the
     * value returned, the form elements will be
     * formatted accordingly
     * @param {string} type
     * @param {String} handler
     * @constructor
     */
    validateImage: function validateImage(type, handler) {
        if (type === 'main') {
            var a = $(app.objects.c + "[" + app.handlers.d + "=\"" + handler + "\"]").parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image').val();
            var aa = $(app.objects.c + "[" + app.handlers.d + "=\"" + handler + "\"]").parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image');
            var aaa = $(app.objects.c + "[" + app.handlers.d + "=\"" + handler + "\"]").parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image').parent().attr('class');
            if (a !== '') {
                var _b3 = core.urlExists(a);
                if (_b3 !== 200) {
                    if (aaa === 'input_holders') {
                        $(aa).next().next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    } else {
                        $(aa).next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    }
                } else if (_b3 === 200) {
                    if (aaa === 'input_holders') {
                        $(aa).next().next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                    } else {
                        $(aa).next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                    }
                } else {
                    if (aaa === 'input_holders') {
                        $(aa).next().next().attr('style', '').html('Shopify CDN');
                    } else {
                        $(aa).next().attr('style', '').html('Shopify CDN');
                    }
                }
            } else {
                if (aaa === 'input_holders') {
                    $(aa).next().next().css('background-color', '#eee').html('Nothing to validate');
                } else {
                    $(aa).next().css('background-color', '#eee').html('Nothing to validate');
                }
            }
        } else if (type === 'alt') {
            var _a = $(app.objects.ca + "[" + app.handlers.d + "=\"" + handler + "\"]").parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image').val();
            var _aa = $(app.objects.ca + "[" + app.handlers.d + "=\"" + handler + "\"]").parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image');
            var _aaa = $(app.objects.ca + "[" + app.handlers.d + "=\"" + handler + "\"]").parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image').parent().attr('class');
            if (_a !== '') {
                b = core.urlExists(_a);
                if (b !== 200) {
                    if (_aaa === 'input_holders') {
                        $(_aa).next().next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    } else {
                        $(_aa).next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    }
                } else if (b === 200) {
                    if (_aaa === 'input_holders') {
                        $(_aa).next().next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                    } else {
                        $(_aa).next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                    }
                } else {
                    if (_aaa === 'input_holders') {
                        $(_aa).next().next().attr('style', '').html('Shopify CDN');
                    } else {
                        $(_aa).next().attr('style', '').html('Shopify CDN');
                    }
                }
            } else {
                if (_aaa === 'input_holders') {
                    $(_aa).next().next().css('background-color', '#eee').html('Nothing to validate');
                } else {
                    $(_aa).next().css('background-color', '#eee').html('Nothing to validate');
                }
            }
        }
    },

    /**
     *
     * @param {String} heroItem
     * @param {String} mode
     * @param {String} lang
     * @constructor
     */
    previewFeature: function previewFeature(heroItem, mode, lang) {
        var dt = $(app.objects.e + heroItem).find('form').find('fieldset[data-role="hero"]').serializeArray();
        var start = dt[0].value;
        var img = dt[9].value;
        var titleColor = dt[4].value;
        var outputString = void 0;
        console.log(dt);
        if (lang === app.language.e) {
            var _titleText = dt[2].value;
            var _subTitleText = dt[5].value;
            var _buttonLabel = dt[11].value;
            var _endsLabel = 'Ends In';
        } else if (lang === app.language.f) {
            var _titleText2 = dt[3].value;
            var _subTitleText2 = dt[6].value;
            var _buttonLabel2 = dt[12].value;
            var _endsLabel2 = 'Termine dans';
        }
        var buttonLink = dt[11].value;
        var container = app.objects.h;
        var target = '.render_output';
        var sub = dt[16].value;
        var warningString = '<div class="preview_warning" title="The position and size of the background may display differently than on the live site.">Preview may differ from actual site render</div>';
        if (mode === 'small') {
            outputString = '<div class="five columns jose pedro homepage_content event mini-spacers animated fadeIn delay-05s"><div id="event-active-today">';
        } else {
            outputString = '';
        }
        outputString += "<div data-instance=\"slide-0\" data-str=\"" + img + "\"";
        outputString += ' data-promote="true" id="slide-0" class="hero fwidth root-0"><div data-object-pos="false-false" class="bcg skrollable skrollable-between" data-center="background-position: 50% 0px;" data-top-bottom="background-position: 50% -200px;" data-anchor-target="#slide-0"';
        outputString += " style=\"background-image: url(" + img + "); background-position: 50% -55.2631578947369px;\"><div class=\"hsContainer\"><div class=\"hsContent center skrollable skrollable-before\" data-100-top=\"opacity: 1\" data-25-top=\"opacity: 0\" data-anchor-target=\"#slide-0 .animated\" style=\"opacity: 1;\">";
        outputString += "<div itemscope=\"\" itemtype=\"http://schema.org/Event\" class=\"animated fadeIn delay-025s hero_head\"><p itemprop=\"startDate\" content=\"" + start + "\" class=\"subtitle timedown is-countdown\" id=\"countdown0\" style=\"opacity:0.9\"><span>" + endsLabel + "  <b>11:29:39</b> </span></p>";
        outputString += "<h1 class=\"headline herobanner\" style=\"color:" + titleColor + "\">" + titleText + "</h1>";
        if (sub === 'true') {
            outputString += "<p class=\"subtitle herobanner\">" + subTitleText + "</p>";
        }
        outputString += "<a data-bleed=\"\" href=\"" + buttonLink + "\" class=\"action_button hero\"><span class=\"trn\" data-trn-key=\"\">" + buttonLabel + "</span></a>";
        outputString += '</div></div></div></div></div>';
        if (mode === 'small') {
            outputString += '</div></div><div style="clear:both"></div>';
        } else if (mode === 'large') {
            outputString += warningString;
        }
        $(container).show().css('top', sPos + 50);
        $(target).empty().append(outputString);
        if (mode === 'small') {
            pfHero = heroItem;
            pfMode = mode;
            $(target).addClass('renderSmall').attr('data-hero', heroItem).attr('data-language', lang).attr('data-mode', mode);
        } else if (mode === 'large') {
            pfHero = heroItem;
            pfMode = mode;
            $(target).removeClass('renderSmall').attr('data-hero', heroItem).attr('data-language', lang).attr('data-mode', mode);
        }
    },
    loadAPIparams: function loadAPIparams() {
        var parent = $('.com_API_local');
        var elem = $('.com_API_prog');
        var subElem = $('.com_API_state');
        var width = 10;
        var id = setInterval(frame, 20);
        var loadText = 'Loading Shopify API components';
        var doneText = 'Shopify API successfully loaded';
        $(parent).css('display', 'block');
        $(elem).attr('style', '');
        $(subElem).html(loadText);
        function frame() {
            if (width >= 100) {
                $(elem).css('background-color', '#5cb85c');
                $(subElem).html(doneText);
                clearInterval(id);
                setTimeout("$('.com_API_local').remove()", 1000);
            } else {
                width++;
                $(elem).css('width', width + "%");
            }
        }
    },
    planBify: function planBify() {
        $('.objHeroPromote').find('option[value="true"]').prop('selected', true);
        $('.objHeroSticky').find('option[value="false"]').prop('selected', true);
        core.panelAlert('Form items have been modified to be Plan B compliant', 'good');
    },
    cleanWhitespace: function cleanWhitespace() {
        var a = $('#output_code').val();

        var b = a.replace(/[\t ]+\"/g, '"').replace(/\][\t ]+\[/g, "][").replace(/\}[\t ]+\}/g, '}}').replace(/\}[\t ]+\]/g, "}]").replace(/\"[\t ]+\}/g, '"}').replace(/\"[\t ]+\]/g, '"]').replace(/[\t ]+\}/g, '}').replace(/[\t ]+\{/g, "{").replace(/\:[\t ]+\[/g, ":[").replace(/[\t ]+\:/g, ":").replace(/\:[\t ]+$/g, ":").replace(/\}[\t ]+$/g, "}").replace(/\}[\t ]+$/g, "}").replace(/[\t ]+\]/g, "]").replace(/\n/g, "");

        $('#output_code').val(b);
    },
    cacheClickedItem: function cacheClickedItem(item) {
        if (item.hasClass('childHidden')) {
            item.html('Hide Item').removeClass('childHidden');
            item.parent().parent().parent().parent().parent().find('fieldset[data-role="hero"]').slideToggle(300);
        } else if (!item.hasClass('childHidden')) {
            item.html('Show Item').addClass('childHidden');
            item.parent().parent().parent().parent().parent().find('fieldset[data-role="hero"]').slideToggle(300);
        }
    }
};

$(function () {
    /**
     * Main document ready initialized function
     */
    core.setHeadSec();
    core.initializeTheme();
    core.initHelp();
    core.getVersion(true);
    core.loadAPIparams();
    core.languageManager(app.lang, true);
    window.setInterval(function () {
        core.getVersion(false);
    }, 600000);
    $('.date_obj').datetimepicker({ format: 'MM/DD/YYYY HH:mm' });

    $('.btnAdd').attr('disabled', false);
    // Disable the "remove" button
    $('.btnDel').attr('disabled', true);
    /**
     * event handlers bound to the .on expression
     * so that dynamically generated divs are
     * taken into consideration
     */
    $(app.objects.bo).on('click', '.btnAdd', function () {
        core.addItems();
    }).on('click', '.app_lang_toggle', function () {
        var lng = $('.app_lang_toggle').attr('data-set-lang');
        core.languageManager(lng);
    }).on('click', '.overlay_close', function () {
        $('.overlay_close').parent().parent().hide();
        $(app.objects.r).css('overflow', 'auto');
        $('.overlay_message').css('display', 'none');
    }).on('click', '.select_content', function () {
        var $this = $(app.objects.b + " textarea");
        $this.select();
        // Work around Chrome's little problem
        $this.mouseup(function () {
            // Prevent further mouseup intervention
            $this.unbind("mouseup");
            return false;
        });
    }).on('click', '.gotoItem', function () {
        var a = $(this).data('item');
        $(app.objects.r).animate({
            scrollTop: $(app.objects.e + a).offset().top - 60
        }, app.animation.d.min);
        if ($(app.objects.o).css('display') == 'block') {
            $(app.objects.r).css('overflow', 'auto');
            $('#oapp.objects.output').css('display', 'none');
        }
        if ($(app.objects.he).css('display') == 'block') {
            $(app.objects.he).css('display', 'none');
        }
    }).on('click', '.about_app,.version_number', function (e) {
        window.open("release.html", "_blank", "scrollbars=no,resizable=no,height=600, width=800, status=yes, toolbar=no, menubar=no, location=no");
    }).on('click', '.btnAddMulti', function () {
        $('#query-zone').toggle();
        $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min);
        if ($(app.objects.o).css('display') == 'block') {
            $(app.objects.o).css('display', 'none');
        }
        if ($(app.objects.h).css('display') == 'block') {
            $(app.objects.h).css('display', 'none');
        }
        $('.num_select').focus();
    }).on('click', app.objects.c, function (e) {
        var a = $(app.objects.c).data('handler');
        core.validateImage('main', a);
        e.preventDefault();
    }).on('click', '.multiquery_close', function () {
        $('.multiquery_close').parent().parent().hide();
    }).on('click', '.check_alt_image', function (e) {
        var a = $('.check_alt_image').data('handler');
        core.validateImage('alt', a);
        e.preventDefault();
    }).on('click', '.overlay_validate', function () {
        core.validateJSON();
    }).on('click', '.overlay_trim', function () {
        core.cleanWhitespace();
        core.panelAlert('Whitespace and line breaks have been removed.', 'good');
    }).on('click', '.previewItem.large', function (e) {
        $(app.objects.r).animate({ scrollTop: sPos }, app.animation.d.min).css('overflow', 'hidden');
        var a = $('.previewItem.large').data('hero');
        core.previewFeature(a, 'large', pfLang);
        e.preventDefault();
    }).on('click', '.previewItem.small', function (e) {
        $(app.objects.r).animate({ scrollTop: sPos }, app.animation.d.min).css('overflow', 'hidden');
        var a = $('.previewItem.small').data('hero');
        core.previewFeature(a, 'small', pfLang);
        e.preventDefault();
    }).on('click', '.removeThisItem', function () {
        var a = $('.removeThisItem').data('item');
        core.deleteItems(a);
    }).on('click', '.loadItem', function () {
        var a = $('.loadItem').attr(app.handlers.i);
        core.traverseJSON(true, a);
    }).on('click', '.copy-zone', function () {
        core.OpenInNewTab('https://github.com/davidemaser/heroIO');
    }).on('click', '.showHelp', function () {
        $(app.objects.he).toggle();
        if ($(app.objects.he).css('display') === 'block') {
            $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css('overflow', 'hidden');
        } else {
            $(app.objects.r).css('overflow', 'auto');
        }
        if ($(app.objects.o).css('display') === 'block') {
            $(app.objects.o).css('display', 'none');
        }
        if ($(app.objects.h).css('display') === 'block') {
            $(app.objects.h).css('display', 'none');
        }
    }).on('click', '.help_close', function () {
        if ($(app.objects.he).css('display') === 'block') {
            $('.help_close').parent().parent().hide();
            $(app.objects.r).css('overflow', 'auto');
        }
    }).on('click', '.renderer_close', function () {
        if ($(app.objects.h).css('display') === 'block') {
            $('.renderer_close').parent().parent().hide();
            $(app.objects.r).css('overflow', 'auto');
            $(app.objects.h).find('.render_output').empty();
        }
    }).on('click', '.btnNmode', function () {
        var a = $(app.dom.b).attr('data-nmode');
        if (a === 'hero') {
            $(app.dom.b).attr('data-nmode', 'hello');
            $('.btnNmode').attr('data-nmode', 'hello');
            $('.btnNmode').html('Switch to Hero Banner Mode');
            core.switchModes('hello');
        } else if (a === 'hello') {
            $(app.dom.b).attr('data-nmode', 'hero');
            $('.btnNmode').attr('data-nmode', 'hero');
            $('.btnNmode').html('Switch to Hello Bar Mode');
            core.switchModes('hero');
        }
    }).on('click', '.btnDel', function () {
        core.deleteItems('last');
    }).on('click', '.hideItem', function (e) {
        core.cacheClickedItem($(this));
        e.preventDefault();
    }).on('click', '.submit_json', function () {
        var a = $('.submit_json').attr('data-nmode');
        core.prepareJSON('full', null, a);
    }).on('click', '.translate_json', function () {
        $('.overlay_message').html('');
        $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css('overflow', 'hidden');
        $(app.objects.o).attr(app.handlers.r, 'translate').css('display', 'block').find('#output_code').val('').attr('placeholder', 'Paste you code here');
    }).on('click', '.translate_from_server', function () {
        var xPath = $('.translate_from_server').attr('tlh');
        core.loadFromServer(xPath);
    }).on('click', '.save_json', function () {
        if (app.save === true) {
            core.doLocalSave();
        } else {
            confirm('The save to localstorage feature is disabled. Change the save value to true in the globals file.');
        }
    }).on('click', '.import_json', function (e) {
        core.choseLocalSave();
    }).on('click', '.planb_friendly', function (e) {
        core.planBify();
        e.preventDefault();
    }).on('click', '.overlay_translate', function () {
        core.traverseJSON(false);
    }).on('click', '.errors_reset', function () {
        $('input,select').attr('style', '').attr('placeholder', '');
        $('.errorList').css('display', 'none');
        $(app.objects.r).css('overflow', 'auto');
        $(app.objects.i).find('.input_alerts').remove();
        $(app.objects.i).contents().unwrap();
        core.panelAlert('Errors Reset', 'good');
    }).on('click', '.form_reset', function (e) {
        $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css('overflow', 'hidden');
        $('.clonedInput:gt(0)').remove();
        $('.snapTo').find('li:gt(0)').remove();
        $('input').val('');
        $('input,select').attr('style', '').attr('placeholder', '');
        $('.errorList').css('display', 'none');
        $(app.objects.r).css('overflow', 'auto');
        $(app.objects.i).find('.input_alerts').remove();
        $(app.objects.i).contents().unwrap();
        $('.reordered').remove();
        core.panelAlert('Form Reset To Default', 'good');
        e.preventDefault();
    }).on('click', '.itemize_reset', function (e) {
        core.resetItems();
        e.preventDefault();
    }).on('click', '.form_local_reset', function (e) {
        core.doLocalSave('reset');
        $(app.objects.l).hide();
        e.preventDefault();
    }).on('click', 'input,select', function () {
        $(this).attr('style', '').attr('placeholder', '');
        if ($(this).parent().hasClass('input_holders')) {
            $(this).parent().find('.input_alerts').remove();
            $(this).unwrap();
        }
    }).on('click', '.helpItem', function () {
        var a = $(this).data('target');
        core.jumpToHelper(a);
    }).on('click', '.image_count', function () {
        $('.image_count').attr('style', '');
        $('.image_count').text('Shopify CDN');
    }).on('click', '.btnSwitch', function (e) {
        pfLang = $('.btnSwitch').data('language');
        $('.btnSwitch').removeClass('view-active');
        $(".btnSwitch[data-language=\"" + pfLang + "\"]").addClass('view-active');
        if ($(app.objects.ro).children().not('.preview_warning').length > 0) {
            core.previewFeature(pfHero, pfMode, pfLang);
        }
        core.panelAlert('Preview language changed', 'good');
        e.preventDefault();
    }).on('click', '.panel-body.bottom_level_bt', function () {
        $('.panel-body.bottom_level_bt').slideUp();
    }).on('click', '.show_me_how', function () {
        var a = $('.show_me_how').data('target') - 1;
        $(app.objects.r).animate({ scrollTop: 0 }, { duration: app.animation.d.min,
            complete: function complete() {
                $(app.objects.he).show();
                core.jumpToHelper(a);
            }
        }).css('overflow', 'hidden');
    }).on('click', '.helpItemReset', function () {
        $(app.objects.hi).animate({
            opacity: 1
        }, app.animation.d.min);
    }).on('click', '.settings_toggle', function (e) {
        var a = $(this).attr('data-theme');
        $('html').attr(app.handlers.t, a);
        if (window.localStorage) {
            localStorage.setItem('pgb_Theme', a);
        }
        core.panelAlert('Theme Settings Updated', 'good');
        e.preventDefault();
    }).on('click', '.moveUpThisItem', function (fn) {
        var a = $(this).data('item');
        var b = a - 1;
        var c = $(this).parent().parent().parent().parent().parent().parent();
        var d = $(c).closest(app.objects.cl).prev();
        var e = $(c).data('split');
        $(c).attr(app.handlers.s, e - 1);
        $(c).insertBefore(d);
        $(app.objects.r).animate({
            scrollTop: $(app.objects.e + a).offset().top - 60
        }, app.animation.d.min);
        //$(d).closest(app.objects.cl).prev();
        $(this).parent().parent().parent().find('.reordered').remove();
        $(this).parent().parent().parent().find('.btn.btn-info:not(.dropdown-toggle)').prepend('<span title="This entry has been moved from it\'s original position" class="glyphicon glyphicon-fullscreen reordered" aria-hidden="true"></span>');
        core.panelAlert('Item Order Changed', 'good');
        fn.preventDefault();
    }).on('click', '.moveDownThisItem', function (fn) {
        var a = $(this).data('item');
        var b = a - 1;
        var c = $(this).parent().parent().parent().parent().parent().parent();
        var d = $(c).closest(app.objects.cl).next();
        var e = $(c).data('split');
        var f = $(d).attr('id');
        if (f.includes('entry')) {
            $(c).attr(app.handlers.s, e + 1);
            $(c).insertAfter(d);
            $(app.objects.r).animate({
                scrollTop: $(app.objects.e + a).offset().top - 60
            }, app.animation.d.min);
            $(this).parent().parent().parent().find('.reordered').remove();
            $(this).parent().parent().parent().find('.btn.btn-info:not(.dropdown-toggle)').prepend('<span title="This entry has been moved from it\'s original position" class="glyphicon glyphicon-fullscreen reordered" aria-hidden="true"></span>');
            core.panelAlert('Item Order Changed', 'good');
        } else {
            core.panelAlert('If I move down any further, I\'ll be off the page.', 'error');
        }
        fn.preventDefault();
    }).on('click', '.batsToggle', function () {
        if ($('.batsToggle').attr('data-status') === 'active') {
            core.killBats();
        } else if ($('.batsToggle').attr('data-status') === 'allGone') {
            for (i = 0; i < 4; i++) {
                core.launchBats();
            }
            $('.batsToggle').attr('data-status', 'active').html('Kill The Bats');
        }
    }).on('keyup', 'input', function () {
        var a = $(this).val().length;
        var compLen = void 0;
        if ($(this).hasClass('objTitleEN') || $(this).hasClass('objTitleFR') || $(this).hasClass('objTextEN') || $(this).hasClass('objTextFR')) {
            compLen = 35;
        } else if ($(this).hasClass('objButtonEN') || $(this).hasClass('objButtonFR')) {
            compLen = 15;
        }
        if (a > compLen) {
            if ($(this).parent().attr('class') !== 'input_holders') {
                $(this).wrap('<div class="input_holders"></div>').parent().append('<div class="input_alerts" title="The length of your text may be too long for the hero banner container. Make sure to check that it displays correctly."><span class="glyphicon glyphicon-exclamation-sign"></span></div>');
                $(this).focus();
            }
        } else {
            if (a <= compLen) {
                if ($(this).parent().attr('class') === 'input_holders') {
                    $(this).parent().find('.input_alerts').remove();
                    $(this).unwrap();
                    $(this).focus();
                }
            }
        }
    }).on('keyup', '.num_select', function (e) {
        if (e.keyCode === 13) {
            $('.num_select').trigger("enterKey");
            core.addMulti($('.num_select').val());
            $('.num_select').parent().parent().parent().parent().hide();
        }
    }).on('keyup', '.lsl_select', function (e) {
        if (e.keyCode === 13) {
            $('.lsl_select').trigger("enterKey");
            core.prepareJSON('save', $('.lsl_select').val());
            $('.lsl_select').parent().parent().parent().parent().hide();
            core.setHeadSec();
        }
    }).on('keyup', app.objects.o + "[" + app.handlers.r + "=\"translate\"] #output_code", function (e) {
        if (e.keyCode === 45) {
            $(this).trigger("enterKey");
            core.traverseJSON(false);
            e.preventDefault();
        }
    }).on('change', '.objHeroSticky', function () {
        var a = $('.objHeroSticky').val();
        if (a === 'true') {
            $('.objHeroSticky').parent().parent().find('.objHeroPromote option[value="true"]').attr('selected', false);
        } else if (a === 'false') {
            //$('.objHeroSticky').parent().parent().find('.objHeroPromote option[value="false"]').attr('selected',true);
        }
    }).on('change', '.objButtonPopup', function () {
        var a = $('.objButtonPopup').val();
        if (a === 'true') {
            $('.objButtonPopup').parent().parent().find('.objButtonPopupLink').attr('style', '');
        } else if (a === 'false') {
            $('.objButtonPopup').parent().parent().find('.objButtonPopupLink').css('opacity', 0.3);
        }
    }).on('change', '.input_radio', function () {
        var a = $(this).parent().parent().parent().parent().parent().attr('id').replace('entry', '');
        if ($(this).val() === 'true') {
            $(this).parent().parent().css('border-left', '6px solid #68B81F');
            $(this).parent().parent().parent().parent().find('h2').find('span').removeClass('label-danger').addClass('label-default');
            $(".gotoItem[" + app.handlers.i + "=\"" + a + "\"]").removeClass('redout').attr('title', '');
        } else {
            $(this).parent().parent().css('border-left', '6px solid #FD0000');
            $(this).parent().parent().parent().parent().find('h2').find('span').removeClass('label-default').addClass('label-danger');
            $(".gotoItem[" + app.handlers.i + "=\"" + a + "\"]").addClass('redout').attr('title', 'This Hero entry is not activated');
        }
    }).on('change', '.lsOptions', function () {
        try {
            if ($('.lsOptions').val() !== "" || $('.lsOptions').val() !== "undefined" || $('.lsOptions').val() !== undefined || $('.lsOptions').val() !== "null" || $('.lsOptions').val() !== null) {
                var a = $('.lsOptions').val();
                core.traverseJSON(true, a);
                $('#loadandsave-zone').css('display', 'none');
            } else {
                panelAlert('Please select a valid data item from the dropdown', 'error');
            }
        } catch (e) {}
    }).on('click', '.addConditions', function () {
        var $targetObject = $('.addConditions').parent().parent().parent().parent().parent().parent().find('.form-group.option-selection');
        var $targetStatus = $targetObject.css('display');
        if ($targetStatus === 'none') {
            $targetObject.css('display', 'table');
        } else if ($targetStatus === 'table') {
            $targetObject.css('display', 'none');
        }
    });
    $(window).on('scroll', function () {
        if ($(window).scrollTop() + $(window).height() === $(document).height()) {
            $('.copy-zone').fadeIn(app.animation.d.min);
        } else {
            $('.copy-zone').fadeOut(app.animation.d.min);
        }
    }).on('resize', function () {
        core.scrollState('a');
    });
    $(document).on('keydown', function (e) {
        if (e.keyCode === 71 && e.ctrlKey) {
            var a = $('.submit_json').attr('data-nmode');
            core.prepareJSON('full', null, a);
            e.preventDefault();
        }
        if (e.keyCode === 82 && e.ctrlKey) {
            core.deleteItems();
            e.preventDefault();
        }
        if (e.keyCode === 73 && e.ctrlKey && !e.altKey) {
            core.addItems();
            e.preventDefault();
        }
        if (e.keyCode === 73 && e.ctrlKey && e.altKey) {
            $('#query-zone').toggle();
            $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min);
            if ($(app.objects.o).css('display') === 'block') {
                $(app.objects.o).css('display', 'none');
            }
            if ($(app.objects.h).css('display') === 'block') {
                $(app.objects.h).css('display', 'none');
            }
            $('.num_select').focus();
            e.preventDefault();
        }
        if (e.keyCode === 83 && e.ctrlKey && e.shiftKey) {
            if (app.save === true) {
                core.doLocalSave();
            } else {
                confirm('The save to localstorage feature is disabled. Change the save value to true in the globals file.');
            }
        }
        if (e.keyCode === 13 && e.ctrlKey && e.altKey) {
            $('.overlay_message').html('');
            $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css('overflow', 'hidden');
            $(app.objects.o).attr(app.handlers.r, 'translate').css('display', 'block').find('#output_code').val('').attr('placeholder', 'Paste you code here');
            e.preventDefault();
        }
        if (e.keyCode === 45 && e.ctrlKey && e.altKey) {
            core.choseLocalSave();
        }
        if (e.keyCode === 69 && e.ctrlKey && e.altKey) {
            if (pfLang === app.language.e) {
                pfLang = app.language.f;
            } else if (pfLang === app.language.f) {
                pfLang = app.language.e;
            }
            $('.btnSwitch').removeClass('view-active');
            $(".btnSwitch[data-language=\"" + pfLang + "\"]").addClass('view-active');
            if ($(app.objects.ro).children().not('.preview_warning').length > 0) {
                core.previewFeature(pfHero, pfMode, pfLang);
            }
            core.panelAlert('Preview language changed', 'good');
            e.preventDefault();
        }
        if (e.keyCode === 191 && e.ctrlKey) {
            window.open("release.html", "_blank", "scrollbars=no,resizable=no,height=600, width=800, status=yes, toolbar=no, menubar=no, location=no");
            e.preventDefault();
        }
    }).on('scroll', function () {
        core.scrollState('b');
        sPos = $(window).scrollTop();
    });
    var d = new Date();
    var dt = d.getDate();
    var dm = d.getMonth() + 1;
    if (dm === 10 && dt > 21) {
        $('.main_nav').append('<li class="divider"></li><li><a href="#" class="batsToggle" data-status="active">Kill The Bats</a></li>');
        for (var i = 0; i < 4; i++) {
            core.launchBats();
        }
    }
});

/***/ })
/******/ ]);