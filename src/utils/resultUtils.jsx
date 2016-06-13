export const getSingleResult = (fixtures, fixtureId) => {
  return fixtures.filter(fixture => parseInt(fixture.id) === fixtureId)[0]
}

export const getSingleUserBet = (gameResults, userId) => {
  return gameResults.filter(game => game.id === userId)[0]
}

export const getUserBets = (results, userId) => {
  const matchIds = [...Array(36).keys()]
  const prefix = 'g_'
  let matchId = -1
  let matchResults = []
  let singleResult = {}

  return matchIds.map(i => {
    matchId = i + 1
    matchResults = results[prefix + matchId]
    singleResult = getSingleUserBet(matchResults, userId)
    return {
      matchId: matchId,
      home: singleResult.home,
      away: singleResult.away,
      betWinner: singleResult.result
    }
  })
}

export const getBetResult = (bet, result) => {
  const isPlayed = result.isPlayed === '1'

  return {
    resultBetOk: isPlayed ? resultBetOk(bet, result) : false,
    winnerBetOk: isPlayed ? winnerBetOk(bet, result): false,
    cssClass: getBetCssClass(bet, result)
  }
}

export const resultBetOk = (bet, result) => {
  return result.homegoals === bet.home && result.awaygoals === bet.away
}

export const winnerBetOk = (bet, result) => {
  return bet.betWinner === result.matchWinner
}

export const getBetCssClass = (bet, result) => {
  let cssClass = ''

  if(result.isPlayed === '1'){
    if(resultBetOk(bet, result)){
      cssClass = 'success'
    }else if(winnerBetOk(bet, result)){
      cssClass = 'warning'
    }else {
      cssClass = 'danger'
    }
  }

  return cssClass
}

export const getSingleFixture = (namedFixtures, fixtureId) => {
  return namedFixtures.filter(fixture => parseInt(fixture.id) === fixtureId)[0]
}

export const getUserName = (users, userId) => {
  return users.filter(user => user.id === userId)[0].Nimi
}
