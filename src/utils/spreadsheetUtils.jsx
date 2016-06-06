import SpreadSheet from 'google-spreadsheet-reader'
import { DATA_SHEET, RESULTS_SHEET } from '../constants/spreadsheets'
import { momentTime, sortDates } from './dateUtils'

export const mapFixture = (teams, fixture) => {
  return Object.assign({}, fixture, {
    homeName: teams.filter(team => fixture.home === team.id)[0].country,
    awayName: teams.filter(team => fixture.away === team.id)[0].country,
    date: momentTime(fixture.year, fixture.month, fixture.day, fixture.hour)
  })
}

export const getPreviousGames = (namedFixtures, amount) => {
  const playedGames = namedFixtures.filter(fixture => fixture.isPlayed === '1')
  //cannot slice more than has been played
  const realAmount = amount > playedGames.length ? playedGames.length : amount
  return playedGames.slice(playedGames.length - realAmount, playedGames.length)
}

export const getNextGames = (namedFixtures, amount) => {
  const notPlayedGames = namedFixtures.filter(fixture => fixture.isPlayed === '0')
  return notPlayedGames.slice(0,amount)
}

export const getAllFixturesNamed = (data) => {
    const { teams, fixtures } = data
    return fixtures.map(fixture => mapFixture(teams, fixture))
}

export const getData = () => {
  return new Promise((resolve, reject) => {
    const teamSheet = new SpreadSheet(DATA_SHEET)

    teamSheet.load().then(data => {
      resolve(data)
    }).catch(function(err) {
      reject(err)
    })
  })
}
