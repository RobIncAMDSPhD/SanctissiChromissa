function openSearchUrl(url, searchTerm, openInNewTab, sendPostRequest, postData) {

    var newUrl;
    if (sendPostRequest) {
        newUrl = "post.html?url=" + encodeURIComponent(url) + "&postData=" + encodeURIComponent(postData.replace('${searchTerm}', searchTerm));
    } else {
        newUrl = url + searchTerm;
    }

    openUrl(newUrl, openInNewTab);
}

function loadXMLDoc(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseXML);
        }
    };
    xhr.send(null);
}

function renderNewsFeed(feedId, feedUrl, callback) {
    var xslUrl = chrome.extension.getURL("/xsl/NewsFeedControl_" + feedId + ".xsl");
    loadXMLDoc(xslUrl, function(xsl) {

        if (feedUrl == "") {
            feedUrl = chrome.extension.getURL("/xsl/rss_feed.xml");
        }
        loadXMLDoc(feedUrl, function(xml) {
            var xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsl);
            var resultDocument = xsltProcessor.transformToFragment(xml, document);

            document.getElementById("NewsFeedControl_" + feedId).appendChild(resultDocument);

            callback();
        });
    });
}

function openGetPostUrl(url, openInNewTab, sendPostRequest, postData) {

    var newUrl;
    if (sendPostRequest) {
        newUrl = "post.html?url=" + encodeURIComponent(url) + "&postData=" + encodeURIComponent(postData);
    } else {
        newUrl = url;
    }

    openUrl(newUrl, openInNewTab);
}

function openUrl(url, openInNewTab) {
    if (openInNewTab) {
        chrome.tabs.create({
            "url" : url,
            "selected" : true
        });
        window.close();
    } else {
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.update(tab.id, {url : url, selected : true}, null);
            window.close();
        });
    }
}

function isBlank(string) {
    return string == null || string.replace(/(^\s+)|(\s+$)/g, "").length == 0;
}

function logoClick(inputTextId) {
    document.getElementById(inputTextId).focus();
}

function keyHandler(event, inputTextId, searchUrl, openInNewTab, sendPostRequest, postData, placeholderText, searchTermHandler) {
    if (event.keyCode == 13) {
        doSearch(inputTextId, searchUrl, openInNewTab, sendPostRequest, postData, placeholderText, searchTermHandler);
    }
}

function focusGained(e, textColor, placeholderText) {
    if (e.target.value == placeholderText) {
        e.target.value = "";
    }

    e.target.style.color = textColor;
}

function focusLost(e, textColor, placeholderText) {
    if (e.target.value == "") {
        e.target.value = placeholderText;
        e.target.style.color = textColor;
    }
}


var blankClockImage;
var blankClockAnim1Image;
var blankClockAnim2Image;
var animationTimer;
var currentClockImage;
var port;

function drawClock(hh, mm, ss) {

}

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

// Override from common.js
window.stopAlarmAnimation = function() {
};

// Override from common.js
window.displayAlarmAnimation = function() {
};

function addOutlineStyleListeners() {
}

function load() {

  updateCurrentTime();

  function updateTime(timeElement) {
    if (!parseTime(timeElement.value)) {
      return false;
    }

    timeElement.valueAsNumber =
        timeElement.valueAsNumber % (12 * 60 * 60 * 1000);
    if (timeElement.valueAsNumber < (1 * 60 * 60 * 1000))
      timeElement.valueAsNumber += (12 * 60 * 60 * 1000);
    return true;
  }

}


function doSearch(inputTextId, searchUrl, openInNewTab, sendPostRequest, postData, placeholderText, searchTermHandler) {
    var searchTerm = document.getElementById(inputTextId).value;

    if (isBlank(searchTerm) || searchTerm == placeholderText) {
        return;
    }

    if (searchTermHandler) {
        searchTerm = searchTermHandler(searchTerm);
        document.getElementById(inputTextId).value = searchTerm;
    }

    openSearchUrl(searchUrl, searchTerm, openInNewTab, sendPostRequest, postData);
}

document.addEventListener('DOMContentLoaded', function () {

        var urlHandler = null;

        document.querySelector('#MenuItemContainer_id_1').addEventListener('click', function(){
            if (urlHandler) {
                urlHandler('http://missa.StAndroid.ca/cgi-bin/missa/missa.pl', function(url){
                    openGetPostUrl(url, true, false, '');
                });
            } else {
                openGetPostUrl('http://missa.StAndroid.ca/cgi-bin/missa/missa.pl', true, false, '');
            }
          });

        var urlHandler = null;

        document.querySelector('#MenuItemContainer_id_8').addEventListener('click', function(){
            if (urlHandler) {
                urlHandler('http://missa.StAndroid.ca/cgi-bin/horas/officium.pl', function(url){
                    openGetPostUrl(url, true, false, '');
                });
            } else {
                openGetPostUrl('http://missa.StAndroid.ca/cgi-bin/horas/officium.pl', true, false, '');
            }
          });

        var urlHandler = null;

        document.querySelector('#MenuItemContainer_id_2').addEventListener('click', function(){
            if (urlHandler) {
                urlHandler('http://ordo.StAndroid.ca', function(url){
                    openGetPostUrl(url, true, false, '');
                });
            } else {
                openGetPostUrl('http://ordo.StAndroid.ca', true, false, '');
            }
          });

        var urlHandler = null;

        document.querySelector('#MenuItemContainer_id_3').addEventListener('click', function(){
            if (urlHandler) {
                urlHandler('https://play.google.com/store/apps/details?id=ca.cloud59.sanctissimissa', function(url){
                    openGetPostUrl(url, true, false, '');
                });
            } else {
                openGetPostUrl('https://play.google.com/store/apps/details?id=ca.cloud59.sanctissimissa', true, false, '');
            }
          });

        var urlHandler = null;

        document.querySelector('#MenuItemContainer_id_5').addEventListener('click', function(){
            if (urlHandler) {
                urlHandler('http://StLawrence.Cloud59.ca/', function(url){
                    openGetPostUrl(url, true, false, '');
                });
            } else {
                openGetPostUrl('http://StLawrence.Cloud59.ca/', true, false, '');
            }
          });


      renderNewsFeed('id_7', 'http://robin.cheung.mba2003.biz/feed/', function(){
          var links = document.querySelectorAll('#NewsFeedControl_id_7 a');

          for (var i=0; i < links.length; i++) {
              links[i].addEventListener('click', function(e){
                  var url = e.target.getAttribute("href");
                  var openInNewTab = e.target.getAttribute("newtab") == "true";

                  openUrl(url, openInNewTab);
              });
          }

      });
});
// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

document.addEventListener('DOMContentLoaded', load);
