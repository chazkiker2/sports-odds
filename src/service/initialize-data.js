const fs = require("fs")
const Promise = require("polyfill-promise")
const Sheets = require("google-sheets-api").Sheets
const utils = require("./util.js")
const uuidv4 = require("uuid").v4
const env = require("../constants/env.js")

const documentId = env.documentId
const serviceEmail = env.serviceEmail
const pathToServiceKey = env.pathToServiceKey
const serviceKey = fs.readFileSync(pathToServiceKey).toString()

const sheets = new Sheets({ email: serviceEmail, key: serviceKey })
const colMap = {
    22: "V",
    5: "E",
    6: "F",
}
const sheetNameMap = {
    off: "offensiveStats",
    def: "defensiveStats",
    "trends-all-games": "trendsAllGames",
    "trends-as-fav": "trendsAsFav",
    "trends-as-away-underdog": "trendsAsAwayUnderdog",
    "trends-as-home-underdog": "trendsAsHomeUnderdog",
    "trends-as-away-fav": "trendsAsAwayFav",
    "trends-as-home-fav": "trendsAsHomeFav",
    "trends-against-ranked-opp": "trendsAgainstRankedOpp",
    "rank-last-10-games": "rankLast10Games",
    "rank-schedule-strength": "rankScheduleStrength",
}

