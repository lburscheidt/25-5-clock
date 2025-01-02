export default function Arrows({ functionUp, functionDown, time }) {
	return (
		<div className="arrows">
			<button type="button" onClick={functionUp}>
				<i className="fa-solid fa-arrow-up" />
			</button>
			<h3>{time}</h3>
			<button type="button" onClick={functionDown}>
				<i className="fa-solid fa-arrow-down" />
			</button>
		</div>
	);
}
