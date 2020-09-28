export type Payment = {
  from: string;
  to: string;
  amount: number;
};

declare const tag: unique symbol;
export type VerifiedPayment = Payment & {
  readonly [tag]: true;
};

export function verify(p: Payment): VerifiedPayment {
  return { ...p } as VerifiedPayment;
}

export function make(p: VerifiedPayment): boolean {
  return true;
}
