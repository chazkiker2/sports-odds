import React from "react"
import { Link } from "react-router-dom"
import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    ResponsiveContext,
    Paragraph,
    Text,
} from "grommet"
import { getTeamByName } from "../service/teams"

function LinkWrapper({ wrap, path, ...props }) {
    return wrap ? (
        <Link style={{ textDecoration: "none", color: "inherit" }} to={path}>
            {props.children}
        </Link>
    ) : (
        props.children
    )
}

export const UpcomingGameCard = ({ odds }) => {
    const size = React.useContext(ResponsiveContext)

    const { home_team, away_team, bookmakers } = odds
    const homeTeam = getTeamByName(home_team)
    const awayTeam = getTeamByName(away_team)

    const firstBook = bookmakers[0]
    const firstMarket = firstBook.markets[0]

    const sufficientDataForCompare =
        homeTeam !== undefined && awayTeam !== undefined

    return (
        <LinkWrapper
            wrap={sufficientDataForCompare}
            path={`/matchup/${homeTeam?.guid}/${awayTeam?.guid}`}
        >
            <Card>
                <CardHeader pad="small">
                    <Heading level={3} margin="none">
                        {homeTeam?.name ?? home_team} VS{" "}
                        {awayTeam?.name ?? away_team}
                    </Heading>
                </CardHeader>
                <CardBody pad="medium">
                    <Paragraph maxLines={size === "small" ? 3 : undefined}>
                        {firstMarket.outcomes.map((outcome) => (
                            <p>
                                {outcome.name}, {outcome.price}
                            </p>
                        ))}

                        {!sufficientDataForCompare && (
                            <Text color="status-critical">
                                Insufficient Data for Compare
                            </Text>
                        )}
                    </Paragraph>
                </CardBody>
            </Card>
        </LinkWrapper>
    )
}
