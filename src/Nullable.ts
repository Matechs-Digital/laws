import "fp-ts/lib/HKT"

/**
 * @since 0.0.2
 */
import * as fc from 'fast-check'
import { Monad1 } from "fp-ts/lib/Monad"

export type Nullable<A> = A | null

export const none = null
export const some = <A>(a: A) => a

declare module "fp-ts/lib/HKT" {
  interface URItoKind<A> {
    Nullable: Nullable<A>
  }
}

export const Monad: Monad1<"Nullable"> = {
  URI: "Nullable",
  ap: (f, fa) => fa === null ? null : f === null ? null : f(fa),
  chain: (fa, f) => fa === null ? null : f(fa),
  map: (fa, f) => fa === null ? null : f(fa),
  of: (a) => a
}

/**
 * Returns an `Arbitrary` that yelds only `some`s
 *
 * @since 0.0.2
 */
export function getSome<A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Nullable<A>> {
  return arb.map(some)
}

/**
 * Returns an `Arbitrary` that yelds only `none`s
 *
 * @since 0.0.2
 */
export function getNone<A>(): fc.Arbitrary<Nullable<A>> {
  return fc.constant(none)
}

/**
 * Returns an `Arbitrary` that yelds both `none`s and `some`s
 *
 * @since 0.0.2
 */
export function getOption<A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Nullable<A>> {
  return fc.oneof(getNone<A>(), getSome<A>(arb))
}
