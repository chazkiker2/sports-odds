var fs = require("fs")
var teams = require("../../data/all-teams.json")
var teamNames1 = require("../../data/team-name-1")
var teamNames2 = require("../../data/team-name-2")


const teamNames = Object.keys(teams).sort()

fs.writeFile(`data/team-names-sorted.json`, JSON.stringify(teamNames), "utf8", x => {})

// const uniqueTo1 = teamNames1.filter(x => !teamNames2.includes(x)).sort()
// const uniqueTo2 = teamNames2.filter(x => !teamNames1.includes(x)).sort()

// fs.writeFile(`data/team-names-unique-1.json`, JSON.stringify(uniqueTo1), "utf8", x => {})
// fs.writeFile(`data/team-names-unique-2.json`, JSON.stringify(uniqueTo2), "utf8", x => {})

/*
node src/service/analyze-teams.js
*/
