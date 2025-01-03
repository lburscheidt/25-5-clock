import React, { useState, useEffect } from "react";
import CountDown from "./CountDown";
import CountDownBreak from "./CountDownBreak";
import Arrows from "./Arrows";
import "./App.css";

export default function App() {
	const [sessionLength, setSessionLength] = useState(25);
	const [breakLength, setBreakLength] = useState(5);
	const [isBreakInProgress, setBreakInProgress] = useState(false);
	const [paused, setPaused] = useState(true);
	const [over, setOver] = useState(false);
	const [[h, m, s], setTime] = useState([0, sessionLength, 0]);
	const [[hb, mb, sb], setBreakTime] = useState([0, breakLength, 0]);

	const tick = () => {
		if (paused) return;
		if (h === 0 && m === 0 && s === 0) {
			let over = true;
			setOver(over);
			const beep = document.getElementById("beep");
			beep.play();
		} else if (m === 0 && s === 0) {
			setTime([h - 1, 59, 59]);
		} else if (s === 0) {
			setTime([h, m - 1, 59]);
		} else {
			setTime([h, m, s - 1]);
		}
	};

	function reset() {
		setTime([0, sessionLength, 0]);
		setBreakTime([0, breakLength, 0]);
		setPaused(true);
		setOver(false);
	}

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});

	function increaseSession() {
		if (sessionLength < 60) {
			const newSessionLength = sessionLength + 1;
			setSessionLength(newSessionLength);
			const newTime = [h, newSessionLength, s];
			setTime(newTime);
		}
	}

	function decreaseSession() {
		if (sessionLength > 1) {
			const newSessionLength = sessionLength - 1;
			setSessionLength(newSessionLength);
			const newTime = [h, newSessionLength, s];
			setTime(newTime);
		}
	}

	function increaseBreak() {
		if (breakLength < 60) {
			const newBreakLength = breakLength + 1;
			setBreakLength(newBreakLength);
			const newBreakTime = [h, newBreakLength, s];
			setBreakTime(newBreakTime);
		}
	}

	function decreaseBreak() {
		if (breakLength > 1) {
			const newBreakLength = breakLength - 1;
			setBreakLength(newBreakLength);
			const newBreakTime = [h, newBreakLength, s];
			setBreakTime(newBreakTime);
		}
	}

	return (
		<>
			{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
			<audio
				src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
				id="beep"
			/>
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
			<div id="countdown-timer">
				<p>{`${m
					.toString()
					.padStart(2, "0")}:${s.toString().padStart(2, "0")}`}</p>
				<div>{over ? "Break time!" : ""}</div>
				<div>
					<button
						type="button"
						onClick={() => {
							const newPaused = !paused;
							setPaused(newPaused);
						}}
					>
						{paused ? "Start|Resume" : "Pause"}
					</button>
					<button type="button" onClick={() => reset()}>
						Restart
					</button>
				</div>
			</div>
		</>
	);
}
