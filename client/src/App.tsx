import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Game } from "./views";

import { ConnectionStore, EventsStore, GameStore } from "@store";

function App() {
	return (
		<EventsStore>
			<ConnectionStore>
				<GameStore>
					<BrowserRouter>
						<Switch>
							<Route exact path="/play" component={Game} />
							<Redirect to={"/play"} />
						</Switch>
					</BrowserRouter>
				</GameStore>
			</ConnectionStore>
		</EventsStore>
	);
}

export default App;
