import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Game, Home, CreateRoom, Lobby, Rooms, Login } from "./views";
import { ConnectionStore, EventsStore } from "@store";
import "./App.scss";
import { useSound } from "@assets";

function App() {
	return (
		<BrowserRouter>
			<EventsStore>
				<ConnectionStore>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
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