async function buildData() {
    const sheetsInfo = await sheets.getSheets(documentId)
    const relevantSheets = sheetsInfo.slice(1, 12)

    const sheetData = await Promise.all(
        relevantSheets.map(async (sheetInfo) => {
            const data = await sheets.getRange(
                documentId,
                sheetInfo.id,
                `A1:${colMap[sheetInfo.colCount]}${sheetInfo.rowCount}`
            )
            return {
                metadata: { ...sheetInfo },
                data,
            }
        })
    )

    const allTeams = {}

    sheetData.forEach((sheet) => {
        const { metadata, data } = sheet
        const sheetName = metadata.title

        if (data == undefined) {
            return
        }

        const headersRow = data[0].map((x) => (x === "3:00 PM" ? "3PM" : x))
        const entryRows = data.slice(1)

        const headersMap = {}
        const entries = []

        headersRow.map((x) => {
            let content = x.content
            if (content == "3:00 PM") {
                content = "3PM"
            }
            headersMap[x.column] = content
        })

        entryRows.map((entry) => {
            let entryObj = {}
            const originalData = {}
            entry.map((x) => {
                originalData[headersMap[x.column]] = x.content
                entryObj = { ...originalData }
            })

            if (sheetName == "off" || sheetName == "def") {
                entryObj = {
                    team: originalData["Team"],
                    gamesPlayed: parseFloat(originalData["GP"]),
                    minutesPlayedPerGame: parseFloat(originalData["MPG"]),
                    pointsPerGame: parseFloat(originalData["PPG"]),
                    fieldGoalsMade: parseFloat(originalData["FGM"]),
                    fieldGoalsAttempted: parseFloat(originalData["FGA"]),
                    fieldGoalsPercentage: parseFloat(originalData["FG%"]),
                    threePointsMade: parseFloat(originalData["3PM"]),
                    threePointsAttempted: parseFloat(originalData["3PA"]),
                    threePointsPercentage: parseFloat(originalData["3P%"]),
                    freeThrowsMade: parseFloat(originalData["FTM"]),
                    freeThrowsAttempted: parseFloat(originalData["FTA"]),
                    freeThrowsPercentage: parseFloat(originalData["FT%"]),
                    offensiveReboundsPerGame: parseFloat(originalData["ORB"]),
                    defensiveReboundsPerGame: parseFloat(originalData["DRB"]),
                    reboundsPerGame: parseFloat(originalData["RPG"]),
                    assistsPerGame: parseFloat(originalData["APG"]),
                    blocksPerGame: parseFloat(originalData["BPG"]),
                    turnoversPerGame: parseFloat(originalData["TOV"]),
                    personalFoulsPerGame: parseFloat(originalData["PF"]),
                }
            } else if (
                sheetName == "trends-all-games" ||
                sheetName == "trends-as-fav" ||
                sheetName == "trends-as-away-underdog" ||
                sheetName == "trends-as-home-underdog" ||
                sheetName == "trends-as-home-fav" ||
                sheetName == "trends-as-away-fav"
            ) {
                entryObj = {
                    team: originalData["Team"],
                    atsRecord: originalData["ATS Record"],
                    coverPercentage: originalData["Cover %"],
                    mov: originalData["MOV"],
                    atsPlusMinus: originalData["ATS +/-"],
                }
            } else if (
                sheetName == "rank-schedule-strength" ||
                sheetName == "rank-last-10-games"
            ) {
                entryObj = {
                    rank: originalData["Rank"],
                    team: originalData["Team"],
                    rating: originalData["Rating"],
                    hi: originalData["Hi"],
                    low: originalData["Low"],
                    last: originalData["Last"],
                }
            } else if (sheetName == "trends-against-ranked-opp") {
                entryObj = {
                    team: originalData["Team"],
                    winLossRecord: originalData["Win-Loss Record"],
                    winPercentage: originalData["Win %"],
                    mov: originalData["MOV"],
                    atsPlusMinus: originalData["ATS +/-"],
                }
            }

            entries.push(entryObj)

            let teamName = entryObj.team
            teamName = utils.normalizeTeamName(teamName)
            if (!(teamName in allTeams)) {
                allTeams[teamName] = {}
            }
            allTeams[teamName][sheetNameMap[sheetName]] = entryObj
        })

        if (sheetName == "off" || sheetName == "def") {
            const offSorted = {
                pointsPerGame: [...entries],
                fieldGoalsPercentage: [...entries],
                freeThrowsPercentage: [...entries],
                reboundsPerGame: [...entries],
                turnoversPerGame: [...entries],
                threePointsPercentage: [...entries],
                personalFoulsPerGame: [...entries],
            }
            offSorted.pointsPerGame.sort((a, b) =>
                sheetName == "def"
                    ? a.pointsPerGame - b.pointsPerGame
                    : b.pointsPerGame - a.pointsPerGame
            )
            offSorted.fieldGoalsPercentage.sort((a, b) =>
                sheetName == "def"
                    ? a.fieldGoalsPercentage - b.fieldGoalsPercentage
                    : b.fieldGoalsPercentage - a.fieldGoalsPercentage
            )
            offSorted.freeThrowsPercentage.sort((a, b) =>
                sheetName == "def"
                    ? a.freeThrowsPercentage - b.freeThrowsPercentage
                    : b.freeThrowsPercentage - a.freeThrowsPercentage
            )
            offSorted.reboundsPerGame.sort((a, b) =>
                sheetName == "def"
                    ? a.reboundsPerGame - b.reboundsPerGame
                    : b.reboundsPerGame - a.reboundsPerGame
            )
            offSorted.threePointsPercentage.sort((a, b) =>
                sheetName == "def"
                    ? a.threePointsPercentage - b.threePointsPercentage
                    : b.threePointsPercentage - a.threePointsPercentage
            )
            offSorted.turnoversPerGame.sort((a, b) =>
                sheetName == "def"
                    ? b.turnoversPerGame - a.turnoversPerGame
                    : a.turnoversPerGame - b.turnoversPerGame
            )
            offSorted.personalFoulsPerGame.sort((a, b) =>
                sheetName == "def"
                    ? b.personalFoulsPerGame - a.personalFoulsPerGame
                    : a.personalFoulsPerGame - b.personalFoulsPerGame
            )

            for (const teamName in allTeams) {
                const key = sheetNameMap[sheetName]
                allTeams[teamName].rank ??= {}
                allTeams[teamName].rank[
                    sheetName === "def" ? "defense" : "offense"
                ] = {
                    pointsPerGame:
                        offSorted.pointsPerGame.findIndex(
                            (x) => x.team === allTeams[teamName][key].team
                        ) + 1,
                    fieldGoalsPercentage:
                        offSorted.fieldGoalsPercentage.findIndex(
                            (x) => x.team === allTeams[teamName][key].team
                        ) + 1,
                    freeThrowsPercentage:
                        offSorted.freeThrowsPercentage.findIndex(
                            (x) => x.team === allTeams[teamName][key].team
                        ) + 1,
                    reboundsPerGame:
                        offSorted.reboundsPerGame.findIndex(
                            (x) => x.team === allTeams[teamName][key].team
                        ) + 1,
                    turnoversPerGame:
                        offSorted.turnoversPerGame.findIndex(
                            (x) => x.team === allTeams[teamName][key].team
                        ) + 1,
                    threePointsPercentage:
                        offSorted.threePointsPercentage.findIndex(
                            (x) => x.team === allTeams[teamName][key].team
                        ) + 1,
                    personalFoulsPerGame:
                        offSorted.personalFoulsPerGame.findIndex(
                            (x) => x.team === allTeams[teamName][key].team
                        ) + 1,
                }
            }
        } else if (sheetName === "trends-against-ranked-opp") {
            const sorted = [...entries]
            sorted.sort((a, b) => b.winLossRecord - a.winLossRecord)

            for (const teamName in allTeams) {
                const key = sheetNameMap[sheetName]
                const relevantTeam = allTeams[teamName][key]?.team
                if (relevantTeam != undefined) {
                    allTeams[teamName].rank ??= {}
                    allTeams[teamName].rank.sosRating =
                        sorted.findIndex((x) => x.team === relevantTeam) + 1
                }
            }
        } else if (sheetName === "rank-last-10-games") {
            const sorted = [...entries]
            sorted.sort((a, b) => b.rating - a.rating)
            for (const teamName in allTeams) {
                const key = sheetNameMap[sheetName]
                const relevantTeam = allTeams[teamName][key]?.team
                if (relevantTeam != undefined) {
                    allTeams[teamName].rank ??= {}
                    allTeams[teamName].rank.sosRating =
                        sorted.findIndex((x) => x.team === relevantTeam) + 1
                }
            }
        } else if (sheetName === "rank-schedule-strength") {
            const sorted = [...entries]
            sorted.sort((a, b) => b.rating - a.rating)
            for (const teamName in allTeams) {
                const key = sheetNameMap[sheetName]
                console.log(key)
                const relevantTeam = allTeams[teamName][key]?.team
                if (relevantTeam != undefined) {
                    allTeams[teamName].rank ??= {}
                    allTeams[teamName].rank.sosRating =
                        sorted.findIndex((x) => x.team === relevantTeam) + 1
                }
            }
        }
    })

    const teams = {}
    const nameMap = {}
    for (const k in allTeams) {
        const team = allTeams[k]
        team.name = k
        const guid = uuidv4()
        team.guid = guid
        teams[guid] = team
        nameMap[k] = guid
    }
    fs.writeFile(
        `src/data/all-teams-v2.json`,
        JSON.stringify(teams),
        "utf8",
        (x) => {}
    )
    fs.writeFile(
        `src/data/name-to-guid-map.json`,
        JSON.stringify(nameMap),
        "utf8",
        (x) => {}
    )
}

buildData().then(console.log).catch(console.error)

/*
node src/service/initialize-data.js
*/
