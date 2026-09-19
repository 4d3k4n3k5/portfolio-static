(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _utilities = require("./utilities");
var _components = require("../../components");
var _templates = require("../../templates");
// --- utilities

// --- components

// --- templates

// --- App
var App = function () {
  // --- run transition
  var runTransition = function runTransition() {
    $("body").removeClass("hold-transition");
  };

  // --- show site content
  var showSiteContent = function showSiteContent() {
    $(".js-main-site").removeClass("main-site--hide");
    // --- disable scroll
    _utilities.Scrolllable.enable();
  };

  // --- ready
  var ready = function ready() {
    (function ($) {
      // --- disable scroll
      _utilities.Scrolllable.disable();

      // --- global
      runTransition();
      showSiteContent();
      _utilities.BrowserCheck.init();

      // --- components
      _components.BurgerMenu.init();
      // Accordion.init();
      _components.Header.init();
      _components.Animation.init();
      _components.Projects.init();
      _components.Category.init();
      // Api.init();
      // Footer.init();
      // ExampleSection.init();
      // ExampleItem.init();

      // --- templates
      // Default.init();
    })(jQuery);
  };

  // --- load
  var load = function load() {
    (function ($) {
      $(window).on("load", function () {});
    })(jQuery);
  };

  // --- init
  var init = function init() {
    load();
    ready();
  };

  // --- return
  return {
    init: init
  };
}();

// ---  run main js
App.init();

},{"../../components":18,"../../templates":20,"./utilities":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: BrowserCheck
@description: BrowserCheck
--------------------------------------------------------------------------------- */

// --- BrowserCheck
var BrowserCheck = function () {
  // --- handleCheck
  var handleCheck = function handleCheck() {
    var _browser = 'dekstop-browser';
    var HTMLElement = document.getElementsByTagName('html')[0];
    if (navigator.userAgent.match(/Android/i)) {
      _browser = 'android-browser';
    } else if (navigator.userAgent.match(/BlackBerry/i)) {
      _browser = 'blackberry-browser';
    } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      _browser = 'ios-browser';
    } else if (navigator.userAgent.match(/IEMobile/i)) {
      _browser = 'windows-phone-browser';
    }
    $('html').addClass(_browser);
  };

  // --- init
  var init = function init() {
    handleCheck();
  };

  // --- return
  return {
    init: init
  };
}();
var _default = exports["default"] = BrowserCheck;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: Scrolllable
@description: Scrolllable
--------------------------------------------------------------------------------- */

// --- Scrolllable
var Scrolllable = function () {
  // --- handleEnable
  var handleEnable = function handleEnable() {
    $('body').removeClass('rm-scroll');
  };

  // --- handleDisable
  var handleDisable = function handleDisable() {
    $('body').addClass('rm-scroll');
  };

  // --- return
  return {
    enable: handleEnable,
    disable: handleDisable
  };
}();
var _default = exports["default"] = Scrolllable;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: Session
@description: Session
--------------------------------------------------------------------------------- */

// --- Session
var Session = function () {
  var _timeoutSession;

  // --- handleSet
  var handleSet = function handleSet(key, value) {
    return localStorage.setItem(key, value);
  };

  // --- handleGet
  var handleGet = function handleGet(key, value) {
    return localStorage.getItem(key, value);
  };

  // --- handleRemove
  var handleRemove = function handleRemove(key) {
    return localStorage.removeItem(key);
  };

  // --- handleClear
  var handleClear = function handleClear(key) {
    return localStorage.clear();
  };

  // --- handleTimeout
  var handleTimeout = function handleTimeout(callbackFunction) {
    var timer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
    _timeoutSession = setTimeout(function () {
      callbackFunction();
    }, timer * 1000);
    document.addEventListener('mousemove', function (e) {
      clearTimeout(_timeoutSession);
      _timeoutSession = setTimeout(function () {
        callbackFunction();
      }, timer * 1000);
    }, true);
  };

  // --- return
  return {
    set: handleSet,
    get: handleGet,
    remove: handleRemove,
    clear: handleClear,
    timeout: handleTimeout
  };
}();
var _default = exports["default"] = Session;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _variables = require("../variables");
/* ------------------------------------------------------------------------------
@name: Validation
@description: Validation
--------------------------------------------------------------------------------- */

// --- variables

