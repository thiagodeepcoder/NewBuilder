// GetClyphXID retrieves the index of the ClyphX Control Surface within the list of control_surfaces.

// v1.0.0, Copyright Sam "Stray" Hurley 2013

autowatch = 1;
setinletassist(0, "bang gets index and sends to oulet");
setoutletassist(0, "ClyphX's index or -1 if not found");


function bang() {
// Attempts to get ClyphX's index and sends to outlet.
// Will post error and send -1 to outlet if ClyphX not found.
	var api = new LiveAPI();
	var cx_id = -1;
	for(i=0; i<6; i++) {
		api.goto("control_surfaces " + i);
		if(api.type == "ClyphX") {
			cx_id = i;
			break;
		}
	}
	if(cx_id == -1) {
		error("ClyphX not found!");
	}
	outlet(0, cx_id);
}

