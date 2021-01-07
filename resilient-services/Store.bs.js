'use strict';

var $$Map = require("bs-platform/lib/js/map.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Hashtbl = require("bs-platform/lib/js/hashtbl.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");

var compare = Caml_obj.caml_compare;

var IntMap = $$Map.Make({
      compare: compare
    });

var initial = Curry._3(IntMap.add, 1234, {
      customerId: 1234,
      name: "Bob Roberts",
      lastPayDate: undefined,
      balance: 150
    }, IntMap.empty);

function payBill(bill, store) {
  var customerId = bill.customerId;
  var customer = Curry._2(IntMap.find, customerId, store);
  var customer_customerId = customer.customerId;
  var customer_name = customer.name;
  var customer_lastPayDate = bill.payDate;
  var customer_balance = customer.balance - bill.amount;
  var customer$1 = {
    customerId: customer_customerId,
    name: customer_name,
    lastPayDate: customer_lastPayDate,
    balance: customer_balance
  };
  return [
          Curry._3(IntMap.add, customerId, customer$1, store),
          Hashtbl.hash(customer$1)
        ];
}

function encode(param) {
  return Json_encode.object_({
              hd: [
                "customerId",
                param.customerId
              ],
              tl: {
                hd: [
                  "name",
                  param.name
                ],
                tl: {
                  hd: [
                    "lastPayDate",
                    Json_encode.nullable((function (prim) {
                            return prim;
                          }), param.lastPayDate)
                  ],
                  tl: {
                    hd: [
                      "balance",
                      param.balance
                    ],
                    tl: /* [] */0
                  }
                }
              }
            });
}

var info = IntMap.find;

exports.IntMap = IntMap;
exports.initial = initial;
exports.payBill = payBill;
exports.info = info;
exports.encode = encode;
/* IntMap Not a pure module */
