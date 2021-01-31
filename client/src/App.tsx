import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Game, Home } from "./views";

import { ConnectionStore, EventsStore } from "@store";
import { Rooms } from "@components/Rooms";
import { CreateRoom } from "@components/CreateRoom";
import { Lobby } from "@components/Lobby";
import "./App.scss";

function App() {
	return (
		<BrowserRouter>
			<EventsStore>
				<ConnectionStore>
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/rooms" component={Rooms} />
								<Route exact path="/create-room" component={CreateRoom} />
								<Route exact path="/lobby" component={Lobby} />
								<Route exact path="/play" component={Game} />
								<Redirect to={"/play"} />
							</Switch>
				</ConnectionStore>
			</EventsStore>
		</BrowserRouter>
	);
}

export default App;
