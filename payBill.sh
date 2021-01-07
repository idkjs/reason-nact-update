#!/bin/sh
curl -X POST -H "Content-Type: application/json" -d '{"customerId": 1234, "payDate": "2018-03-19", "amount": 30}' http://localhost:3000/bill/pay

# curl -H "Content-Type: application/json" -d '{"customerId": 1234, "payDate": "2018-03-19", "amount": 30}' http://localhost:3000/bill/pay
