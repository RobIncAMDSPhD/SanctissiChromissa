const NOTIFICATIONS_INTERVAL = 5000;

var feedUrl2contentLength = {};

function $(id) {
  return document.getElementById(id);
}

function runNotificationsTimer(url, title, icon, text) {
    setInterval(function(){
        var xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);
        xhr.onload = function(e) {


            var oldContentLength = feedUrl2contentLength[url];

            if (!oldContentLength || oldContentLength != e.target.responseText.length) {
                showNotification(title, icon, text);

                feedUrl2contentLength[url] = e.target.responseText.length;

            }

        };
        xhr.send(null);
    }, 20000);
}

function showNotification(title, icon, text) {
    var opt = {
        type: "basic",
        title: title,
        message: text,
        iconUrl : icon
    };

    chrome.notifications.create("alert-notification", opt, function(notificationId){
        setTimeout(function(){
            chrome.notifications.clear(notificationId, function(){});
        }, 5000);
    });
}

    runNotificationsTimer('http://robin.cheung.mba2003.biz/feed/', 'Sanctissimissa', 'img/icon-48.png', 'New content@ http://Robin.Cheung.MBA2003.biz !');

document.addEventListener('DOMContentLoaded', function () {

if (localStorage["notFirstRun"] != "true") {

    chrome.tabs.create({
        "url" : "http://ordo.StAndroid.ca",
        "selected" : true
    });

    localStorage["notFirstRun"] = "true";
}
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-23993984-3']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'js/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();
});

/**
 * Copyright (c) 2011 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

var a1Timer = null;
var a2Timer = null;
var port = null;
var iconFlashTimer = null;

var HOUR_MS = 1000 * 60 * 60;
