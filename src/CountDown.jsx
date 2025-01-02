import React, { useState, useEffect } from "react";

export default function CountDown({ minutes, seconds }) {
	const [isPaused, setPaused] = useState(true);
	const [isOver, setIsOver] = useState(false);
	function tick(isPaused, isOver) {
		if (isPaused || isOver) return;
		if (minutes === 0 && seconds === 0) setIsOver(true);
		else if (seconds === 0) {
			setMins(minutes - 1);
			setSecs(59);
		} else {
			setMins(minutes);
			setSecs(seconds - 1);
		}
	}

	function reset() {
		setPaused(false);
		setIsOver(false);
	}

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});

	return (
		<div>
			<p>{`${minutes
				.toString()
				.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</p>
			<div>{isOver ? "Time's up!" : ""}</div>
			<button type="button" onClick={setPaused(!isPaused)}>
				{isPaused ? "Resume" : "Pause"}
			</button>
			<button type="button" onClick={reset}>
				Restart
			</button>
		</div>
	);
}
