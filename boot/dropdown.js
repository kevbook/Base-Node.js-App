/**
 * Birthday Dropdown values
 **/

exports.birthdayValues = function() {
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'], 
   		days = [01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31], 
			years =[],
			today = new Date(),
			startDate = Number(today.getFullYear() - 21);

	for(var i=0; i < 50 ; i++) {
		years[i] = startDate;
		startDate --;
	}
	return { months: months, days: days, years: years };
};


/**
 * Height Dropdown values
 **/

exports.heightValues = function() {
	return { feet: [4,5,6,7], inches: [1,2,3,4,5,6,7,8,9,10,11] };
};