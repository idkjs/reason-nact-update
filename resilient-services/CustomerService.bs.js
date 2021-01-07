'use strict';

var Nact = require("../src/Nact.bs.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Store = require("./Store.bs.js");

function make(parent) {
  return Nact.spawn("CustomerService", undefined, undefined, parent, (function (store, param, _ctx) {
                var msg = param[1];
                var caller = param[0];
                if (msg.TAG === /* GetCustomer */0) {
                  Nact.dispatch(caller, {
                        TAG: /* Customer */0,
                        _0: Curry._2(Store.info, msg._0, store)
                      });
                  return Promise.resolve(store);
                }
                var match = Store.payBill(msg._0, store);
                Nact.dispatch(caller, {
                      TAG: /* BillRef */1,
                      _0: match[1]
                    });
                return Promise.resolve(match[0]);
              }), (function (param) {
                return Store.initial;
              }));
}

exports.make = make;
/* Nact Not a pure module */
