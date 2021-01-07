'use strict';

var Nact = require("../src/Nact.bs.js");
var BillService = require("./BillService.bs.js");
var HttpService = require("./HttpService.bs.js");
var CustomerService = require("./CustomerService.bs.js");

var system = Nact.start(undefined, undefined, undefined);

var customerService = CustomerService.make(system);

var billService = BillService.make(system, customerService);

var httpService = HttpService.make(system, billService, customerService);

exports.system = system;
exports.customerService = customerService;
exports.billService = billService;
exports.httpService = httpService;
/* system Not a pure module */
