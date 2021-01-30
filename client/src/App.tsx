import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Game, Home } from "./views";

import { ConnectionStore, EventsStore } from "@store";
import { Rooms } from "@components/Rooms";

function App() {
	return (
		<EventsStore>
			<ConnectionStore>
					<BrowserRouter>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/rooms" component={Rooms} />
							<Route exact path="/play" component={Game} />
							<Redirect to={"/play"} />
						</Switch>
					</BrowserRouter>
			</ConnectionStore>
		</EventsStore>
	);
}

export default App;
