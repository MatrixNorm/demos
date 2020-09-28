import { verify, make, Payment, VerifiedPayment } from "./payments";

const payment = {
  from: "A",
  to: "B",
  amount: 100.0,
};

const verifiedPayment = verify(payment);
make(verifiedPayment);

verify(verifiedPayment);

make({ ...payment, tag: true } as VerifiedPayment);

let x = { ...payment } as VerifiedPayment;
make(x);
