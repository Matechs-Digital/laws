import * as laws from '../src'
import * as N from '../src/Nullable'

describe('non-monad', () => {
  it('should test Monad laws', () => {
    laws.testFunctorComposition(N.Monad)(
      (arb) => arb.map(N.Monad.of),
      (eq) => ({
        equals: (x, y) => (x === null && y === null ? true : x !== null && y !== null ? eq.equals(x, y) : false),
      })
    )
  })
})
