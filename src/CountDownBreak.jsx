import React, { useState, useEffect } from "react";

export default function CountDownBreak({
	hours = 0,
	minutes = 0,
	seconds = 0,
}) {
	const [paused, setPaused] = useState(false);
	const [over, setOver] = useState(false);
	const [[h, m, s], setTime] = useState([hours, minutes, seconds]);


	const tick = () => {
		if (paused || over) return;
		if (h === 0 && m === 0 && s === 0) setOver(true);
		else if (m === 0 && s === 0) {
			setTime([h - 1, 59, 59]);
		} else if (s === 0) {
			setTime([h, m - 1, 59]);
		} else {
			setTime([h, m, s - 1]);
		}
	};

	const reset = () => {
		setTime([
			Number.parseInt(hours),
			Number.parseInt(minutes),
			Number.parseInt(seconds),
		]);
		setPaused(false);
		setOver(false);
	};

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});

	return (
		<div id="countdown-timer">
			<p>{`${h.toString().padStart(2, "0")}:${m
				.toString()
				.padStart(2, "0")}:${s.toString().padStart(2, "0")}`}</p>
			<div>{over ? "Time's up!" : ""}</div>
			<div>
				<button type="button" onClick={() => setPaused(!paused)}>
					{paused ? "Resume" : "Pause"}
				</button>
				<button type="button" onClick={() => reset()}>
					Restart
				</button>
			</div>
		</div>
	);
}
