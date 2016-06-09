export const getSingleResult = (fixtures, fixtureId) => {
  return fixtures.filter(fixture => fixture.id === fixtureId)[0]
}
