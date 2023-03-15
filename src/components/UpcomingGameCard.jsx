import React from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    ResponsiveContext,
    Paragraph,
} from "grommet";
import { normalizeTeamName } from "../service/util";

export const UpcomingGameCard = ({ odds }) => {
    const size = React.useContext(ResponsiveContext);

    const { home_team, away_team, bookmakers } = odds;

    const firstBook = bookmakers[0];
    const firstMarket = firstBook.markets[0];

    return (

        <Link to={`/matchup/${normalizeTeamName(home_team)}/${normalizeTeamName(away_team)}`}>
    <Card>
       <CardHeader pad="medium">
         <Heading level={2} margin="none">
           {home_team} VS {away_team}
         </Heading>
       </CardHeader>
       <CardBody pad="medium">
       <Paragraph maxLines={size === "small" ? 3 : undefined}>
       {firstMarket.outcomes.map(outcome=>
        <p>{outcome.name}, {outcome.price}</p>
        )
        }
         </Paragraph>
       </CardBody>
     </Card>
        </Link>
    )
}
