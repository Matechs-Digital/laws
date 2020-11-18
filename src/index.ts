/**
 * @since 0.0.1
 */
import * as fc from 'fast-check'
import { Eq, eqNumber } from 'fp-ts/lib/Eq'
import { Functor, Functor1 } from 'fp-ts/lib/Functor'
import { HKT, Kind, URIS } from 'fp-ts/lib/HKT'
import * as laws from './laws'


/**
 * Tests the `Functor` laws
 *
 * @since 0.1.0
 */
export function testFunctorComposition<F extends URIS>(
  F: Functor1<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<Kind<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<Kind<F, A>>) => void
export function testFunctorComposition<F>(
  F: Functor<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<HKT<F, A>>) => void
export function testFunctorComposition<F>(
  F: Functor<F>
): (lift: <A>(a: fc.Arbitrary<A>) => fc.Arbitrary<HKT<F, A>>, liftEq: <A>(Sa: Eq<A>) => Eq<HKT<F, A>>) => void {
  return (lift, liftEq) => {
    const arb = lift(fc.string())
    const Sc = liftEq(eqNumber)
    const ab = (s: string): number | undefined | null => (s.length === 1 ? undefined : s.length === 2 ? null : s.length)
    const bc = (n: number | undefined | null): number => (n === undefined ? 1 : n === null ? 2 : n * 2)

    const composition = fc.property(arb, laws.functor.composition(F, Sc, ab, bc))

    fc.assert(composition, { seed: -525356605, path: "26:2:2", endOnFailure: true, verbose: true })
  }
}
