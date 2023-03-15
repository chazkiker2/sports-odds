const normalizeNameMap = {
    "AR Lit Rock": "Little Rock",
    "Abl Christian": "Abilene Christian",
    "Alab A&M": "Alabama A&M",
    "American": "American University",
    "Alabama St": "Alabama State",
    "Arizona St": "Arizona State",
    "Arkansas St": "Arkansas State",
    "App State": "Appalachian State",
    "Ark Pine Bl": "Arkansas-Pine Bluff",
    "Army": "Army West Point",
    "Boston U": "Boston University",
    "Boston Col": "Boston College",
    "Bowling Grn": "Bowling Green",
    "CS Bakersfld": "Cal State Bakersfield",
    "Cal Baptist": "California Baptist",
    "Cal St Nrdge": "Cal State Northridge",
    "Central Ark" : "Central Arkansas",
    "Central Conn": "Central Connecticut State",
    "Central Mich": "Central Michigan",
    "Charl South": "Charleston Southern",
    "Cleveland St" : "Cleveland State",
    "Coastal Car" : "Coastal Carolina",
    "Colorado St": "Colorado State",
    "Detroit": "Detroit Mercy",
    "E Illinois": "Eastern Illinois",
    "E Michigan": "Eastern Illinois",
    "E Tenn St": "East Tennessee State",
    "F Dickinson": "Fairleigh Dickinson",
    "Fla Gulf Cst": "Florida Gulf Coast",
    "Florida Intl": "Florida International",
    "Florida St": "Florida State",
    "Fresno St": "Fresno State",
    "Wm & Mary": "William & Mary",
    "Wash State":"Washington State",
    "WI-Grn Bay":"Green Bay",
    "W Virginia": "West Virginia",
    "W Michigan": "Western Michigan",
    "W Kentucky": "Western Kentucky",
    "VA Tech":"Virginia Tech",
    "VA Military": "Virginia Military",
    "U Mass":"UMass Lowell",
    "TX-San Ant": "Texas-San Antonio",
    "TX-Arlington":"Texas-Arlington",
    "TX Southern": "Texas Southern",
    "TX Christian": "Texas Christian",
    "TX A&M-Com":"Texas A&M Commerce",
    "TN State":"Tennessee State",
    "TN Martin":"Tennessee-Martin",
    "St Peters":"Saint Peter's",
    "St Johns":"St. John's",
    "St Fran (PA)":"St. Francis (PA)",
    "San Diego St":"San Diego State",
    "Sacred Hrt":"Sacred Heart",
    "Florida St":"Florida State",
    "Gard-Webb":"Gardner-Webb",
    "Geo Wshgtn":"George Washington",
    "Georgia St":"Georgia State",
    "Grd Canyon":"Grand Canyon",
    "Hsn Christian":"Houston Christian",
    "IPFW":"Fort Wayne", // unsure
    "Illinois St":"Illinois State",
    "LA Monroe":"Louisiana-Monroe",
    "LA Tech":"Louisiana Tech",
    "LIU":"Long Island",
    "Lg Beach St":"Long Beach State",
    "Loyola-Chi":"Loyola (IL)",
    "Loyola-MD":"Loyola (MD)",
    "Maryland BC":"Maryland", // unsure
    "McNeese St":"McNeese State",
    "Merrimack":"Merrimack College",
    "Michigan St":"Michigan State",
    "Miss State":"Mississippi State",
    "Mississippi":"Southern Mississippi", // unsure
    "Missouri St":"Missouri State",
    "Morgan St":"Morgan State",
    "Mt St Marys":"Mount St. Mary's",
    "Murray St":"Murray State",
    "N Carolina":"North Carolina",
    "N Colorado":"Northern Colorado",
    "N Dakota St":"North Dakota State",
    "N Hampshire":"New Hampshire",
    "N Iowa":"Northern Iowa",
    "N Kentucky":"Northern Kentucky",
    "N Mex State":"New Mexico State",
    "NC A&T":"North Carolina A&T",
    "NC-Grnsboro":"UNC Greensboro",
    "Nicholls St":"Nicholls State",
    "Northeastrn":"Northeastern",
    "Oklahoma St":"Oklahoma State",
    "Oregon St":"Oregon State",
    "Portland St":"Portland State",
    "Prairie View":"Prairie View A&M",
    "S Car State":"South Carolina State",
    "S Dakota St":    "South Dakota State",
    "S Illinois":"Southern Illinois",
    "S Indiana":    "Southern Indiana",
    "S Methodist":"Southern Methodist",
    "SIU Edward":"SIU-Edwardsville",
    "Sac State":"Sacramento State",
    "Loyola Mymt": "Loyola Marymount",
    "SE Missouri": "Southeast Missouri State",
    "TX A&M-CC": "Texas A&M-CC",
}


exports.normalizeTeamName = function (teamName) {
    const startingParen = teamName.indexOf("(");
    if (startingParen !== -1 && startingParen > 0 && teamName[startingParen-1] !== " ") {
        teamName = teamName.slice(0, startingParen);
    }
    if (teamName in normalizeNameMap) {
        return normalizeNameMap[teamName];
    }
    return teamName;
}