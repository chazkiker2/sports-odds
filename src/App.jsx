import React from "react";
import {
    Button,
   Grid,
    Grommet,
    grommet,
    Page,
    PageContent,
    Text,
  } from "grommet";
import { Moon, Sun } from "grommet-icons";
import { deepMerge } from "grommet/utils";
import { AppBar, CardTemplate, MatchupCard, MatchupStats } from "./components";
import odds from "./data/odds.json"

 const theme = deepMerge(grommet, {
    global: {
      colors: {
        brand: "#228BE6",
      },
      font: {
        family: "Roboto",
        size: "14px",
        height: "20px",
      },
    },
   });







function App() {
    const [dark, setDark] = React.useState(true);



  return (

    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
<Page>
    <AppBar>
      <Text size="large">My App</Text>
               <Button
           a11yTitle={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
           icon={dark ? <Moon /> : <Sun />}
           onClick={() => setDark(!dark)}
         />
    </AppBar>
  <PageContent>
    <Grid columns="large" gap="large" pad={{ bottom: "large" }}>
        <MatchupStats/>
    </Grid>
    <Grid columns="medium" gap="large" pad={{ bottom: "large" }}>

        {odds.map(matchup =><MatchupCard odds={matchup} />)}

    <CardTemplate title={"Card 1"} />
    <CardTemplate title={"Card 2"} />
    <CardTemplate title={"Card 3"} />
    </Grid>

  </PageContent>
</Page>
    </Grommet>
  );
}

export default App;
