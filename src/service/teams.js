const { normalizeTeamName } = require("./util.js")
var nameToGuidMap = require("../data/name-to-guid-map.json")
var allTeams = require("../data/all-teams.json")

export function getTeam(guid) {
    return allTeams[guid]
}
export function getTeamByName(teamName) {
    return allTeams[getGuid(teamName)]
}

export function getGuid(teamName) {
    return nameToGuidMap[normalizeTeamName(teamName)]
}