var Validation = function () {
  // - handleInput
  var handleInput = function handleInput(eventsEl, selectorEl) {
    $.each(eventsEl, function (ie, ve) {
      $.each(selectorEl, function (i, v) {
        $("#" + v.id).on(ve, function (e) {
          var _this = $(e.currentTarget),
            _val = _this.val(),
            _target = _this.attr("data-target"),
            _alertEl = $("#" + _target);
          var _errorMessage;

          // Condition if validation does not error
          _alertEl.removeClass("error");
          _this.parent().removeClass("error");

          // Minimum Validation
          if (v.validation.minimum) {
            if (_val.length < v.validation.minimumChar) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Maximum Validation
          if (v.validation.maximum) {
            if (_val.length < v.validation.maximumChar) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Minimum Validation
          if (v.validation.name) {
            if (!_variables.PERSON_NAME.test(_val)) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Email validation
          if (v.validation.email) {
            if (!_variables.EMAIL.test(_val)) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Numeric validation
          if (v.validation.phone) {
            if (!_variables.PHONE_NUMBER.test(_val)) {
              _errorMessage = _alertEl.attr("data-invalid-phone");
            }
          }

          // Required validation
          if (_variables.WHITESPACE.test(_val)) {
            _errorMessage = _alertEl.attr("data-req");
          }

          // Error Message
          if (_errorMessage !== undefined) {
            _alertEl.text(_errorMessage);
            _alertEl.addClass("error");
            _this.parent().addClass("error");
          }
        });
      });
    });

    // Return Handle keypress
    handleKeypress();
  };

  // handleKeypress
  var handleKeypress = function handleKeypress() {
    $(".number-only").on("keypress", function (e) {
      var _this = $(e.currentTarget),
        _val = _this.val(),
        _target = _this.attr("data-target"),
        _alertEl = $("#" + _target);
      var _errorMessage;
      if (!_variables.NUMBERIC.test(e.key)) {
        _errorMessage = _alertEl.attr("data-invalid");
        _alertEl.text(_errorMessage);
        _alertEl.addClass("error");
        _this.parent().addClass("error");
        // remove error after few second
        setTimeout(function () {
          _alertEl.removeClass("error");
          _this.parent().removeClass("error");
        }, 2000);
        e.preventDefault();
      }
    });
  };
  return {
    config: handleInput
  };
}();
var _default = exports["default"] = Validation;

},{"../variables":10}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: Window Resize
@description: Window Resize
--------------------------------------------------------------------------------- */

// --- WindowResize
var WindowResize = function () {
  var $rtime;
  var $timeout = false;
  var $delta = 200;
  var $lastWindowWidth = 0;
  var $callbackFunction = [];

  // --- handleResize
  var handleResize = function handleResize(callback) {
    $callbackFunction.push(callback);
    $(window).resize(function () {
      $rtime = new Date();
      if ($timeout === false) {
        if ($lastWindowWidth !== $(window).width()) {
          $timeout = true;
          $('body').addClass('hold-transition');
          setTimeout(_handleResizeEnd(), $delta);
        }
      }
    });
  };

  // --- handleResizeEnd
  var _handleResizeEnd = function handleResizeEnd() {
    if (new Date() - $rtime < $delta) {
      setTimeout(_handleResizeEnd, $delta);
    } else {
      $timeout = false;
      // Run Function on Resize end
      $('body').removeClass('hold-transition');
      $lastWindowWidth = $(window).width();
      $.each($callbackFunction, function (index, callback) {
        if (typeof callback === 'function') {
          callback();
        }
      });
    }
  };

  // --- return
  return {
    resize: handleResize
  };
}();
var _default = exports["default"] = WindowResize;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BrowserCheck", {
  enumerable: true,
  get: function get() {
    return _BrowserCheck["default"];
  }
});
Object.defineProperty(exports, "Scrolllable", {
  enumerable: true,
  get: function get() {
    return _Scrolllable["default"];
  }
});
Object.defineProperty(exports, "Session", {
  enumerable: true,
  get: function get() {
    return _Session["default"];
  }
});
Object.defineProperty(exports, "Validation", {
  enumerable: true,
  get: function get() {
    return _Validation["default"];
  }
});
Object.defineProperty(exports, "isOS", {
  enumerable: true,
  get: function get() {
    return _isOS["default"];
  }
});
var _isOS = _interopRequireDefault(require("./isOS"));
var _BrowserCheck = _interopRequireDefault(require("./BrowserCheck"));
var _Scrolllable = _interopRequireDefault(require("./Scrolllable"));
var _Validation = _interopRequireDefault(require("./Validation"));
var _Session = _interopRequireDefault(require("./Session"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }

},{"./BrowserCheck":2,"./Scrolllable":3,"./Session":4,"./Validation":5,"./isOS":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: isOS
@description: isOS
--------------------------------------------------------------------------------- */

var isOS = {
  android: function android() {
    return navigator.userAgent.match(/Android/i);
  },
  blackberry: function blackberry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  mac: function mac() {
    return navigator.platform.indexOf('Mac') > -1;
  },
  opera: function opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  win: function win() {
    return navigator.platform.indexOf('Win') > -1;
  },
  winMobile: function winMobile() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isOS.android() || isOS.blackberry() || isOS.iOS() || isOS.mac() || isOS.opera() || isOS.win() || isOS.winMobile();
  }
};
var _default = exports["default"] = isOS;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WHITESPACE = exports.PHONE_NUMBER = exports.PERSON_NAME = exports.NUMBERIC = exports.FULL_NAME = exports.EMAIL = void 0;
/* ------------------------------------------------------------------------------
@name: Regex
@description: Regex
--------------------------------------------------------------------------------- */

var WHITESPACE = exports.WHITESPACE = /^ *$/;
var EMAIL = exports.EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
var NUMBERIC = exports.NUMBERIC = /[0-9]+$/i;
var PHONE_NUMBER = exports.PHONE_NUMBER = /^(0|\+62)+([0-9]){4,16}/i;
var FULL_NAME = exports.FULL_NAME = /^(?:[\u00c0-\u01ffa-zA-Z-\s\.']){3,}(?:[\u00c0-\u01ffa-zA-Z-\s\.']{3,})+$/i;
var PERSON_NAME = exports.PERSON_NAME = /^[a-zA-Z][a-zA-Z\-' ]*[a-zA-Z ]$/i;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Regex = require("./Regex");
Object.keys(_Regex).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Regex[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Regex[key];
    }
  });
});

},{"./Regex":9}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: Animation
@description: Animation
--------------------------------------------------------------------------------- */

