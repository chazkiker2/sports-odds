
import React from "react";
import {
    Table,
    TableHeader,
    TableCell,
    TableRow,
    TableBody,
    Card,
    CardHeader,
    CardBody,
    Heading,
    ResponsiveContext,
    Grid,
} from "grommet";
import teamData from "../data/all-teams.json"
import {
    useParams
  } from "react-router-dom";


export function MatchupComparison() {
    let {homeTeamName, awayTeamName} = useParams();
    console.log(homeTeamName, awayTeamName)

    const size = React.useContext(ResponsiveContext);
    console.log(homeTeamName)
    console.log(awayTeamName)
    homeTeamName ??= "Texas A&M-CC";
    awayTeamName ??= "Southeast Missouri State";
    const awayTeam = teamData[awayTeamName]
    const homeTeam = teamData[homeTeamName];
    return <Grid columns="large" gap="large" pad={{ bottom: "large" }}>
      <Card>
            <CardHeader>
            <Heading level={2}>
                    <strong>Offensive Stats (Per Game)</strong>
                    </Heading>
                </CardHeader>
            <CardBody>
                <Table border={true}>
                <TableHeader>
                    <TableRow>
                    <TableCell scope="col" border={"all"}></TableCell>
                        <TableCell scope="col" border={"all"}>
                            {homeTeamName}
                        </TableCell>
                        <TableCell scope="col" border={"all"}>
                            Rank
                        </TableCell>
                        <TableCell scope="col" border={"all"}>
                            {awayTeamName}
                        </TableCell>
                        <TableCell scope="col" border={"all"}>
                            Rank
                        </TableCell>
                    </TableRow>

                </TableHeader>
                <TableBody>

                    <TableRow>
                        <TableCell scope="row" border={"all"}>
                        <strong>Points</strong>
                        </TableCell>
                        <TableCell scope="row" border={"all"}>{homeTeam.off.pointsPerGame}</TableCell>
                        <TableCell scope="row" border={"all"}>{homeTeam.off.rank.pointsPerGame}</TableCell>
                        <TableCell scope="row" border={"all"}>{awayTeam.off.pointsPerGame}</TableCell>
                        <TableCell scope="row" border={"all"}>{awayTeam.off.rank.pointsPerGame}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell scope="row" border={"all"}>
                            <strong>Field Goal %</strong>
                        </TableCell>
                        <TableCell scope="row" border={"all"}>{homeTeam.off.fieldGoalsPercentage}</TableCell>
                        <TableCell scope="row" border={"all"}>{homeTeam.off.rank.fieldGoalsPercentage}</TableCell>
                        <TableCell scope="row" border={"all"}>{awayTeam.off.fieldGoalsPercentage}</TableCell>
                        <TableCell scope="row" border={"all"}>{awayTeam.off.rank.fieldGoalsPercentage}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell scope="row" border={"all"}>
                            <strong>Three Point %</strong>
                        </TableCell>
                        <TableCell scope="row" border={"all"}>{homeTeam.off.threePointsPercentage}</TableCell>
                        <TableCell scope="row" border={"all"}>{homeTeam.off.rank.threePointsPercentage}</TableCell>
                        <TableCell scope="row" border={"all"}>{awayTeam.off.threePointsPercentage}</TableCell>
                        <TableCell scope="row" border={"all"}>{awayTeam.off.rank.threePointsPercentage}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell scope="row" border={"all"}>
                            <strong>Free Throw %</strong>
                        </TableCell>
                        <TableCell scope="row" border={"all"}>{homeTeam.off.freeThrowsPercentage}</TableCell>
                        <TableCell scope="row" border={"all"}>{homeTeam.off.rank.freeThrowsPercentage}</TableCell>
                        <TableCell scope="row" border={"all"}>{awayTeam.off.freeThrowsPercentage}</TableCell>
                        <TableCell scope="row" border={"all"}>{awayTeam.off.rank.freeThrowsPercentage}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell scope="row" border={"all"}>
                            <strong>Rebounds</strong>
                        </TableCell>
                        <TableCell scope="row" border={"all"}>{homeTeam.off.reboundsPerGame}</TableCell>
                        <TableCell scope="row" border={"all"}>{homeTeam.off.rank.reboundsPerGame}</TableCell>
                        <TableCell scope="row" border={"all"}>{awayTeam.off.reboundsPerGame}</TableCell>
                        <TableCell scope="row" border={"all"}>{awayTeam.off.rank.reboundsPerGame}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell scope="row" border={"all"}>
                            <strong>Turnovers</strong>
                        </TableCell>
                        <TableCell scope="row" border={"all"}>{homeTeam.off.turnoversPerGame}</TableCell>
                        <TableCell scope="row" border={"all"}>{homeTeam.off.rank.turnoversPerGame}</TableCell>
                        <TableCell scope="row" border={"all"}>{awayTeam.off.turnoversPerGame}</TableCell>
                        <TableCell scope="row" border={"all"}>{awayTeam.off.rank.turnoversPerGame}</TableCell>
                    </TableRow>

                </TableBody>
                </Table>
            </CardBody>
            <CardHeader pad={size == "small" || size == "xsmall"|| size == "xxsmall" ? {top: "large"} : null} margin={{top: "large"}}>
            <Heading level={2} pad={size == "small" || size == "xsmall"|| size == "xxsmall" ? {top: "large"} : null}>
                    <strong>Defensive Stats (Per Game)</strong>
                </Heading>
            </CardHeader>
            <CardBody pad="none">
                <Table border={true}>
                    <TableHeader>
                        <TableRow>
                            <TableCell scope="col" border={"all"}></TableCell>
                            <TableCell scope="col" border={"all"}>
                                {homeTeamName}
                            </TableCell>
                            <TableCell scope="col" border={"all"}>
                                Rank
                            </TableCell>
                            <TableCell scope="col" border={"all"}>
                                {awayTeamName}
                            </TableCell>
                            <TableCell scope="col" border={"all"}>
                                Rank
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        <TableRow>
                                <TableCell scope="row" border={"all"}>
                                    <strong>Points Allowed</strong>
                                </TableCell>
                                <TableCell scope="row" border={"all"}>{homeTeam.def.pointsPerGame}</TableCell>
                                <TableCell scope="row" border={"all"}>{homeTeam.def.rank.pointsPerGame}</TableCell>
                                <TableCell scope="row" border={"all"}>{awayTeam.def.pointsPerGame}</TableCell>
                                <TableCell scope="row" border={"all"}>{awayTeam.def.rank.pointsPerGame}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell scope="row" border={"all"}>
                                <strong>Field Goal %</strong>
                            </TableCell>
                            <TableCell scope="row" border={"all"}>{homeTeam.def.fieldGoalsPercentage}</TableCell>
                            <TableCell scope="row" border={"all"}>{homeTeam.def.rank.fieldGoalsPercentage}</TableCell>
                            <TableCell scope="row" border={"all"}>{awayTeam.def.fieldGoalsPercentage}</TableCell>
                            <TableCell scope="row" border={"all"}>{awayTeam.def.rank.fieldGoalsPercentage}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell scope="row" border={"all"}>
                                <strong>3 Point %</strong>
                            </TableCell>
                            <TableCell scope="row" border={"all"}>{homeTeam.def.threePointsPercentage}</TableCell>
                            <TableCell scope="row" border={"all"}>{homeTeam.def.rank.threePointsPercentage}</TableCell>
                            <TableCell scope="row" border={"all"}>{awayTeam.def.threePointsPercentage}</TableCell>
                            <TableCell scope="row" border={"all"}>{awayTeam.def.rank.threePointsPercentage}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell scope="row" border={"all"}>
                                <strong>Fouls</strong>
                            </TableCell>
                            <TableCell scope="row" border={"all"}>{homeTeam.def.personalFoulsPerGame}</TableCell>
                            <TableCell scope="row" border={"all"}>{homeTeam.def.rank.personalFoulsPerGame}</TableCell>
                            <TableCell scope="row" border={"all"}>{awayTeam.def.personalFoulsPerGame}</TableCell>
                            <TableCell scope="row" border={"all"}>{awayTeam.def.rank.personalFoulsPerGame}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell scope="row" border={"all"}>
                                <strong>Rebounds</strong>
                            </TableCell>
                            <TableCell scope="row" border={"all"}>{homeTeam.def.reboundsPerGame}</TableCell>
                            <TableCell scope="row" border={"all"}>{homeTeam.def.rank.reboundsPerGame}</TableCell>
                            <TableCell scope="row" border={"all"}>{awayTeam.def.reboundsPerGame}</TableCell>
                            <TableCell scope="row" border={"all"}>{awayTeam.def.rank.reboundsPerGame}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell scope="row" border={"all"}>
                                <strong>Turnovers</strong>
                            </TableCell>
                            <TableCell scope="row" border={"all"}>{homeTeam.def.turnoversPerGame}</TableCell>
                            <TableCell scope="row" border={"all"}>{homeTeam.def.rank.turnoversPerGame}</TableCell>
                            <TableCell scope="row" border={"all"}>{awayTeam.def.turnoversPerGame}</TableCell>
                            <TableCell scope="row" border={"all"}>{awayTeam.def.rank.turnoversPerGame}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
       </CardBody>


       <CardHeader>
            <Heading level={2}>
                <strong>Against the Spread</strong>
                </Heading>
       </CardHeader>
       <CardBody pad="none">
       <Table border={true}>
            <TableHeader>
                <TableRow>
                <TableCell scope="col" border={"all"}></TableCell>
                    <TableCell scope="col" border={"all"}>
                        {homeTeamName}
                    </TableCell>
                    <TableCell scope="col" border={"all"}>
                        Rank
                    </TableCell>
                    <TableCell scope="col" border={"all"}>
                        {awayTeamName}
                    </TableCell>
                    <TableCell scope="col" border={"all"}>
                        Rank
                    </TableCell>
                </TableRow>

            </TableHeader>
            <TableBody>

                <TableRow>
                    <TableCell scope="row" border={"all"}>
                        <strong>Record ATS</strong>
                    </TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam["trends-all-games"]["ATS Record"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam.def["#"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam["trends-all-games"]["ATS Record"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam.def["#"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell scope="row" border={"all"}>
                        <strong>Favorite ATS</strong>
                    </TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam["trends-as-fav"]["ATS Record"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam.def["#"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam["trends-as-fav"]["ATS Record"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam.def["#"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell scope="row" border={"all"}>
                        <strong>Home Fav ATS</strong>
                    </TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam["trends-as-home-fav"]["ATS Record"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam.def["#"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam["trends-as-home-fav"]["ATS Record"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam.def["#"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell scope="row" border={"all"}>
                        <strong>Away Fav ATS</strong>
                    </TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam["trends-as-away-fav"]["ATS Record"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam.def["#"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam["trends-as-away-fav"]["ATS Record"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam.def["#"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell scope="row" border={"all"}>
                        <strong>Home Underdog ATS</strong>
                    </TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam["trends-as-home-underdog"]?.["ATS Record"] ?? "N/A"}</TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam.def["#"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam["trends-as-home-underdog"]?.["ATS Record"] ?? "N/A"}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam.def["#"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell scope="row" border={"all"}>
                        <strong>Away Underdog ATS</strong>
                    </TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam["trends-as-away-underdog"]?.["ATS Record"] ?? "N/A"}</TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam.def["#"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam["trends-as-away-underdog"]?.["ATS Record"] ?? "N/A"}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam.def["#"]}</TableCell>
                </TableRow>

            </TableBody>
            </Table>
       </CardBody>
       <CardHeader pad={size == "small" || size == "xsmall"|| size == "xxsmall" ? {top: "xlarge"} : null} margin={{top: "xlarge"}}>
            <Heading level={2} pad={size == "small" || size == "xsmall"|| size == "xxsmall" ? {top: "xlarge"} : null}>
         <strong>SOS / Last 10 / vs Top 25</strong>
         </Heading>
       </CardHeader>
       <CardBody pad="none">
       <Table border={true}>
            <TableHeader>
                <TableRow>
                <TableCell scope="col" border={"all"}></TableCell>
                    <TableCell scope="col" border={"all"}>
                        {homeTeamName}
                    </TableCell>
                    <TableCell scope="col" border={"all"}>
                        Rank
                    </TableCell>
                    <TableCell scope="col" border={"all"}>
                        {awayTeamName}
                    </TableCell>
                    <TableCell scope="col" border={"all"}>
                        Rank
                    </TableCell>
                </TableRow>

            </TableHeader>
            <TableBody>
            <TableRow>
                    <TableCell scope="row" border={"all"}>
                        <strong>SOS Rating</strong>
                    </TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam["rank-schedule-strength"]?.["Rating"] ?? "N/A"}</TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam.def["#"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam["rank-schedule-strength"]?.["Rating"] ?? "N/A"}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam.def["#"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell scope="row" border={"all"}>
                        <strong>VS Top 25</strong>
                    </TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam["trends-against-ranked-opp"]?.["Win-Loss Record"] ?? "N/A"}</TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam.def["#"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam["trends-against-ranked-opp"]?.["Win-Loss Record"] ?? "N/A"}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam.def["#"]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell scope="row" border={"all"}>
                        <strong>Last 10 Games</strong>
                    </TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam["rank-last-10-games"]?.["Rating"] ?? "N/A"}</TableCell>
                    <TableCell scope="row" border={"all"}>{homeTeam.def["#"]}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam["rank-last-10-games"]?.["Rating"] ?? "N/A"}</TableCell>
                    <TableCell scope="row" border={"all"}>{awayTeam.def["#"]}</TableCell>
                </TableRow>
            </TableBody>
            </Table>
       </CardBody>
     </Card>
  </Grid>
}
