import React, { useState, useEffect } from "react";

import "./App.css";

export default function App() {
	const [sessionLength, setSessionLength] = useState(25);
	const [breakLength, setBreakLength] = useState(5);
	const [paused, setPaused] = useState(true);
	const [[m, s], setTime] = useState([sessionLength, 0]);
	const [[mb, sb], setBreakTime] = useState([breakLength, 0]);
	const [isBreakInProgress, setIsBreakInProgress] = useState(false);

	function increaseSession() {
		if (sessionLength < 60) {
			const newSessionLength = sessionLength + 1;
			setSessionLength(newSessionLength);
			const newTime = [newSessionLength, s];
			setTime(newTime);
		}
	}

	function decreaseSession() {
		if (sessionLength > 1) {
			const newSessionLength = sessionLength - 1;
			setSessionLength(newSessionLength);
			const newTime = [newSessionLength, s];
			setTime(newTime);
		}
	}

	function increaseBreak() {
		if (breakLength < 60) {
			const newBreakLength = breakLength + 1;
			setBreakLength(newBreakLength);
			const newBreakTime = [newBreakLength, s];
			setBreakTime(newBreakTime);
		}
	}

	function decreaseBreak() {
		if (breakLength > 1) {
			const newBreakLength = breakLength - 1;
			setBreakLength(newBreakLength);
			const newBreakTime = [newBreakLength, s];
			setBreakTime(newBreakTime);
		}
	}

	function tick() {
		if (paused) return;
		if (m === 0 && s === 0) {
			setBreakTime([breakLength, 0]);
			const breakInProgress = true;
			setIsBreakInProgress(breakInProgress);

			return;
		}
		if (s === 0) {
			let mins = m - 1;
			let secs = 59;
			setTime([mins, secs]);
		} else {
			let mins = m;
			let secs = s - 1;
			setTime([mins, secs]);
		}
	}

	function tickBreak() {
		if (paused) return;
		if (mb === 0 && sb === 0) {
			setTime([sessionLength, 0]);
			const breakInProgress = false;
			setIsBreakInProgress(breakInProgress);

			return;
		}
		if (sb === 0) {
			let mins = mb - 1;
			let secs = 59;
			setBreakTime([mins, secs]);
		} else {
			let mins = mb;
			let secs = sb - 1;
			setBreakTime([mins, secs]);
		}
	}

	function reset() {
		const audio = document.getElementById("beep");
		audio.pause();
		audio.load();
		setSessionLength(25);
		setBreakLength(5);
		setTime([25, 0]);
		setBreakTime([5, 0]);
		setPaused(true);
		setIsBreakInProgress(false);
	}

	useEffect(() => {
		if (isBreakInProgress) {
			const timerID = setInterval(() => tickBreak(), 1000);
			return () => clearInterval(timerID);
		}
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});

	useEffect(() => {
		if ((mb === 0 && sb === 0) || (s === 0 && m === 0)) {
			document.getElementById("beep").play();
		}
	});

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
					<h3 className="sectionHeading" id="session-label">
						Session Length
					</h3>
					<div className="arrows">
						<button
							type="button"
							onClick={increaseSession}
							id="session-increment"
						>
							<i className="fa-solid fa-arrow-up" />
						</button>
						<h3 id="session-length">{sessionLength}</h3>
						<button
							type="button"
							onClick={decreaseSession}
							id="session-decrement"
						>
							<i className="fa-solid fa-arrow-down" />
						</button>
					</div>
				</div>
				<div className="timeControls">
					<h3 className="sectionHeading" id="break-label">
						Break Length
					</h3>
					<div className="arrows">
						<button type="button" onClick={increaseBreak} id="break-increment">
							<i className="fa-solid fa-arrow-up" />
						</button>
						<h3 id="break-length">{breakLength}</h3>
						<button type="button" onClick={decreaseBreak} id="break-decrement">
							<i className="fa-solid fa-arrow-down" />
						</button>
					</div>
				</div>
			</div>
			<div id="countdown-timer">
				<h3 id="timer-label">{isBreakInProgress ? "Break" : "Session"}</h3>
				<p id="time-left">
					{" "}
					{`${
						isBreakInProgress
							? mb.toString().padStart(2, "0")
							: m.toString().padStart(2, "0")
					}:${isBreakInProgress ? sb.toString().padStart(2, "0") : s.toString().padStart(2, "0")}`}
				</p>
				{
					// <div>{over ? "Break time!" : ""}</div>
				}
				<div>
					<button
						type="button"
						id="start_stop"
						onClick={() => {
							const newPaused = !paused;
							setPaused(newPaused);
						}}
					>
						{paused ? "Start|Resume" : "Pause"}
					</button>
					<button type="button" id="reset" onClick={() => reset()}>
						Reset
					</button>
				</div>
			</div>
		</>
	);
}