var Animation = function () {
  // handleScrolAnimate
  var handleAnimation = function handleAnimation() {
    // - handleRevealConfig
    var handleRevealConfig = function handleRevealConfig() {
      var distance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "8px";
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
      var _config = {
        duration: 500,
        distance: distance,
        delay: delay,
        origin: "bottom",
        easing: "ease"
      };
      return _config;
    };

    // - handleRevealConfigInterval
    var handleRevealConfigInterval = function handleRevealConfigInterval() {
      var distance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "8px";
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
      var _config = {
        duration: 1000,
        distance: distance,
        delay: delay,
        origin: "bottom",
        easing: "ease",
        interval: 150
      };
      return _config;
    };
    if ($(".hero").length) {
      ScrollReveal().reveal(".hero__ttl", handleRevealConfig());
    }
    if ($(".accordion").length) {
      ScrollReveal().reveal(".accordion__label", handleRevealConfigInterval());
      ScrollReveal().reveal(".accordion__tab .btn", handleRevealConfigInterval());
      if ($(window).width() > 991.98) {
        ScrollReveal().reveal(".accordion__list", handleRevealConfigInterval());
      } else {
        ScrollReveal().reveal(".accordion__body", handleRevealConfigInterval());
      }
    }
    if ($(".projects").length) {
      ScrollReveal().reveal(".projects__ttl", handleRevealConfig());
      ScrollReveal().reveal(".projects__body", handleRevealConfig());
      ScrollReveal().reveal(".category", handleRevealConfigInterval());
    }
  };

  // - init
  var init = function init() {
    handleAnimation();
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = Animation;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Scrolllable = _interopRequireDefault(require("../../../_core/scripts/utilities/Scrolllable"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/* ------------------------------------------------------------------------------
@name: Burger Menu
@description: Burger Menu
--------------------------------------------------------------------------------- */

var BurgerMenu = function () {
  // - handleOpen
  var handleOpen = function handleOpen() {
    $("body").addClass("show-menu");
    _Scrolllable["default"].disable();
  };

  // - handleClose
  var handleClose = function handleClose() {
    $("body").removeClass("show-menu");
    _Scrolllable["default"].enable();
  };

  // - handleClickOpen
  var handleClick = function handleClick() {
    $(".js-burger-menu").on("click.open", function () {
      if (!$("body").hasClass("show-menu")) {
        handleOpen();
      } else {
        handleClose();
      }
    });
  };

  // - handleKeyboardEsc
  var handleKeyboardEsc = function handleKeyboardEsc() {
    $(document).on("keyup", function (e) {
      if (e.which === 27) {
        if ($("body").hasClass("show-menu")) {
          handleClose();
        }
      }
    });
  };

  // - init
  var init = function init() {
    handleClick();
    handleKeyboardEsc();
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = BurgerMenu;

},{"../../../_core/scripts/utilities/Scrolllable":3}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _WindowResize = _interopRequireDefault(require("../../../_core/scripts/utilities/WindowResize.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/* ------------------------------------------------------------------------------
@name: Category
@description: Category
--------------------------------------------------------------------------------- */

var Category = function () {
  var BREAKPOINT_DESKTOP = 991.98;

  // - isMobile
  var isMobile = function isMobile() {
    return $(window).width() <= BREAKPOINT_DESKTOP;
  };

  // handleSetCategory
  var handleSetCategory = function handleSetCategory() {
    $(".category .category__item").eq(0).addClass("category__item--active");
    $(".projects .projects__panel").eq(0).show();
  };

  // - handleClickDropdown
  var handleClickDropdown = function handleClickDropdown() {
    $(".category .category__dropdown__btn").on("click", function (e) {
      var _this = e.currentTarget;
      $(_this).toggleClass("active");
      $(".category__panel").slideToggle();
    });
  };
  var handleClickCategory = function handleClickCategory() {
    $(".category__btn").on("click", function (e) {
      var _this = $(e.currentTarget);
      var $parents = _this.parents(".projects");
      var $item = _this.parents(".category__item");
      var $category = _this.closest(".category");
      var _target = $item.data("target");
      var _text = _this.text();
      $parents.find(".projects__panel[data-index=".concat(_target, "]")).show().siblings(".projects__panel").hide();
      if (!$item.hasClass("category__item--active")) {
        $item.addClass("category__item--active").siblings(".category__item").removeClass("category__item--active");
      }
      if (isMobile()) {
        $category.find(".category__dropdown__btn").text(_text).removeClass("active");
        $category.find(".category__panel").slideUp();
      }
    });
  };

  // - init
  var init = function init() {
    handleSetCategory();
    handleClickCategory();
    handleClickDropdown();
    _WindowResize["default"].resize(isMobile);
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = Category;

},{"../../../_core/scripts/utilities/WindowResize.js":6}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Animation", {
  enumerable: true,
  get: function get() {
    return _Animation["default"];
  }
});
Object.defineProperty(exports, "BurgerMenu", {
  enumerable: true,
  get: function get() {
    return _BurgerMenu["default"];
  }
});
Object.defineProperty(exports, "Category", {
  enumerable: true,
  get: function get() {
    return _Category["default"];
  }
});
var _BurgerMenu = _interopRequireDefault(require("./BurgerMenu"));
var _Animation = _interopRequireDefault(require("./Animation"));
var _Category = _interopRequireDefault(require("./Category"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }

},{"./Animation":11,"./BurgerMenu":12,"./Category":13}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: Footer
@description: Footer
--------------------------------------------------------------------------------- */

var Footer = function () {
  // - handleSayHello
  var handleSayHello = function handleSayHello() {
    console.log("hello world example footer");
  };

  // - init
  var init = function init() {
    handleSayHello();
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = Footer;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Scrolllable = _interopRequireDefault(require("../../_core/scripts/utilities/Scrolllable"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/* ------------------------------------------------------------------------------
@name: Header
@description: Header
--------------------------------------------------------------------------------- */

var Header = function () {
  // - handleClick
  var handleClick = function handleClick() {
    if ($(window).width() >= 991.98) {
      $(".header__menu").on("click", function (e) {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      });
    }
  };

  // - handleEsc
  var handleEsc = function handleEsc() {
    $(document).on("keyup", function (e) {
      if (e.which === 27) {
        handleClose();
      }
    });
  };

  // - handleClose
  var handleClose = function handleClose() {
    if ($("body").hasClass("show-menu")) {
      $("body").removeClass("show-menu");
      _Scrolllable["default"].enable();
    }
  };

  // - setVhUnit
  var setVhUnit = function setVhUnit() {
    var vh = $(window).height() * 0.01;
    $(":root").css("--vh", vh + "px");
  };
  var handleTheme = function handleTheme() {
    var $html = $("html");
    var setTheme = function setTheme(theme) {
      $html.removeClass("theme-light theme-dark").addClass("theme-".concat(theme));
      localStorage.setItem("current-theme", theme);
    };
    setTheme(localStorage.getItem("current-theme") === "dark" ? "dark" : "light");
    $(".js-theme-dark").on("click", function () {
      return setTheme("dark");
    });
    $(".js-theme-light").on("click", function () {
      return setTheme("light");
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        return $html.addClass("theme-ready");
      });
    });
  };

  // - init
  var init = function init() {
    handleClick();
    handleEsc();
    setVhUnit();
    handleTheme();
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = Header;

},{"../../_core/scripts/utilities/Scrolllable":3}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _WindowResize = _interopRequireDefault(require("../../_core/scripts/utilities/WindowResize.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/* ------------------------------------------------------------------------------
@name: Projects
@description: Projects
--------------------------------------------------------------------------------- */

var Projects = function () {
  var BREAKPOINT_DESKTOP = 991.98;
  var _isMobileState = null;

  // - isMobile
  var isMobile = function isMobile() {
    return $(window).width() <= BREAKPOINT_DESKTOP;
  };

  // - handleDescription
  var handleDescription = function handleDescription() {
    $(".projects .projects__desc").each(function (index, el) {
      var $desc = $(el);
      var $readMore = $desc.next(".js-more");
      var isOverflowing = $desc[0].scrollHeight > $desc[0].clientHeight;
      if (isOverflowing) {
        $readMore.addClass("show");
      }
    });
    $(".projects .js-more").on("click.projects", function (e) {
      var $readMore = $(e.currentTarget);
      var $desc = $readMore.prev(".projects__desc");
      $desc.toggleClass("expanded");
      $readMore.text($desc.hasClass("expanded") ? "Read Less" : "Read More");
    });
  };

  // - handleSet
  var handleSet = function handleSet() {
    $(".projects__panel").each(function (index, panel) {
      $(panel).find(".projects__item").eq(0).addClass("projects__item--active").find(".projects__wrap").show();
    });
  };

  // - handleClick
  var handleClick = function handleClick() {
    $(".projects__item").on("click.projects", function (e) {
      var _this = $(e.currentTarget);
      _this.toggleClass("projects__item--active").find(".projects__wrap").slideToggle();
      // _this
      //   .siblings(".projects__item")
      //   .removeClass("projects__item--active")
      //   .find(".projects__wrap")
      //   .slideUp();
    });
  };

  // - handleClickButton
  var handleClickButton = function handleClickButton() {
    $(".projects__link .btn.btn--secondary").on("click.projects", function (e) {
      e.stopPropagation();
    });
  };

  // - handleDestroy
  var handleDestroy = function handleDestroy() {
    var mobile = isMobile();
    if (mobile === _isMobileState) return;
    _isMobileState = mobile;
    $(".projects__item").off("click.projects");
    $(".projects .js-more").off("click.projects");
    $(".projects__link .btn.btn--secondary").off("click.projects");
    if (mobile) {
      $(".projects__item").removeClass("projects__item--active").find(".projects__wrap").hide();
      handleSet();
      handleClick();
      handleClickButton();
    } else {
      handleDescription();
    }
  };

  // - init
  var init = function init() {
    handleDestroy();
    _WindowResize["default"].resize(handleDestroy);
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = Projects;

},{"../../_core/scripts/utilities/WindowResize.js":6}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Header: true,
  Footer: true,
  Projects: true
};
Object.defineProperty(exports, "Footer", {
  enumerable: true,
  get: function get() {
    return _Footer["default"];
  }
});
Object.defineProperty(exports, "Header", {
  enumerable: true,
  get: function get() {
    return _Header["default"];
  }
});
Object.defineProperty(exports, "Projects", {
  enumerable: true,
  get: function get() {
    return _Projects["default"];
  }
});
var _Header = _interopRequireDefault(require("./Header"));
var _Footer = _interopRequireDefault(require("./Footer"));
var _Projects = _interopRequireDefault(require("./Projects"));
var _Elements = require("./Elements");
Object.keys(_Elements).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Elements[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Elements[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }

},{"./Elements":14,"./Footer":15,"./Header":16,"./Projects":17}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: Default
@description: Default
--------------------------------------------------------------------------------- */

var Default = function () {
  // - handleSayHello
  var handleSayHello = function handleSayHello() {
    console.log("hello world example template");
  };

  // - init
  var init = function init() {
    handleSayHello();
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = Default;

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Default", {
  enumerable: true,
  get: function get() {
    return _Default["default"];
  }
});
var _Default = _interopRequireDefault(require("./Default"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }

},{"./Default":19}]},{},[1])

//# sourceMappingURL=maps/app.js.map
