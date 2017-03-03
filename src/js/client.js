import React from "react";
import style from "../css/style.less";

import ReactDom from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./pages/Layout.jsx"
import Index from "./pages/Index.jsx"
import Game from "./pages/Game.jsx"
import Ending from "./pages/Ending.jsx"

const app = document.getElementById('app');

ReactDom.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Index}></IndexRoute>
			<Route path="game" name="game" component={Game}></Route>
			<Route path="ending" name="ending" component={Ending}></Route>
		</Route>
	</Router>,
	app);