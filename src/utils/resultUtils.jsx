import { getAllFixturesNamed } from './spreadsheetUtils'
import _ from 'underscore'

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

export const getSingleUserBetResults = (userBets, namedFixtures) => {
  let singleMatchScore = 0, singleBetResult = {}, singleResult = {}, singleFixture = {}

  return userBets.map(userBet => {
    singleMatchScore = 0
    singleResult = getSingleResult(namedFixtures, userBet.matchId)
    singleFixture = getSingleFixture(namedFixtures, userBet.matchId)
    singleBetResult = getBetResult(userBet, singleResult)

    // calculate scores
    singleMatchScore += singleBetResult.resultBetOk ? 3 : 0

    if(!singleBetResult.resultBetOk){
      singleMatchScore += singleBetResult.winnerBetOk ? 1 : 0
    }

    return {
      matchId: userBet.matchId,
      homeName: singleFixture.homeName,
      awayName: singleFixture.awayName,
      matchScore: singleMatchScore,
      betHome: userBet.home,
      betAway: userBet.away,
      resultHome: singleResult.homegoals,
      resultAway: singleResult.awaygoals,
      cssClass: singleBetResult.cssClass
    }
  })
}

export const getAllUsersBetResults = (data, results) => {
  const { users } = results
  const namedFixtures = getAllFixturesNamed(data)
  const specialBetResults = getSpecialBetResults(data)
  let userBets = [], betResults = [], userSpecialBets = [], userSpecialBetResults = [], totalScore = 0

  const allUserBetResults = users.map(user => {
    userBets = getUserBets(results, user.id)
    betResults = getSingleUserBetResults(userBets, namedFixtures)
    userSpecialBets = getUserSpecialBets(results.erkkarit, user.id)
    userSpecialBetResults = getUserSpecialBetResults(userSpecialBets, specialBetResults)

    // count total
    totalScore = 0
    totalScore += betResults.map(betResult => betResult.matchScore).reduce((a, b) => a + b, 0)
    totalScore += userSpecialBetResults.totalScore

    return {
      user: user,
      totalScore: totalScore,
      betResults: betResults,
      specialBetResults: userSpecialBetResults
    }
  })

  return sortAllUsersByScore(allUserBetResults)
}

export const sortAllUsersByScore = (allUserBetResults) => {
  return allUserBetResults.sort((a, b) => b.totalScore - a.totalScore)
}

export const getTopTen = (data, results) => {
  return getAllUsersBetResults(data, results).slice(0,10)
}

export const getUserRanking = (allUsersBetResult, userId) => {
  const userBet = allUsersBetResult.filter(userBetResult => userBetResult.user.id === userId)[0]

  return allUsersBetResult.indexOf(userBet) + 1
}

export const getSpecialBetResults = (data) => {
  return data.erkkarit
}

export const getUserSpecialBets = (specialbets, userId) => {
  return specialbets.filter(specialBet => specialBet.id === userId)[0]
}

export const getUserSpecialBetResults = (userSpecialBets, specialBetResults) => {
  let success = false

  const specialBetRows = specialBetResults.map(sbr => {
    if(sbr.isPlayed === '0'){
      return Object.assign({}, sbr, { userPoints: 0 })
    }

    switch(sbr.resultCheckType){
      case 'equals':
        success = handleSpecialEquals(sbr, userSpecialBets)
        return Object.assign({}, sbr, {
          userPoints: success ? parseInt(sbr.points) : 0,
          cssClass: success ? 'success' : 'danger'
        })
      case 'contains':
        success = handleSpecialContains(sbr, userSpecialBets)
        return Object.assign({}, sbr, {
          userPoints: success ? parseInt(sbr.points) : 0,
          cssClass: success ? 'success' : 'danger'
        })
      default:
        return Object.assign({}, sbr, { userPoints: 0 })
    }
  })

  return {
    specialBetRows: specialBetRows,
    totalScore: getSpecialBetRowsTotalScore(specialBetRows)
  }

}

export const handleSpecialEquals = (specialBetResult, userBetResult) => {
  return specialBetResult.result === userBetResult['e_' + specialBetResult.id]
}

export const handleSpecialContains = (specialBetResult, userSpecialBets) => {
  const range = _.range(parseInt(specialBetResult.containsStart), parseInt(specialBetResult.containsEnd))
  const containsBets = range.map(r => userSpecialBets['e_' + r])

  return containsBets.indexOf(specialBetResult.result) > -1
}

export const getSpecialBetRowsTotalScore = (specialBetRows) => {
  return specialBetRows.map(sbr => sbr.userPoints).reduce((a, b) => a + b, 0)
}
