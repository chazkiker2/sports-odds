var fs = require('fs');
var Promise = require('polyfill-promise');
var Sheets = require('google-sheets-api').Sheets;
var utils  = require("./util.js");

// TODO: split these values into .env

var documentId = '<GET_FROM_ENV>';
var serviceEmail = '<GET_FROM_ENV>';
var serviceKey = fs.readFileSync('<GET_FROM_ENV>').toString();

const sheets = new Sheets({ email: serviceEmail, key: serviceKey });
const colMap = {
    22: "V",
    5: "E",
    6: "F",
}




async function buildData() {

    const sheetsInfo = await sheets.getSheets(documentId);
    const relevantSheets = sheetsInfo.slice(1,12);


    const sheetEntries = {}

    const sheetData = await Promise.all(relevantSheets.map(async (sheetInfo) => {
        const data = await sheets.getRange(documentId, sheetInfo.id, `A1:${colMap[sheetInfo.colCount]}${sheetInfo.rowCount}`)

        sheetEntries[sheetInfo.title] = data;

        return {
            metadata: {...sheetInfo},
            data,
        }

    }))





    const allTeams = {};


    sheetData.forEach(
        sheet => {


            const metadata = sheet.metadata;
            const data = sheet.data;

            if (data == undefined) {
                return;
            }

            const headersRow = data[0].map(x => x === "3:00 PM" ? "3PM" : x);
            const entryRows = data.slice(1)

            const headersMap = {}
            const entries = []
            headersRow.map(x => {

                let content = x.content;
                if (content == "3:00 PM") {
                    content = "3PM"
                }
                // const columnCC = convertStringToCamelCase(content)
                // headersMap[x.column] = columnCC.toLowerCase();
                headersMap[x.column] = content
            })


            entryRows.map(entry => {
                let entryObj = {};
                const originalData = {}
                entry.map(x => {
                    originalData[headersMap[x.column]] = x.content
                    entryObj = {...originalData}
                })

                if (sheet.metadata.title == "off" || sheet.metadata.title == "def") {
                    entryObj = {
                        originalData,
                        "Team": originalData["Team"],
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


                }



                entries.push(entryObj)
                console.log(entryObj)
                console.log(originalData)
                let teamName = entryObj["Team"];
                teamName = utils.normalizeTeamName(teamName);
                if (!(teamName in allTeams)) {
                    allTeams[teamName]= {}
                }
                allTeams[teamName][metadata.title] = entryObj;
            })




            const js = {
                metadata,
                entries,

            }

            if (sheet.metadata.title == "off" || sheet.metadata.title == "def") {
                const offSorted = {
                    pointsPerGame: [...entries],
                    fieldGoalsPercentage: [...entries],
                    freeThrowsPercentage: [...entries],
                    reboundsPerGame: [...entries],
                    turnoversPerGame: [...entries],
                    threePointsPercentage: [...entries],
                    personalFoulsPerGame: [...entries],
                }
                offSorted.pointsPerGame.sort((a, b) => b.pointsPerGame - a.pointsPerGame);
                offSorted.fieldGoalsPercentage.sort((a, b) => b.fieldGoalsPercentage - a.fieldGoalsPercentage);
                offSorted.freeThrowsPercentage.sort((a, b) => b.freeThrowsPercentage - a.freeThrowsPercentage);
                offSorted.reboundsPerGame.sort((a, b) => b.reboundsPerGame - a.reboundsPerGame);
                offSorted.turnoversPerGame.sort((a, b) => b.turnoversPerGame - a.turnoversPerGame);
                offSorted.threePointsPercentage.sort((a, b) => b.threePointsPercentage - a.threePointsPercentage);
                offSorted.personalFoulsPerGame.sort((a, b) => b.personalFoulsPerGame - a.personalFoulsPerGame);

                for (const teamName in allTeams) {
                    const key = sheet.metadata.title
                    allTeams[teamName][key].rank = {
                        pointsPerGame: offSorted.pointsPerGame.findIndex(x => x.team === allTeams[teamName][key].team) + 1,
                        fieldGoalsPercentage: offSorted.fieldGoalsPercentage.findIndex(x => x.team === allTeams[teamName][key].team) + 1,
                        freeThrowsPercentage: offSorted.freeThrowsPercentage.findIndex(x => x.team === allTeams[teamName][key].team) + 1,
                        reboundsPerGame: offSorted.reboundsPerGame.findIndex(x => x.team === allTeams[teamName][key].team) + 1,
                        turnoversPerGame: offSorted.turnoversPerGame.findIndex(x => x.team === allTeams[teamName][key].team) + 1,
                        threePointsPercentage: offSorted.threePointsPercentage.findIndex(x => x.team === allTeams[teamName][key].team) + 1,
                        personalFoulsPerGame: offSorted.personalFoulsPerGame.findIndex(x => x.team === allTeams[teamName][key].team) + 1,
                    }
                }

            }
            fs.writeFile(`data/x-${metadata.title}.json`, JSON.stringify(js), "utf8", x => {
                console.log(x)
            })
        })
    fs.writeFile(`src/data/all-teams.json`, JSON.stringify(allTeams), "utf8", x => {})

}
buildData().then(console.log).catch(console.error)



/*
node src/service/initialize-data.js
*/