import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    ResponsiveContext,
    Paragraph,
} from "grommet";


export const MatchupCard = ({ odds }) => {
    const size = React.useContext(ResponsiveContext);

    const { home_team, away_team, bookmakers } = odds;

    const firstBook = bookmakers[0];
    const firstMarket = firstBook.markets[0];

    return (

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
       <CardFooter pad="medium" background="background-contrast">
         Footer
       </CardFooter>
     </Card>
    )
}
export const CardTemplate = ({ title }) => {
    const size = React.useContext(ResponsiveContext);

   return (
     <Card>
       <CardHeader pad="medium">
         <Heading level={2} margin="none">
           {title}
         </Heading>
       </CardHeader>
       <CardBody pad="medium">
       <Paragraph maxLines={size === "small" ? 3 : undefined}>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
           porttitor non nulla ac vehicula. Aliquam erat volutpat. Mauris auctor
           faucibus est at mattis. Aliquam a enim ac nisi aliquam consectetur et
           ac velit. Mauris ut imperdiet libero.
         </Paragraph>
       </CardBody>
       <CardFooter pad="medium" background="background-contrast">
         Footer
       </CardFooter>
     </Card>
   );
 };
