import React from "react"
import { Grid, Heading } from "grommet"
import odds from "../data/odds.json"
import { UpcomingGameCard } from "../components"

export function UpcomingGames() {
    return (
        <>
            <Heading Level={3}>Live/Upcoming Games</Heading>
            <Grid columns="medium" gap="large" pad={{ bottom: "large" }}>
                {odds.map((matchup) => (
                    <UpcomingGameCard odds={matchup} />
                ))}
            </Grid>
        </>
    )
}
