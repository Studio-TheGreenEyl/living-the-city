
window.onload = function() {
	console.log(screen.height);
	console.log(screen.width);
    /*
    if (webapis.productinfo.isUdPanelSupported()){
    	  console.log("4K UHD is supported");
    	} else {
    	  console.log("4K UHD is not supported");
    	}
    	*/
	var intFrameHeight = window.innerHeight; // or

	var intFrameHeight2 = self.innerHeight;
	// will return the height of the frame viewport within the frameset

	var intFramesetHeight = parent.innerHeight;
	// will return the height of the viewport of the closest frameset

	var intOuterFramesetHeight = top.innerHeight;
	// will return the height of the viewport of the outermost frameset

	console.log(intFrameHeight);
	console.log(intFrameHeight2);
	console.log(intFramesetHeight);
	console.log(intOuterFramesetHeight);
}