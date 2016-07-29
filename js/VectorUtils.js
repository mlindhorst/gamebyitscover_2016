
function getAngleInRadians(x, y, x1, y1) {
	return angleRadians = Math.atan2(y1 - y, x1 - x);
}

function getXFromAngle(theta) {
	return Math.cos(theta);
}

function getYFromAngle(theta) {
	return Math.sin(theta);
}