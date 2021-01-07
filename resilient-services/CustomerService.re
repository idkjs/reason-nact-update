/** Actor to manage querying and updating customers. */

// open Types;

let make = parent =>
  Nact.spawn(
    ~name=__MODULE__,
    parent,
    (store, (caller, msg), _ctx) => {
      Types.(
        switch (msg) {
        | GetCustomer(id) =>
          Nact.dispatch(caller, Customer(Store.info(id, store)));
          Js.Promise.resolve(store);
        | PayBill(bill) =>
          let (store, hash) = Store.payBill(bill, store);
          Nact.dispatch(caller, BillRef(hash));
          Js.Promise.resolve(store);
        }
      )
    },
    _ => Store.initial,
    // Store.initial,
  );
