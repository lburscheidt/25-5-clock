import React, { useState, useEffect } from "react";
import CountDown from "./CountDown";

import "./App.css";

export default function App() {
	const [sessionLength, setSessionLength] = useState(25);
	const [breakLength, setBreakLength] = useState(5);
	const [isBreakInProgress, setBreakInProgress] = useState(false);
	const [mins, setMins] = useState(25);
	const [timerBreak, setTimerBreak] = useState(5);
	const [secs, setSecs] = useState(0);

	function increaseSession() {
		if (sessionLength < 60) {
			setSessionLength(sessionLength + 1);
			setMins(mins + 1);
		}
	}

	function decreaseSession() {
		if (sessionLength > 1) {
			setSessionLength(sessionLength - 1);
			setMins(mins - 1);
		}
	}

	function increaseBreak() {
		if (breakLength < 60) {
			setBreakLength(breakLength + 1);
			setTimerBreak(timerBreak + 1);
		}
	}

	function decreaseBreak() {
		if (breakLength > 1) {
			setBreakLength(breakLength - 1);
			setTimerBreak(timerBreak - 1);
			console.log(timerBreak);
		}
	}

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});

	return (
		<>
			<h1>25 + 5 Clock</h1>
			<div className="timers">
				<div className="timeControls">
					<h3 className="sectionHeading">Session Length</h3>
					<div className="arrows">
						<button type="button" onClick={increaseSession}>
							<i className="fa-solid fa-arrow-up" />
						</button>
						<h3>{sessionLength}</h3>
						<button type="button" onClick={decreaseSession}>
							<i className="fa-solid fa-arrow-down" />
						</button>
					</div>
				</div>
				<div className="timeControls">
					<h3 className="sectionHeading">Break Length</h3>
					<div className="arrows">
						<button type="button" onClick={increaseBreak}>
							<i className="fa-solid fa-arrow-up" />
						</button>
						<h3>{breakLength}</h3>
						<button type="button" onClick={decreaseBreak}>
							<i className="fa-solid fa-arrow-down" />
						</button>
					</div>
				</div>
			</div>
			<CountDown />
		</>
	);
}
