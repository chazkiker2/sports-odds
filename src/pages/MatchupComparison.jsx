import React from "react"
import {
    Heading,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    TableBody,
    Card,
    CardHeader,
    CardBody,
    ResponsiveContext,
    Grid,
} from "grommet"
import teamData from "../data/all-teams.json"
import { useParams } from "react-router-dom"

function DataRow(props) {
    const { homeTeam, awayTeam, statKey, rankKey, rowTitle } = props

    return (
        <>
            <TableRow>
                <TableCell scope="row" border={"all"}>
                    <strong>{rowTitle}</strong>
                </TableCell>
                <TableCell scope="row" border={"all"}>
                    {statKey(homeTeam)}
                </TableCell>
                <TableCell scope="row" border={"all"}>
                    {rankKey(homeTeam)}
                </TableCell>
                <TableCell scope="row" border={"all"}>
                    {statKey(awayTeam)}
                </TableCell>
                <TableCell scope="row" border={"all"}>
                    {rankKey(awayTeam)}
                </TableCell>
            </TableRow>
        </>
    )
}

function TableSection(props) {
    const { homeTeam, awayTeam, sectionTitle, disableMarginTop } = props
    const size = React.useContext(ResponsiveContext)
    return (
        <>
            <CardHeader
                pad={
                    size == "small" || size == "xsmall" || size == "xxsmall"
                        ? { top: "medium" }
                        : null
                }
                margin={disableMarginTop ? null : { top: "large" }}
            >
                <Heading level={2}>
                    <strong>{sectionTitle}</strong>
                </Heading>
            </CardHeader>
            <CardBody>
                <Table border={true}>
                    <TableHeader>
                        <TableRow>
                            <TableCell scope="col" border={"all"}></TableCell>
                            <TableCell scope="col" border={"all"}>
                                {homeTeam.name}
                            </TableCell>
                            <TableCell scope="col" border={"all"}>
                                Rank
                            </TableCell>
                            <TableCell scope="col" border={"all"}>
                                {awayTeam.name}
                            </TableCell>
                            <TableCell scope="col" border={"all"}>
                                Rank
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>{props.children}</TableBody>
                </Table>
            </CardBody>
        </>
    )
}

export function MatchupComparison() {
    let { homeTeamGuid, awayTeamGuid } = useParams()
    const size = React.useContext(ResponsiveContext)
    const awayTeam = teamData[awayTeamGuid]
    const homeTeam = teamData[homeTeamGuid]
    return (
        <>
            <Heading Level={3}>Live/Upcoming Games</Heading>
            <Grid columns="large" gap="large" pad={{ bottom: "large" }}>
                <Card>
                    <TableSection
                        homeTeam={homeTeam}
                        awayTeam={awayTeam}
                        sectionTitle="Offensive Stats (Per Game)"
                        disableMarginTop
                    >
                        <DataRow
                            rowTitle="Points"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) => x.offensiveStats.pointsPerGame}
                            rankKey={(x) => x.rank.offense.pointsPerGame}
                        />
                        <DataRow
                            rowTitle="Field Goal %"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) =>
                                x.offensiveStats.fieldGoalsPercentage
                            }
                            rankKey={(x) => x.rank.offense.fieldGoalsPercentage}
                        />
                        <DataRow
                            rowTitle="Three Point %"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) =>
                                x.offensiveStats.threePointsPercentage
                            }
                            rankKey={(x) =>
                                x.rank.offense.threePointsPercentage
                            }
                        />
                        <DataRow
                            rowTitle="Free Throw %"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) =>
                                x.offensiveStats.freeThrowsPercentage
                            }
                            rankKey={(x) => x.rank.offense.freeThrowsPercentage}
                        />

                        <DataRow
                            rowTitle="Rebounds"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) => x.offensiveStats.reboundsPerGame}
                            rankKey={(x) => x.rank.offense.reboundsPerGame}
                        />

                        <DataRow
                            rowTitle="Turnovers"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) => x.offensiveStats.turnoversPerGame}
                            rankKey={(x) => x.rank.offense.turnoversPerGame}
                        />
                    </TableSection>
                    <TableSection
                        homeTeam={homeTeam}
                        awayTeam={awayTeam}
                        sectionTitle="Defensive Stats (Per Game)"
                    >
                        <DataRow
                            rowTitle="Points"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) => x.defensiveStats.pointsPerGame}
                            rankKey={(x) => x.rank.defense.pointsPerGame}
                        />
                        <DataRow
                            rowTitle="Field Goal %"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) =>
                                x.defensiveStats.fieldGoalsPercentage
                            }
                            rankKey={(x) => x.rank.defense.fieldGoalsPercentage}
                        />
                        <DataRow
                            rowTitle="Three Point %"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) =>
                                x.defensiveStats.threePointsPercentage
                            }
                            rankKey={(x) =>
                                x.rank.defense.threePointsPercentage
                            }
                        />
                        <DataRow
                            rowTitle="Free Throw %"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) =>
                                x.defensiveStats.freeThrowsPercentage
                            }
                            rankKey={(x) => x.rank.defense.freeThrowsPercentage}
                        />

                        <DataRow
                            rowTitle="Rebounds"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) => x.defensiveStats.reboundsPerGame}
                            rankKey={(x) => x.rank.defense.reboundsPerGame}
                        />

                        <DataRow
                            rowTitle="Turnovers"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) => x.defensiveStats.turnoversPerGame}
                            rankKey={(x) => x.rank.defense.turnoversPerGame}
                        />
                    </TableSection>
                    <TableSection
                        homeTeam={homeTeam}
                        awayTeam={awayTeam}
                        sectionTitle="Against the Spread"
                    >
                        <DataRow
                            rowTitle="Record ATS"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) => x.trendsAllGames.atsRecord}
                            rankKey={(x) => ""}
                        />
                        <DataRow
                            rowTitle="Favorite ATS"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) => x.trendsAsFav.atsRecord}
                            rankKey={(x) => ""}
                        />
                        <DataRow
                            rowTitle="Home Fav ATS"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) => x.trendsAsHomeFav.atsRecord}
                            rankKey={(x) => ""}
                        />
                        <DataRow
                            rowTitle="Away Fav ATS"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) => x.trendsAsAwayFav.atsRecord}
                            rankKey={(x) => ""}
                        />
                        <DataRow
                            rowTitle="Home Underdog ATS"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) =>
                                x.trendsAsHomeUnderdog?.atsRecord ?? "N/A"
                            }
                            rankKey={(x) => ""}
                        />

                        <DataRow
                            rowTitle="Away Underdog ATS"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) =>
                                x.trendsAsAwayUnderdog?.atsRecord ?? "N/A"
                            }
                            rankKey={(x) => ""}
                        />
                    </TableSection>
                    <TableSection
                        homeTeam={homeTeam}
                        awayTeam={awayTeam}
                        sectionTitle="SOS / Last 10 / vs Top 25"
                    >
                        <DataRow
                            rowTitle="SOS Rating"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) => x.rankScheduleStrength.rating}
                            rankKey={(x) => ""}
                        />
                        <DataRow
                            rowTitle="VS Top 24"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) =>
                                x.trendsAgainstRankedOpp?.winLossRecord ?? "N/A"
                            }
                            rankKey={(x) => ""}
                        />
                        <DataRow
                            rowTitle="Last 10 Rating"
                            awayTeam={awayTeam}
                            homeTeam={homeTeam}
                            statKey={(x) => x.rankLast10Games.rating}
                            rankKey={(x) => ""}
                        />
                    </TableSection>
                </Card>
            </Grid>
        </>
    )
}
