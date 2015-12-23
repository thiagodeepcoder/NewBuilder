function setTemplate(s) {
	if (JSONLoaded) {
		setTemplatesJSON(s);
		setMeter();
		setTotalTime();
		setNumSlices();
		setSelectors();
	}
}
