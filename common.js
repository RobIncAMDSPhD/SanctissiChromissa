/**
 * Copyright (c) 2011 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

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
  window.stopAlarmAnimation();
  window.stopFlashingIcon();
}