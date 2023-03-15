import React from "react"
import { Button, Grommet, grommet, Page, PageContent, Text } from "grommet"
import { Moon, Sun } from "grommet-icons"
import { deepMerge } from "grommet/utils"
import { AppBar } from "./components"
import { UpcomingGames, MatchupComparison } from "./pages"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/",
        element: <UpcomingGames />,
    },
    {
        path: "/matchup",
        element: <MatchupComparison />,
    },
    {
        path: "/matchup/:homeTeamGuid/:awayTeamGuid",
        element: <MatchupComparison />,
    },
])

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
})

function App() {
    const [dark, setDark] = React.useState(true)

    return (
        <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
            <Page>
                <AppBar>
                    <Text size="large">My App</Text>
                    <Button
                        a11yTitle={
                            dark
                                ? "Switch to Light Mode"
                                : "Switch to Dark Mode"
                        }
                        icon={dark ? <Moon /> : <Sun />}
                        onClick={() => setDark(!dark)}
                    />
                </AppBar>
                <PageContent>
                    <RouterProvider router={router} />
                </PageContent>
            </Page>
        </Grommet>
    )
}

export default App
