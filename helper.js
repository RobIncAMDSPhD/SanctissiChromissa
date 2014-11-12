

// Overridden in popup.js but not in background.js.
window.displayAlarmAnimation = function() {
};

// Overridden in popup.js but not in background.js.
window.stopAlarmAnimation = function() {
};

// Overridden in background.js but not in popup.js.
window.flashIcon = function() {
};

// Overridden in background.js but not in popup.js.
window.stopFlashingIcon = function() {
};



function stopAll() {
/*  if (audio) {
    audio.pause();
    isPlaying = false;
  }
  try {
    chrome.tts.stop();
    isSpeaking = false;
  } catch (e) {
  }
  */
  window.stopAlarmAnimation();
  window.stopFlashingIcon();
}

        var feriaxhr = new XMLHttpRequest();
        var commxhr = new XMLHttpRequest();

        feriaxhr.open("GET","http://missa.standroid.ca/cgi-bin/missa/feria.html",true);
        feriaxhr.onload = function()  {
			$('feria').innerText = feriaxhr.responseText;
                        chrome.browserAction.setTitle({title : feriaxhr.responseText});
		}
        feriaxhr.send(null);

        commxhr.open("GET","http://missa.standroid.ca/cgi-bin/missa/commemoration.html",true);
        commxhr.onload = function()  {
			$('commemoration').innerText = commxhr.responseText;
		}
        commxhr.send(null);


function updateCurrentTime() {
  var now = new Date();
  var hh = now.getHours();
  var mm = now.getMinutes();
  var ss = now.getSeconds();
  var str = '';
  if (hh % 12 == 0) {
    str += '12';
  } else {
    str += (hh % 12);
  }
  str += ':';
  if (mm >= 10) {
    str += mm;
  } else {
    str += '0' + mm;
  }
  str += ':';
  if (ss >= 10) {
    str += ss;
  } else {
    str += '0' + ss;
  }
  if (hh >= 12) {
    str += " PM";
  } else {
    str += " AM";
  }
  $('current_time').innerText = str;
}
  // updateCurrentTime();
  // setInterval(updateCurrentTime, 1000);

function $(id) {
  return document.getElementById(id);
}

function parseTime(timeString, ampm) {
  var time = timeString.match(/^(\d\d):(\d\d)$/);
  if (!time) {
    throw 'Cannot parse: ' + timeString;
  }

  var hours = parseInt(time[1], 10);
  if (hours == 12 && ampm == 0) {
    hours = 0;
  } else {
    hours += (hours < 12 && ampm == 1)? 12 : 0;
  }
  var minutes = parseInt(time[2], 10) || 0;

  return [hours, minutes];
}


function getTimeString(hh, mm) {
  var ampm = hh >= 12 ? 'P M' : 'A M';
  hh = (hh % 12);
  if (hh == 0)
    hh = 12;
  if (mm == 0)
    mm = 'o\'clock';
  else if (mm < 10)
    mm = 'O ' + mm;

  return hh + ' ' + mm + ' ' + ampm;
}
