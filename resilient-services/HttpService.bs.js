'use strict';

var Nact = require("../src/Nact.bs.js");
var Store = require("./Store.bs.js");
var Express = require("bs-express/src/Express.bs.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var BillService = require("./BillService.bs.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

var timeout = Math.imul(100, Nact.milliseconds);

function express(billService, customerService) {
  var app = Express.express(undefined);
  Express.App.use(app, Express.Middleware.json(undefined, undefined, undefined, undefined));
  Express.App.get(app, "/customer/:id", Express.PromiseMiddleware.from(function (param, req, res) {
            return Nact.query(timeout, customerService, (function (caller) {
                            return [
                                    caller,
                                    {
                                      TAG: /* GetCustomer */0,
                                      _0: Caml_format.caml_int_of_string(Json_decode.string(Express.$$Request.params(req)["id"]))
                                    }
                                  ];
                          })).then(function (customer) {
                        if (customer.TAG === /* Customer */0) {
                          return Promise.resolve(Express.$$Response.sendJson(Store.encode(customer._0), res));
                        } else {
                          return Pervasives.failwith("Shouldn't happen");
                        }
                      });
          }));
  Express.App.post(app, "/bill/pay", Express.PromiseMiddleware.from(function (param, req, res) {
            return Nact.query(timeout, billService, (function (caller) {
                            return [
                                    caller,
                                    BillService.decode(Js_option.getExn(Express.$$Request.bodyJSON(req)))
                                  ];
                          })).then(function (billId) {
                        return Promise.resolve(Express.$$Response.sendJson(billId, res));
                      });
          }));
  return Express.App.listen(app, 3000, undefined, (function (err) {
                console.log((err == null) ? "Started HTTP server on port " + 3000 : "Could not start HTTP server");
                
              }), undefined);
}

function make(parent, billService, customerService) {
  return Nact.spawn("HttpService", undefined, undefined, parent, (function (express, param, param$1) {
                return Promise.resolve(express);
              }), (function (param) {
                return express(billService, customerService);
              }));
}

var port = 3000;

exports.timeout = timeout;
exports.port = port;
exports.express = express;
exports.make = make;
/* Nact Not a pure module */
