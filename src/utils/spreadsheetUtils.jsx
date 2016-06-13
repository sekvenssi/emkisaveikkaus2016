import SpreadSheet from 'google-spreadsheet-reader'
import { DATA_SHEET, RESULTS_SHEET } from '../constants/spreadsheets'
import { momentTime, sortDates } from './dateUtils'

export const mapFixture = (teams, fixture) => {
  const home = teams.filter(team => fixture.home === team.id)[0]
  const away = teams.filter(team => fixture.away === team.id)[0]
  const flagPrefix = 'flag-icon flag-icon-squared flag-icon-'

  return Object.assign({}, fixture, {
    homeName: home.country,
    awayName: away.country,
    homeAbbreviation: home.lyhenne,
    awayAbbreviation: away.lyhenne,
    date: momentTime(fixture.year, fixture.month, fixture.day, fixture.hour),
    homeFlag: flagPrefix + home.flagSrc,
    awayFlag: flagPrefix + away.flagSrc
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

export const getResults = () => {
  return new Promise((resolve, reject) => {
    const resultSheet = new SpreadSheet(RESULTS_SHEET)

    resultSheet.load().then(data => {
      resolve(data)
    }).catch(function(err) {
      reject(err)
    })
  })
}

export const getKartsanKaneetit = (data) => {
  const remainingMatches = data.fixtures.map(fixture => {
    if(fixture.isPlayed === '0'){
      return fixture.id
    }
  })

  return data.kartsan_kaneetit.filter(kaneetti => remainingMatches.includes(kaneetti.matsi_id))
}
