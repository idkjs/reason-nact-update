'use strict';

var Nact = require("../src/Nact.bs.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function decode(json) {
  return {
          customerId: Json_decode.field("customerId", Json_decode.$$int, json),
          payDate: Json_decode.field("payDate", Json_decode.string, json),
          amount: Json_decode.field("amount", Json_decode.$$float, json)
        };
}

function make(parent, customerService) {
  return Nact.spawnStateless("BillService", undefined, parent, (function (param, _ctx) {
                var bill = param[1];
                var caller = param[0];
                if (bill.amount < 25) {
                  throw {
                        RE_EXN_ID: "Assert_failure",
                        _1: [
                          "BillService.re",
                          21,
                          4
                        ],
                        Error: new Error()
                      };
                }
                if (bill.customerId < 1) {
                  throw {
                        RE_EXN_ID: "Assert_failure",
                        _1: [
                          "BillService.re",
                          22,
                          4
                        ],
                        Error: new Error()
                      };
                }
                if (bill.payDate === "") {
                  throw {
                        RE_EXN_ID: "Assert_failure",
                        _1: [
                          "BillService.re",
                          23,
                          4
                        ],
                        Error: new Error()
                      };
                }
                return Nact.query(Math.imul(100, Nact.milliseconds), customerService, (function (caller$prime) {
                                return [
                                        caller$prime,
                                        {
                                          TAG: /* PayBill */1,
                                          _0: bill
                                        }
                                      ];
                              })).then(function (id) {
                            if (id.TAG === /* Customer */0) {
                              return Promise.resolve(undefined);
                            } else {
                              return Promise.resolve(Nact.dispatch(caller, id._0));
                            }
                          });
              }));
}

exports.decode = decode;
exports.make = make;
/* Nact Not a pure module */
