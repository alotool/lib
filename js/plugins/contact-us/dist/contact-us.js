function arCuGetCookie(cookieName) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(cookieName + "=");
    if (c_start != -1) {
      c_start = c_start + cookieName.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return 0;
};

function arCuCreateCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
};

function arCuShowMessage(index) {
  if (arCuPromptClosed) {
    return false;
  }
  if (typeof arCuMessages[index] !== 'undefined') {
    jQuery('#arcontactus').contactUs('showPromptTyping');

    _arCuTimeOut = setTimeout(function() {
      if (arCuPromptClosed) {
        return false;
      }
      jQuery('#arcontactus').contactUs('showPrompt', {
        content: arCuMessages[index]
      });
      index++;
      _arCuTimeOut = setTimeout(function() {
        if (arCuPromptClosed) {
          return false;
        }
        arCuShowMessage(index);
      }, arCuMessageTime);
    }, arCuTypingTime);
  } else {
    if (arCuCloseLastMessage) {
      jQuery('#arcontactus').contactUs('hidePrompt');
    }
    if (arCuLoop) {
      arCuShowMessage(0);
    }
  }
};

function arCuShowMessages() {
  setTimeout(function() {
    clearTimeout(_arCuTimeOut);
    arCuShowMessage(0);
  }, arCuDelayFirst);
};

window.addEventListener('load', function() {
  jQuery('#arcontactus-storefront-btn').click(function(e) {
    e.preventDefault();
    setTimeout(function() {
      jQuery('#arcontactus').contactUs('openMenu');
    }, 200);
  });
});

var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(b) {
  var d = 0;
  return function() {
    return d < b.length ? {
      done: !1,
      value: b[d++]
    } : {
      done: !0
    }
  }
};
$jscomp.arrayIterator = function(b) {
  return {
    next: $jscomp.arrayIteratorImpl(b)
  }
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, d, a) {
  b != Array.prototype && b != Object.prototype && (b[d] = a.value)
};
$jscomp.getGlobal = function(b) {
  return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {};
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function() {
  var b = 0;
  return function(d) {
    return $jscomp.SYMBOL_PREFIX + (d || "") + b++
  }
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var b = $jscomp.global.Symbol.iterator;
  b || (b = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[b] && $jscomp.defineProperty(Array.prototype, b, {
    configurable: !0,
    writable: !0,
    value: function() {
      return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
    }
  });
  $jscomp.initSymbolIterator = function() {}
};
$jscomp.initSymbolAsyncIterator = function() {
  $jscomp.initSymbol();
  var b = $jscomp.global.Symbol.asyncIterator;
  b || (b = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function() {}
};
$jscomp.iteratorPrototype = function(b) {
  $jscomp.initSymbolIterator();
  b = {
    next: b
  };
  b[$jscomp.global.Symbol.iterator] = function() {
    return this
  };
  return b
};
$jscomp.iteratorFromArray = function(b, d) {
  $jscomp.initSymbolIterator();
  b instanceof String && (b += "");
  var a = 0,
    c = {
      next: function() {
        if (a < b.length) {
          var e = a++;
          return {
            value: d(e, b[e]),
            done: !1
          }
        }
        c.next = function() {
          return {
            done: !0,
            value: void 0
          }
        };
        return c.next()
      }
    };
  c[Symbol.iterator] = function() {
    return c
  };
  return c
};
$jscomp.polyfill = function(b, d, a, c) {
  if (d) {
    a = $jscomp.global;
    b = b.split(".");
    for (c = 0; c < b.length - 1; c++) {
      var e = b[c];
      e in a || (a[e] = {});
      a = a[e]
    }
    b = b[b.length - 1];
    c = a[b];
    d = d(c);
    d != c && null != d && $jscomp.defineProperty(a, b, {
      configurable: !0,
      writable: !0,
      value: d
    })
  }
};
$jscomp.polyfill("Array.prototype.values", function(b) {
  return b ? b : function() {
    return $jscomp.iteratorFromArray(this, function(b, a) {
      return a
    })
  }
}, "es8", "es3");
$jscomp.findInternal = function(b, d, a) {
  b instanceof String && (b = String(b));
  for (var c = b.length, e = 0; e < c; e++) {
    var l = b[e];
    if (d.call(a, l, e, b)) return {
      i: e,
      v: l
    }
  }
  return {
    i: -1,
    v: void 0
  }
};
$jscomp.polyfill("Array.prototype.find", function(b) {
  return b ? b : function(b, a) {
    return $jscomp.findInternal(this, b, a).v
  }
}, "es6", "es3");

(function(b) {
  function d(a, c) {
    this._initialized = !1;
    this.settings = null;
    this.popups = [];
    this.options = b.extend({}, d.Defaults, c);
    this.$element = b(a);
    this.init();
    this.y = this.x = 0;
    this._interval;
    this._callbackOpened = this._popupOpened = this._menuOpened = !1;
    this.countdown = null
  }

  d.Defaults = {
    activated: !1,
    pluginVersion: "2.0.1",
    wordpressPluginVersion: !1,
    align: "right",
    mode: "regular",
    countdown: 0,
    drag: !1,
    buttonText: "Contact us",
    buttonSize: "large",
    menuSize: "normal",
    buttonIcon: '<svg width="20" height="20" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(-825 -308)"><g><path transform="translate(825 308)" fill="#FFFFFF" d="M 19 4L 17 4L 17 13L 4 13L 4 15C 4 15.55 4.45 16 5 16L 16 16L 20 20L 20 5C 20 4.45 19.55 4 19 4ZM 15 10L 15 1C 15 0.45 14.55 0 14 0L 1 0C 0.45 0 0 0.45 0 1L 0 15L 4 11L 14 11C 14.55 11 15 10.55 15 10Z"/></g></g></svg>',
    ajaxUrl: "server.php",
    action: "callback",
    phonePlaceholder: "+X-XXX-XXX-XX-XX",
    callbackSubmitText: "Waiting for call",
    reCaptcha: !1,
    reCaptchaAction: "callbackRequest",
    reCaptchaKey: "",
    errorMessage: "Connection error. Please try again.",
    callProcessText: "We are calling you to phone",
    callSuccessText: "Thank you.<br>We are call you back soon.",
    showMenuHeader: !1,
    menuHeaderText: "How would you like to contact us?",
    showHeaderCloseBtn: !0,
    menuInAnimationClass: "show-messageners-block",
    menuOutAnimationClass: "",
    eaderCloseBtnBgColor: "#787878",
    eaderCloseBtnColor: "#FFFFFF",
    items: [],
    itemsIconType: "rounded",
    iconsAnimationSpeed: 800,
    iconsAnimationPause: 2E3,
    promptPosition: "side",
    callbackFormFields: {
      name: {
        name: "name",
        enabled: !0,
        required: !0,
        type: "text",
        label: "Please enter your name",
        placeholder: "Your full name"
      },
      email: {
        name: "email",
        enabled: !0,
        required: !1,
        type: "email",
        label: "Enter your email address",
        placeholder: "Optional field. Example: email@domain.com"
      },
      time: {
        name: "time",
        enabled: !0,
        required: !1,
        type: "dropdown",
        label: "Please choose schedule time",
        values: [{
          value: "asap",
          label: "Call me ASAP"
        },
          "00:00",
          "01:00",
          "02:00",
          "03:00",
          "04:00",
          "05:00",
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00"
        ]
      },
      phone: {
        name: "phone",
        enabled: !0,
        required: !0,
        type: "tel",
        label: "Please enter your phone number",
        placeholder: "+X-XXX-XXX-XX-XX"
      },
      description: {
        name: "description",
        enabled: !0,
        required: !1,
        type: "textarea",
        label: "Please leave a message with your request"
      }
    },
    theme: "#000000",
    callbackFormText: "Please enter your phone number<br>and we call you back soon",
    closeIcon: '<svg width="12" height="13" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(-4087 108)"><g><path transform="translate(4087 -108)" fill="currentColor" d="M 14 1.41L 12.59 0L 7 5.59L 1.41 0L 0 1.41L 5.59 7L 0 12.59L 1.41 14L 7 8.41L 12.59 14L 14 12.59L 8.41 7L 14 1.41Z"></path></g></g></svg>',
    callbackStateIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path></svg>'
  };
  d.prototype.init = function() {
    if (this._initialized) return !1;
    this.destroy();
    this.settings = b.extend({}, this.options);
    this.$element.addClass("arcontactus-widget").addClass("arcontactus-message");
    "left" === this.settings.align ? this.$element.addClass("left") : this.$element.addClass("right");
    this.settings.items.length ? (this.$element.append("\x3c!--noindex--\x3e"), this._initCallbackBlock(), "regular" == this.settings.mode && this._initMessengersBlock(), this.popups.length && this._initPopups(), this._initMessageButton(),
      this._initPrompt(), this._initEvents(), this.startAnimation(), this.$element.append("\x3c!--/noindex--\x3e"), this.$element.addClass("active")) : console.info("jquery.contactus:no items");
    this._initialized = !0;
    this.$element.trigger("arcontactus.init")
  };
  d.prototype.destroy = function() {
    if (!this._initialized) return !1;
    this.$element.html("");
    this._initialized = !1;
    this.$element.trigger("arcontactus.destroy")
  };
  d.prototype._initCallbackBlock = function() {
    var a = b("<div>", {
        class: "callback-countdown-block",
        style: this._colorStyle()
      }),
      c = b("<div>", {
        class: "callback-countdown-block-close",
        style: "background-color:" + this.settings.theme + "; color: #FFFFFF"
      });
    c.append(this.settings.closeIcon);
    var e = b("<div>", {
      class: "callback-countdown-block-phone"
    });
    e.append("<p>" + this.settings.callbackFormText + "</p>");
    var d = b("<form>", {
        id: "arcu-callback-form",
        action: this.settings.ajaxUrl,
        method: "POST"
      }),
      h = b("<div>", {
        class: "callback-countdown-block-form-group"
      }),
      f = b("<input>", {
        name: "action",
        type: "hidden",
        value: this.settings.action
      }),
      g = b("<input>", {
        name: "gtoken",
        class: "ar-g-token",
        type: "hidden",
        value: ""
      });
    h.append(f);
    h.append(g);
    this._initCallbackFormFields(h);
    f = b("<div>", {
      class: "arcu-form-group arcu-form-button"
    });
    g = b("<button>", {
      id: "arcontactus-message-callback-phone-submit",
      type: "submit",
      style: this._backgroundStyle()
    });
    g.text(this.settings.callbackSubmitText);
    f.append(g);
    h.append(f);
    f = b("<div>", {
      class: "callback-countdown-block-timer"
    });
    g = b("<p>" + this.settings.callProcessText + "</p>");
    var k = b("<div>", {
      class: "callback-countdown-block-timer_timer"
    });
    f.append(g);
    f.append(k);
    g = b("<div>", {
      class: "callback-countdown-block-sorry"
    });
    k = b("<p>" + this.settings.callSuccessText + "</p>");
    g.append(k);
    d.append(h);
    e.append(d);
    a.append(c);
    a.append(e);
    a.append(f);
    a.append(g);
    this.$element.append(a)
  };
  d.prototype._initCallbackFormFields = function(a) {
    var c = this;
    b.each(c.settings.callbackFormFields, function(e) {
      var d = b("<div>", {
          class: "arcu-form-group arcu-form-group-type-" + c.settings.callbackFormFields[e].type + " arcu-form-group-" + c.settings.callbackFormFields[e].name + (c.settings.callbackFormFields[e].required ?
            " arcu-form-group-required" : "")
        }),
        h = "<input>";
      switch (c.settings.callbackFormFields[e].type) {
        case "textarea":
          h = "<textarea>";
          break;
        case "dropdown":
          h = "<select>"
      }
      if (c.settings.callbackFormFields[e].label) {
        var f = b("<div>", {
          class: "arcu-form-label"
        });
        f.html(c.settings.callbackFormFields[e].label);
        d.append(f)
      }
      var g = b(h, {
        name: c.settings.callbackFormFields[e].name,
        class: "arcu-form-field arcu-field-" + c.settings.callbackFormFields[e].name,
        required: c.settings.callbackFormFields[e].required,
        type: "dropdown" == c.settings.callbackFormFields[e].type ?
          null : c.settings.callbackFormFields[e].type,
        value: ""
      });
      g.attr("placeholder", c.settings.callbackFormFields[e].placeholder);
      "undefined" != typeof c.settings.callbackFormFields[e].maxlength && g.attr("maxlength", c.settings.callbackFormFields[e].maxlength);
      "dropdown" == c.settings.callbackFormFields[e].type && b.each(c.settings.callbackFormFields[e].values, function(a) {
        var d = c.settings.callbackFormFields[e].values[a],
          l = c.settings.callbackFormFields[e].values[a];
        "object" == typeof c.settings.callbackFormFields[e].values[a] &&
        (d = c.settings.callbackFormFields[e].values[a].value, l = c.settings.callbackFormFields[e].values[a].label);
        a = b("<option>", {
          value: d
        });
        a.text(l);
        g.append(a)
      });
      d.append(g);
      a.append(d)
    })
  };
  d.prototype._initPopups = function() {
    var a = this,
      c = b("<div>", {
        class: "popups-block arcuAnimated"
      }),
      e = b("<div>", {
        class: "popups-list-container"
      });
    b.each(this.popups, function() {
      var c = b("<div>", {
          class: "arcu-popup",
          id: "arcu-popup-" + this.id
        }),
        d = b("<div>", {
          class: "arcu-popup-header",
          style: a.settings.theme ? "background-color:" + a.settings.theme : null
        }),
        f = b("<div>", {
          class: "arcu-popup-close",
          style: a.settings.theme ? "background-color:" + a.settings.theme : null
        }),
        g = b("<div>", {
          class: "arcu-popup-back",
          style: a.settings.theme ? "background-color:" + a.settings.theme : null
        });
      f.append(a.settings.closeIcon);
      g.append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z" class=""></path></svg>');
      d.text(this.title);
      d.append(f);
      d.append(g);
      f = b("<div>", {
        class: "arcu-popup-content"
      });
      f.html(this.popupContent);
      c.append(d);
      c.append(f);
      e.append(c)
    });
    c.append(e);
    this.$element.append(c)
  };
  d.prototype._initMessengersBlock = function() {
    var a = b("<div>", {
        class: "messangers-block arcuAnimated"
      }),
      c = b("<div>", {
        class: "messangers-list-container"
      }),
      e = b("<ul>", {
        class: "messangers-list"
      });
    "normal" !== this.settings.menuSize && "large" !== this.settings.menuSize || a.addClass("lg");
    "small" === this.settings.menuSize && a.addClass("sm");
    this._appendMessengerIcons(e);
    if (this.settings.showMenuHeader) {
      var d = b("<div>", {
        class: "arcu-menu-header",
        style: this.settings.theme ? "background-color:" + this.settings.theme : null
      });
      d.html(this.settings.menuHeaderText);
      if (this.settings.showHeaderCloseBtn) {
        var h = b("<div>", {
          class: "arcu-header-close",
          style: "color:" + this.settings.headerCloseBtnColor + "; background:" + this.settings.headerCloseBtnBgColor
        });
        h.append(this.settings.closeIcon);
        d.append(h)
      }
      a.append(d);
      a.addClass("has-header")
    }
    "rounded" == this.settings.itemsIconType ?
      e.addClass("rounded-items") : e.addClass("not-rounded-items");
    c.append(e);
    a.append(c);
    this.$element.append(a)
  };
  d.prototype._appendMessengerIcons = function(a) {
    var c = this;
    b.each(this.settings.items, function(e) {
      e = b("<li>", {});
      if ("callback" == this.href) var d = b("<div>", {
        class: "messanger call-back " + (this.class ? this.class : "")
      });
      else if ("_popup" == this.href) c.popups.push(this), d = b("<div>", {
        class: "messanger arcu-popup-link " + (this.class ? this.class : ""),
        "data-id": this.id ? this.id : null
      });
      else if (d = b("<a>", {
        class: "messanger " +
          (this.class ? this.class : ""),
        id: this.id ? this.id : null,
        rel: "nofollow noopener",
        href: this.href,
        target: this.target ? this.target : "_blank"
      }), this.onClick) {
        var h = this;
        d.on("click", function(a) {
          h.onClick(a)
        })
      }
      var f = "rounded" == c.settings.itemsIconType ? b("<span>", {
        style: this.color ? "background-color:" + this.color : null
      }) : b("<span>", {
        style: (this.color ? "color:" + this.color : null) + "; background-color: transparent"
      });
      f.append(this.icon);
      d.append(f);
      f = b("<div>", {
        class: "arcu-item-label"
      });
      var g = b("<div>", {
        class: "arcu-item-title"
      });
      g.text(this.title);
      f.append(g);
      "undefined" != typeof this.subTitle && this.subTitle && (g = b("<div>", {
        class: "arcu-item-subtitle"
      }), g.text(this.subTitle), f.append(g));
      d.append(f);
      e.append(d);
      a.append(e)
    })
  };
  d.prototype._initMessageButton = function() {
    var a = this,
      c = b("<div>", {
        class: "arcontactus-message-button",
        style: this._backgroundStyle()
      });
    "large" === this.settings.buttonSize && this.$element.addClass("lg");
    "huge" === this.settings.buttonSize && this.$element.addClass("hg");
    "medium" === this.settings.buttonSize && this.$element.addClass("md");
    "small" === this.settings.buttonSize && this.$element.addClass("sm");
    var e = b("<div>", {
      class: "static"
    });
    e.append(this.settings.buttonIcon);
    !1 !== this.settings.buttonText ? e.append("<p>" + this.settings.buttonText + "</p>") : c.addClass("no-text");
    var d = b("<div>", {
      class: "callback-state",
      style: a._colorStyle()
    });
    d.append(this.settings.callbackStateIcon);
    var h = b("<div>", {
        class: "icons hide"
      }),
      f = b("<div>", {
        class: "icons-line"
      });
    b.each(this.settings.items, function(c) {
      c = b("<span>", {
        style: a._colorStyle()
      });
      c.append(this.icon);
      f.append(c)
    });
    h.append(f);
    var g = b("<div>", {
      class: "arcontactus-close"
    });
    g.append(this.settings.closeIcon);
    var k = b("<div>", {
        class: "pulsation",
        style: a._backgroundStyle()
      }),
      m = b("<div>", {
        class: "pulsation",
        style: a._backgroundStyle()
      });
    c.append(e).append(d).append(h).append(g).append(k).append(m);
    this.$element.append(c)
  };
  d.prototype._initPrompt = function() {
    var a = b("<div>", {
        class: "arcontactus-prompt arcu-prompt-" + this.settings.promptPosition
      }),
      c = b("<div>", {
        class: "arcontactus-prompt-close",
        style: this._backgroundStyle() +
          "; color: #FFFFFF"
      });
    c.append(this.settings.closeIcon);
    var e = b("<div>", {
      class: "arcontactus-prompt-inner"
    });
    a.append(c).append(e);
    this.$element.append(a)
  };
  d.prototype._initEvents = function() {
    var a = this.$element,
      c = this;
    a.find(".arcontactus-message-button").on("mousedown", function(a) {
      c.x = a.pageX;
      c.y = a.pageY
    }).on("mouseup", function(a) {
      if (c.settings.drag && a.pageX === c.x && a.pageY === c.y || !c.settings.drag) "regular" == c.settings.mode ? c._menuOpened || c._popupOpened || c._callbackOpened ? (c._menuOpened && c.closeMenu(),
      c._popupOpened && c.closePopup()) : c.openMenu() : c.openCallbackPopup(), a.preventDefault()
    });
    this.settings.drag && (a.draggable(), a.get(0).addEventListener("touchmove", function(c) {
      var b = c.targetTouches[0];
      a.get(0).style.left = b.pageX - 25 + "px";
      a.get(0).style.top = b.pageY - 25 + "px";
      c.preventDefault()
    }, !1));
    b(document).on("click", function(a) {
      c.closeMenu();
      c.closePopup()
    });
    a.on("click", function(a) {
      a.stopPropagation()
    });
    a.find(".call-back").on("click", function() {
      c.openCallbackPopup()
    });
    a.find(".arcu-popup-link").on("click",
      function() {
        var a = b(this).data("id");
        c.openPopup(a)
      });
    a.find(".arcu-header-close").on("click", function() {
      c.closeMenu()
    });
    a.find(".arcu-popup-close").on("click", function() {
      c.closePopup()
    });
    a.find(".arcu-popup-back").on("click", function() {
      c.closePopup();
      c.openMenu()
    });
    a.find(".callback-countdown-block-close").on("click", function() {
      null != c.countdown && (clearInterval(c.countdown), c.countdown = null);
      c.closeCallbackPopup()
    });
    a.find(".arcontactus-prompt-close").on("click", function() {
      c.hidePrompt()
    });
    a.find("#arcu-callback-form").on("submit",
      function(b) {
        b.preventDefault();
        a.find(".callback-countdown-block-phone").addClass("ar-loading");
        c.settings.reCaptcha ? grecaptcha.execute(c.settings.reCaptchaKey, {
          action: c.settings.reCaptchaAction
        }).then(function(b) {
          a.find(".ar-g-token").val(b);
          c.sendCallbackRequest()
        }) : c.sendCallbackRequest()
      });
    setTimeout(function() {
      c._processHash()
    }, 500);
    b(window).on("hashchange", function(a) {
      c._processHash()
    })
  };
  d.prototype._processHash = function() {
    switch (window.location.hash) {
      case "#callback-form":
      case "callback-form":
        this.openCallbackPopup();
        break;
      case "#callback-form-close":
      case "callback-form-close":
        this.closeCallbackPopup();
        break;
      case "#contactus-menu":
      case "contactus-menu":
        this.openMenu();
        break;
      case "#contactus-menu-close":
      case "contactus-menu-close":
        this.closeMenu();
        break;
      case "#contactus-hide":
      case "contactus-hide":
        this.hide();
        break;
      case "#contactus-show":
      case "contactus-show":
        this.show()
    }
  };
  d.prototype._callBackCountDownMethod = function() {
    var a = this.settings.countdown,
      c = this.$element,
      b = this,
      d = 60;
    c.find(".callback-countdown-block-phone, .callback-countdown-block-timer").toggleClass("display-flex");
    this.countdown = setInterval(function() {
      --d;
      var e = a,
        f = d;
      10 > a && (e = "0" + a);
      10 > d && (f = "0" + d);
      e = e + ":" + f;
      c.find(".callback-countdown-block-timer_timer").html(e);
      0 === d && 0 === a && (clearInterval(b.countdown), b.countdown = null, c.find(".callback-countdown-block-sorry, .callback-countdown-block-timer").toggleClass("display-flex"));
      0 === d && (d = 60, --a)
    }, 20)
  };
  d.prototype.sendCallbackRequest = function() {
    var a = this,
      c = a.$element;
    this.$element.trigger("arcontactus.beforeSendCallbackRequest");
    b.ajax({
      url: a.settings.ajaxUrl,
      type: "POST",
      dataType: "json",
      data: c.find("form").serialize(),
      success: function(b) {
        a.settings.countdown && a._callBackCountDownMethod();
        c.find(".callback-countdown-block-phone").removeClass("ar-loading");
        if (b.success) a.settings.countdown || c.find(".callback-countdown-block-sorry, .callback-countdown-block-phone").toggleClass("display-flex");
        else if (b.errors) {
          var d = b.errors.join("\n\r");
          alert(d)
        } else alert(a.settings.errorMessage);
        a.$element.trigger("arcontactus.successCallbackRequest", b)
      },
      error: function() {
        c.find(".callback-countdown-block-phone").removeClass("ar-loading");
        alert(a.settings.errorMessage);
        a.$element.trigger("arcontactus.errorCallbackRequest")
      }
    })
  };
  d.prototype.show = function() {
    this.$element.addClass("active");
    this.$element.trigger("arcontactus.show")
  };
  d.prototype.hide = function() {
    this.$element.removeClass("active");
    this.$element.trigger("arcontactus.hide")
  };
  d.prototype.openPopup = function(a) {
    this.closeMenu();
    var c = this.$element;
    c.find("#arcu-popup-" + a).addClass("show-messageners-block");
    c.find("#arcu-popup-" + a).hasClass("popup-opened") || (this.stopAnimation(),
      c.addClass("popup-opened"), c.find("#arcu-popup-" + a).addClass(this.settings.menuInAnimationClass), c.find(".arcontactus-close").addClass("show-messageners-block"), c.find(".icons, .static").addClass("hide"), c.find(".pulsation").addClass("stop"), this._popupOpened = !0, this.$element.trigger("arcontactus.openPopup"))
  };
  d.prototype.closePopup = function() {
    var a = this.$element;
    a.find(".arcu-popup").hasClass("show-messageners-block") && (setTimeout(function() {
      a.removeClass("popup-opened")
    }, 150), a.find(".arcu-popup").removeClass(this.settings.menuInAnimationClass).addClass(this.settings.menuOutAnimationClass),
      setTimeout(function() {
        a.removeClass("popup-opened")
      }, 150), a.find(".arcontactus-close").removeClass("show-messageners-block"), a.find(".icons, .static").removeClass("hide"), a.find(".pulsation").removeClass("stop"), this.startAnimation(), this._popupOpened = !1, this.$element.trigger("arcontactus.closeMenu"))
  };
  d.prototype.openMenu = function() {
    if ("callback" == this.settings.mode) return console.log("Widget in callback mode"), !1;
    var a = this.$element;
    a.find(".messangers-block").hasClass(this.settings.menuInAnimationClass) ||
    (this.stopAnimation(), a.addClass("open"), a.find(".messangers-block").addClass(this.settings.menuInAnimationClass), a.find(".arcontactus-close").addClass("show-messageners-block"), a.find(".icons, .static").addClass("hide"), a.find(".pulsation").addClass("stop"), this._menuOpened = !0, this.$element.trigger("arcontactus.openMenu"))
  };
  d.prototype.closeMenu = function() {
    if ("callback" == this.settings.mode) return console.log("Widget in callback mode"), !1;
    var a = this.$element,
      c = this;
    a.find(".messangers-block").hasClass(this.settings.menuInAnimationClass) &&
    (setTimeout(function() {
      a.removeClass("open")
    }, 150), a.find(".messangers-block").removeClass(this.settings.menuInAnimationClass).addClass(this.settings.menuOutAnimationClass), setTimeout(function() {
      a.find(".messangers-block").removeClass(c.settings.menuOutAnimationClass)
    }, 1E3), a.find(".arcontactus-close").removeClass("show-messageners-block"), a.find(".icons, .static").removeClass("hide"), a.find(".pulsation").removeClass("stop"), this.startAnimation(), this._menuOpened = !1, this.$element.trigger("arcontactus.closeMenu"))
  };
  d.prototype.toggleMenu = function() {
    var a = this.$element;
    this.hidePrompt();
    if (a.find(".callback-countdown-block").hasClass("display-flex")) return !1;
    a.find(".messangers-block").hasClass(this.settings.menuInAnimationClass) ? this.closeMenu() : this.openMenu();
    this.$element.trigger("arcontactus.toggleMenu")
  };
  d.prototype.openCallbackPopup = function() {
    var a = this.$element;
    a.addClass("opened");
    this.closeMenu();
    this.stopAnimation();
    a.find(".icons, .static").addClass("hide");
    a.find(".pulsation").addClass("stop");
    a.find(".callback-countdown-block").addClass("display-flex");
    a.find(".callback-countdown-block-phone").addClass("display-flex");
    a.find(".callback-state").addClass("display-flex");
    this._callbackOpened = !0;
    this.$element.trigger("arcontactus.openCallbackPopup")
  };
  d.prototype.closeCallbackPopup = function() {
    var a = this.$element;
    a.removeClass("opened");
    a.find(".messangers-block").removeClass(this.settings.menuInAnimationClass);
    a.find(".arcontactus-close").removeClass("show-messageners-block");
    a.find(".icons, .static").removeClass("hide");
    a.find(".pulsation").removeClass("stop");
    a.find(".callback-countdown-block, .callback-countdown-block-phone, .callback-countdown-block-sorry, .callback-countdown-block-timer").removeClass("display-flex");
    a.find(".callback-state").removeClass("display-flex");
    this.startAnimation();
    this._callbackOpened = !1;
    this.$element.trigger("arcontactus.closeCallbackPopup")
  };
  d.prototype.startAnimation = function() {
    var a = this.$element,
      c = a.find(".icons-line"),
      b = a.find(".static"),
      d = a.find(".icons-line>span:first-child").width() +
        40;
    if ("huge" === this.settings.buttonSize) var h = 2,
      f = 0;
    "large" === this.settings.buttonSize && (h = 2, f = 0);
    "medium" === this.settings.buttonSize && (h = 4, f = -2);
    "small" === this.settings.buttonSize && (h = 4, f = -2);
    var g = a.find(".icons-line>span").length,
      k = 0;
    this.stopAnimation();
    if (0 === this.settings.iconsAnimationSpeed) return !1;
    var m = this;
    this._interval = setInterval(function() {
      0 === k && (c.parent().removeClass("hide"), b.addClass("hide"));
      var a = "translate(" + -(d * k + h) + "px, " + f + "px)";
      c.css({
        "-webkit-transform": a,
        "-ms-transform": a,
        transform: a
      });
      k++;
      if (k > g) {
        if (k > g + 1) {
          if (m.settings.iconsAnimationPause) return m.stopAnimation(), setTimeout(function() {
            if (m._callbackOpened || m._menuOpened || m._popupOpened) return !1;
            m.startAnimation()
          }, m.settings.iconsAnimationPause), !1;
          k = 0
        }
        c.parent().addClass("hide");
        b.removeClass("hide");
        a = "translate(" + -h + "px, " + f + "px)";
        c.css({
          "-webkit-transform": a,
          "-ms-transform": a,
          transform: a
        })
      }
    }, this.settings.iconsAnimationSpeed)
  };
  d.prototype.stopAnimation = function() {
    clearInterval(this._interval);
    var a = this.$element,
      b = a.find(".icons-line");
    a = a.find(".static");
    b.parent().addClass("hide");
    a.removeClass("hide");
    b.css({
      "-webkit-transform": "translate(-2px, 0px)",
      "-ms-transform": "translate(-2px, 0px)",
      transform: "translate(-2px, 0px)"
    })
  };
  d.prototype.showPrompt = function(a) {
    var b = this.$element.find(".arcontactus-prompt");
    a && a.content && b.find(".arcontactus-prompt-inner").html(a.content);
    b.addClass("active");
    this.$element.trigger("arcontactus.showPrompt")
  };
  d.prototype.hidePrompt = function() {
    this.$element.find(".arcontactus-prompt").removeClass("active");
    this.$element.trigger("arcontactus.hidePrompt")
  };
  d.prototype.showPromptTyping = function() {
    this.$element.find(".arcontactus-prompt").find(".arcontactus-prompt-inner").html("");
    this._insertPromptTyping();
    this.showPrompt({});
    this.$element.trigger("arcontactus.showPromptTyping")
  };
  d.prototype._insertPromptTyping = function() {
    var a = this.$element.find(".arcontactus-prompt-inner"),
      c = b("<div>", {
        class: "arcontactus-prompt-typing"
      }),
      d = b("<div>");
    c.append(d);
    c.append(d.clone());
    c.append(d.clone());
    a.append(c)
  };
  d.prototype.hidePromptTyping =
    function() {
      this.$element.find(".arcontactus-prompt").removeClass("active");
      this.$element.trigger("arcontactus.hidePromptTyping")
    };
  d.prototype._backgroundStyle = function() {
    return "background-color: " + this.settings.theme
  };
  d.prototype._colorStyle = function() {
    return "color: " + this.settings.theme
  };
  b.fn.contactUs = function(a) {
    var c = Array.prototype.slice.call(arguments, 1);
    return this.each(function() {
      var e = b(this),
        l = e.data("ar.contactus");
      l || (l = new d(this, "object" == typeof a && a), e.data("ar.contactus", l));
      "string" ==
      typeof a && "_" !== a.charAt(0) && l[a].apply(l, c)
    })
  };
  b.fn.contactUs.Constructor = d
})(jQuery);

! function(e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
}(function(e) {
  var t, n = navigator.userAgent,
    a = /iphone/i.test(n),
    i = /chrome/i.test(n),
    r = /android/i.test(n);
  e.mask = {
    definitions: {
      X: "[0-9]",
      a: "[A-Za-z]",
      "*": "[A-Za-z0-9]"
    },
    autoclear: !0,
    dataName: "rawMaskFn",
    placeholder: "_"
  }, e.fn.extend({
    caret: function(e, t) {
      var n;
      if (0 !== this.length && !this.is(":hidden")) return "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function() {
        this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && ((n = this.createTextRange()).collapse(!0), n.moveEnd("character", t), n.moveStart("character", e), n.select())
      })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (n = document.selection.createRange(), e = 0 - n.duplicate().moveStart("character", -1e5), t = e + n.text.length), {
        begin: e,
        end: t
      })
    },
    arCuUnmask: function() {
      return this.trigger("arCuUnmask")
    },
    arCuMask: function(n, o) {
      var c, l, u, f, s, h, g;
      if (!n && this.length > 0) {
        var m = e(this[0]).data(e.mask.dataName);
        return m ? m() : void 0
      }
      return o = e.extend({
        autoclear: e.mask.autoclear,
        placeholder: e.mask.placeholder,
        completed: null
      }, o), c = e.mask.definitions, l = [], u = h = n.length, f = null, e.each(n.split(""), function(e, t) {
        "?" == t ? (h--, u = e) : c[t] ? (l.push(new RegExp(c[t])), null === f && (f = l.length - 1), u > e && (s = l.length - 1)) : l.push(null)
      }), this.trigger("arCuUnmask").each(function() {
        function m() {
          if (o.completed) {
            for (var e = f; s >= e; e++)
              if (l[e] && R[e] === d(e)) return;
            o.completed.call(j)
          }
        }

        function d(e) {
          return o.placeholder.charAt(e < o.placeholder.length ? e : 0)
        }

        function p(e) {
          for (; ++e < h && !l[e];);
          return e
        }

        function v(e, t) {
          var n, a;
          if (!(0 > e)) {
            for (n = e, a = p(t); h > n; n++)
              if (l[n]) {
                if (!(h > a && l[n].test(R[a]))) break;
                R[n] = R[a], R[a] = d(a), a = p(a)
              }
            y(), j.caret(Math.max(f, e))
          }
        }

        function b() {
          x(), j.val() != A && j.change()
        }

        function k(e, t) {
          var n;
          for (n = e; t > n && h > n; n++) l[n] && (R[n] = d(n))
        }

        function y() {
          j.val(R.join(""))
        }

        function x(e) {
          var t, n, a, i = j.val(),
            r = -1;
          for (t = 0, a = 0; h > t; t++)
            if (l[t]) {
              for (R[t] = d(t); a++ < i.length;)
                if (n = i.charAt(a - 1), l[t].test(n)) {
                  R[t] = n, r = t;
                  break
                }
              if (a > i.length) {
                k(t + 1, h);
                break
              }
            } else R[t] === i.charAt(a) && a++, u > t && (r = t);
          return e ? y() : u > r + 1 ? o.autoclear || R.join("") === S ? (j.val() && j.val(""), k(0, h)) : y() : (y(), j.val(j.val().substring(0, r + 1))), u ? t : f
        }

        var j = e(this),
          R = e.map(n.split(""), function(e, t) {
            return "?" != e ? c[e] ? d(t) : e : void 0
          }),
          S = R.join(""),
          A = j.val();
        j.data(e.mask.dataName, function() {
          return e.map(R, function(e, t) {
            return l[t] && e != d(t) ? e : null
          }).join("")
        }), j.one("arCuUnmask", function() {
          j.off(".mask").removeData(e.mask.dataName)
        }).on("focus.mask", function() {
          var e;
          j.prop("readonly") || (clearTimeout(t), A = j.val(), e = x(), t = setTimeout(function() {
            j.get(0) === document.activeElement && (y(), e == n.replace("?", "").length ? j.caret(0, e) : j.caret(e))
          }, 10))
        }).on("blur.mask", b).on("keydown.mask", function(e) {
          if (!j.prop("readonly")) {
            var t, n, i, r = e.which || e.keyCode;
            g = j.val(), 8 === r || 46 === r || a && 127 === r ? (n = (t = j.caret()).begin, (i = t.end) - n == 0 && (n = 46 !== r ? function(e) {
              for (; --e >= 0 && !l[e];);
              return e
            }(n) : i = p(n - 1), i = 46 === r ? p(i) : i), k(n, i), v(n, i - 1), e.preventDefault()) : 13 === r ? b.call(this, e) : 27 === r && (j.val(A), j.caret(0, x()), e.preventDefault())
          }
        }).on("keypress.mask", function(t) {
          if (!j.prop("readonly")) {
            var n, a, i, o = t.which || t.keyCode,
              c = j.caret();
            t.ctrlKey || t.altKey || t.metaKey || 32 > o || !o || 13 === o || (c.end - c.begin != 0 && (k(c.begin, c.end), v(c.begin, c.end - 1)), n = p(c.begin - 1), h > n && (a = String.fromCharCode(o), l[n].test(a)) && (function(e) {
              var t, n, a, i;
              for (t = e, n = d(e); h > t; t++)
                if (l[t]) {
                  if (a = p(t), i = R[t], R[t] = n, !(h > a && l[a].test(i))) break;
                  n = i
                }
            }(n), R[n] = a, y(), i = p(n), r ? setTimeout(function() {
              e.proxy(e.fn.caret, j, i)()
            }, 0) : j.caret(i), c.begin <= s && m()), t.preventDefault())
          }
        }).on("input.mask paste.mask", function() {
          j.prop("readonly") || setTimeout(function() {
            var e = x(!0);
            j.caret(e), m()
          }, 0)
        }), i && r && j.off("input.mask").on("input.mask", function() {
          var e = j.val(),
            t = j.caret();
          if (g && g.length && g.length > e.length) {
            for (x(!0); t.begin > 0 && !l[t.begin - 1];) t.begin--;
            if (0 === t.begin)
              for (; t.begin < f && !l[t.begin];) t.begin++;
            j.caret(t.begin, t.begin)
          } else {
            for (x(!0); t.begin < h && !l[t.begin];) t.begin++;
            j.caret(t.begin, t.begin)
          }
          m()
        }), x()
      })
    }
  })
});

/* ----- CUSTOM ----- */
//<![CDATA[
var zaloWidgetInterval;
var tawkToInterval;
var skypeWidgetInterval;
var lcpWidgetInterval;
var closePopupTimeout;
var lzWidgetInterval;
var arcuOptions;
var arCuMessages = [
  "Xin chào",
  "Bạn có thắc mắc gì không?",
  "Tôi có thể giúp gì cho bạn?"
];
var arCuLoop = false;
var arCuCloseLastMessage = false;
var arCuPromptClosed = false;
var _arCuTimeOut = null;
var arCuDelayFirst = 2000;
var arCuTypingTime = 2000;
var arCuMessageTime = 4000;
var arCuClosedCookie = 0;
var arcItems = [];
var Tawk_API = Tawk_API || {};
var Tawk_LoadStart = new Date();

window.addEventListener('load', function() {
  jQuery('#arcontactus').remove();
  var $arcuWidget = jQuery('<div>', {
    id: 'arcontactus'
  });
  jQuery('body').append($arcuWidget);
  arCuClosedCookie = arCuGetCookie('arcumenu-closed');

  jQuery('#arcontactus').on('arcontactus.init', function() {
    jQuery.mask.definitions['#'] = "[0-9]";
    jQuery('#arcontactus .arcu-field-phone').arCuMask('+XXX-XX-XXX-XX-XX');
    if (arCuClosedCookie) {
      return false;
    }
    arCuShowMessages();
  });

  jQuery('#arcontactus').on('arcontactus.closeMenu', function() {
    arCuCreateCookie('arcumenu-closed', 1, 1);
  });

  jQuery('#arcontactus').on('arcontactus.openMenu', function() {
    clearTimeout(_arCuTimeOut);
    if (!arCuPromptClosed) {
      arCuPromptClosed = true;
      jQuery('#arcontactus').contactUs('hidePrompt');
    }
  });

  jQuery('#arcontactus').on('arcontactus.openCallbackPopup', function() {
    clearTimeout(_arCuTimeOut);
    if (!arCuPromptClosed) {
      arCuPromptClosed = true;
      jQuery('#arcontactus').contactUs('hidePrompt');
    }
  });

  jQuery('#arcontactus').on('arcontactus.hidePrompt', function() {
    clearTimeout(_arCuTimeOut);
    if (arCuClosedCookie != "1") {
      arCuClosedCookie = "1";
    }
  });

  jQuery('#arcontactus').on('arcontactus.successCallbackRequest', function() {
    closePopupTimeout = setTimeout(function() {
      jQuery('#arcontactus').contactUs('closeCallbackPopup');
    }, 10000);
  });

  jQuery('#arcontactus').on('arcontactus.closeCallbackPopup', function() {
    clearTimeout(closePopupTimeout);
  });

  if (enableMessenger) {
    if (isMobileRequest == true || enableFacebookSDK == 'false') {
      var arcItem = {};
      arcItem.id = 'msg-item-1';
      arcItem.onClick = function(e) {
        ga('send', 'event', 'contact', 'click', 'Facebook link');
      }
      arcItem.class = 'msg-item-facebook-messenger';
      arcItem.title = "Messenger";
      //arcItem.subTitle = "";
      arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 32C15.9 32-77.5 278 84.6 400.6V480l75.7-42c142.2 39.8 285.4-59.9 285.4-198.7C445.8 124.8 346.5 32 224 32zm23.4 278.1L190 250.5 79.6 311.6l121.1-128.5 57.4 59.6 110.4-61.1-121.1 128.5z"></path></svg>';
      arcItem.href = fbMesgURL;
      arcItem.color = '#0084FF';
      arcItems.push(arcItem);
    } else {
      var arcItem = {};
      arcItem.id = 'msg-item-2';
      arcItem.onClick = function(e) {
        e.preventDefault();
        jQuery('#arcontactus').contactUs('closeMenu');
        if (typeof FB == 'undefined' || typeof FB.CustomerChat == 'undefined') {
          console.warn('Facebook customer chat integration is disabled in module configuration');
          return false;
        }
        jQuery('#arcontactus').contactUs('hide');
        jQuery('#alotool-fb-chat').addClass('active');
        FB.CustomerChat.show();
        FB.CustomerChat.showDialog();
        ga('send', 'event', 'contact', 'click', 'Facebook link');
      }
      arcItem.class = 'msg-item-facebook-messenger';
      arcItem.title = "Messenger";
      //arcItem.subTitle = "";
      arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 32C15.9 32-77.5 278 84.6 400.6V480l75.7-42c142.2 39.8 285.4-59.9 285.4-198.7C445.8 124.8 346.5 32 224 32zm23.4 278.1L190 250.5 79.6 311.6l121.1-128.5 57.4 59.6 110.4-61.1-121.1 128.5z"></path></svg>';
      arcItem.color = '#0084FF';
      arcItems.push(arcItem);
    }
  }

  if (enableWhatsApp) {
    var arcItem = {};
    arcItem.id = 'msg-item-3';
    arcItem.onClick = function(e) {
      ga('send', 'event', 'contact', 'click', 'WhatsApp');
    }
    arcItem.class = 'msg-item-whatsapp';
    arcItem.title = "Whatsapp";
    //arcItem.subTitle = "";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>';
    arcItem.href = 'https://web.whatsapp.com/send?l=' + language + '&phone=' + phone;
    arcItem.color = '#25D366';
    arcItems.push(arcItem);
  }

  if (enableViber) {
    var arcItem = {};
    arcItem.id = 'msg-item-4';
    arcItem.class = 'msg-item-viber';
    arcItem.title = "Viber";
    //arcItem.subTitle = "";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M444 49.9C431.3 38.2 379.9.9 265.3.4c0 0-135.1-8.1-200.9 52.3C27.8 89.3 14.9 143 13.5 209.5c-1.4 66.5-3.1 191.1 117 224.9h.1l-.1 51.6s-.8 20.9 13 25.1c16.6 5.2 26.4-10.7 42.3-27.8 8.7-9.4 20.7-23.2 29.8-33.7 82.2 6.9 145.3-8.9 152.5-11.2 16.6-5.4 110.5-17.4 125.7-142 15.8-128.6-7.6-209.8-49.8-246.5zM457.9 287c-12.9 104-89 110.6-103 115.1-6 1.9-61.5 15.7-131.2 11.2 0 0-52 62.7-68.2 79-5.3 5.3-11.1 4.8-11-5.7 0-6.9.4-85.7.4-85.7-.1 0-.1 0 0 0-101.8-28.2-95.8-134.3-94.7-189.8 1.1-55.5 11.6-101 42.6-131.6 55.7-50.5 170.4-43 170.4-43 96.9.4 143.3 29.6 154.1 39.4 35.7 30.6 53.9 103.8 40.6 211.1zm-139-80.8c.4 8.6-12.5 9.2-12.9.6-1.1-22-11.4-32.7-32.6-33.9-8.6-.5-7.8-13.4.7-12.9 27.9 1.5 43.4 17.5 44.8 46.2zm20.3 11.3c1-42.4-25.5-75.6-75.8-79.3-8.5-.6-7.6-13.5.9-12.9 58 4.2 88.9 44.1 87.8 92.5-.1 8.6-13.1 8.2-12.9-.3zm47 13.4c.1 8.6-12.9 8.7-12.9.1-.6-81.5-54.9-125.9-120.8-126.4-8.5-.1-8.5-12.9 0-12.9 73.7.5 133 51.4 133.7 139.2zM374.9 329v.2c-10.8 19-31 40-51.8 33.3l-.2-.3c-21.1-5.9-70.8-31.5-102.2-56.5-16.2-12.8-31-27.9-42.4-42.4-10.3-12.9-20.7-28.2-30.8-46.6-21.3-38.5-26-55.7-26-55.7-6.7-20.8 14.2-41 33.3-51.8h.2c9.2-4.8 18-3.2 23.9 3.9 0 0 12.4 14.8 17.7 22.1 5 6.8 11.7 17.7 15.2 23.8 6.1 10.9 2.3 22-3.7 26.6l-12 9.6c-6.1 4.9-5.3 14-5.3 14s17.8 67.3 84.3 84.3c0 0 9.1.8 14-5.3l9.6-12c4.6-6 15.7-9.8 26.6-3.7 14.7 8.3 33.4 21.2 45.8 32.9 7 5.7 8.6 14.4 3.8 23.6z"></path></svg>';
    arcItem.href = 'viber://chat?number=' + phone;
    arcItem.target = '_self';
    arcItem.color = '#8F5DB7';
    arcItems.push(arcItem);
  }

  if (enableSkype) {
    var arcItem = {};
    arcItem.id = 'msg-item-5';
    arcItem.class = 'msg-item-skype';
    arcItem.title = "Skype";
    //arcItem.subTitle = "";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.7 299.8c2.9-14 4.7-28.9 4.7-43.8 0-113.5-91.9-205.3-205.3-205.3-14.9 0-29.7 1.7-43.8 4.7C161.3 40.7 137.7 32 112 32 50.2 32 0 82.2 0 144c0 25.7 8.7 49.3 23.3 68.2-2.9 14-4.7 28.9-4.7 43.8 0 113.5 91.9 205.3 205.3 205.3 14.9 0 29.7-1.7 43.8-4.7 19 14.6 42.6 23.3 68.2 23.3 61.8 0 112-50.2 112-112 .1-25.6-8.6-49.2-23.2-68.1zm-194.6 91.5c-65.6 0-120.5-29.2-120.5-65 0-16 9-30.6 29.5-30.6 31.2 0 34.1 44.9 88.1 44.9 25.7 0 42.3-11.4 42.3-26.3 0-18.7-16-21.6-42-28-62.5-15.4-117.8-22-117.8-87.2 0-59.2 58.6-81.1 109.1-81.1 55.1 0 110.8 21.9 110.8 55.4 0 16.9-11.4 31.8-30.3 31.8-28.3 0-29.2-33.5-75-33.5-25.7 0-42 7-42 22.5 0 19.8 20.8 21.8 69.1 33 41.4 9.3 90.7 26.8 90.7 77.6 0 59.1-57.1 86.5-112 86.5z"></path></svg>';
    arcItem.href = 'skype:' + skypeName + '?chat';
    arcItem.target = '_self';
    arcItem.color = '#00AFF0';
    arcItems.push(arcItem);
  }

  if (enableEmail) {
    var arcItem = {};
    arcItem.id = 'msg-item-6';
    arcItem.class = 'msg-item-envelope';
    arcItem.title = "Email";
    //arcItem.subTitle = "";
    arcItem.icon = '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h416c8.8 0 16 7.2 16 16v41.4c-21.9 18.5-53.2 44-150.6 121.3-16.9 13.4-50.2 45.7-73.4 45.3-23.2.4-56.6-31.9-73.4-45.3C85.2 197.4 53.9 171.9 32 153.4V112c0-8.8 7.2-16 16-16zm416 320H48c-8.8 0-16-7.2-16-16V195c22.8 18.7 58.8 47.6 130.7 104.7 20.5 16.4 56.7 52.5 93.3 52.3 36.4.3 72.3-35.5 93.3-52.3 71.9-57.1 107.9-86 130.7-104.7v205c0 8.8-7.2 16-16 16z"></path></svg>';
    arcItem.href = 'mailto:' + mailto;
    arcItem.color = '#FF643A';
    arcItems.push(arcItem);
  }

  if (enableLiveChat) {
    var arcItem = {};
    arcItem.id = 'msg-item-7';
    arcItem.onClick = function(e) {
      e.preventDefault();
      jQuery('#arcontactus').contactUs('closeMenu');
      if (typeof lh_inst == 'undefined') {
        console.warn('Live Helper Chat integration is disabled in module configuration');
        return false;
      }
      jQuery('#arcontactus').contactUs('hide');
      lh_inst.lh_openchatWindow();
    }
    arcItem.class = 'msg-item-comments-light';
    arcItem.title = "LiveChat";
    //arcItem.subTitle = "";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.4 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.1 2.1 18.4 3.7 28 4.8 31.5 57.5 105.5 98 191.8 98 20.8 0 40.8-2.4 59.8-6.8 28.5 18.5 71.6 38.8 125.2 38.8 9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.5-.4-22.6-24.2-37.9-54.9zM142.2 311l-11.4 7.4c-20.1 13.1-50.5 28.2-87.7 32.5 8.8-11.3 20.2-27.6 29.5-46.4L83 283.7l-16.5-16.3C50.7 251.9 32 226.2 32 192c0-70.6 79-128 176-128s176 57.4 176 128-79 128-176 128c-17.7 0-35.4-2-52.6-6l-13.2-3zm303 103.4l-11.4-7.4-13.2 3.1c-17.2 4-34.9 6-52.6 6-65.1 0-122-25.9-152.4-64.3C326.9 348.6 416 278.4 416 192c0-9.5-1.3-18.7-3.3-27.7C488.1 178.8 544 228.7 544 288c0 34.2-18.7 59.9-34.5 75.4L493 379.7l10.3 20.7c9.4 18.9 20.8 35.2 29.5 46.4-37.1-4.2-67.5-19.4-87.6-32.4zm-37.8-267.7c.1.2.1.4.2.6-.1-.2-.1-.4-.2-.6z"></path></svg>';
    arcItem.color = '#A14F62';
    arcItems.push(arcItem);
  }

  if (enableTawkTo) {
    var arcItem = {};
    arcItem.id = 'msg-item-8';
    arcItem.onClick = function(e) {
      e.preventDefault();
      jQuery('#arcontactus').contactUs('closeMenu');
      if (typeof Tawk_API == 'undefined') {
        console.warn('Tawk.to integration is disabled in module configuration');
        return false;
      }
      jQuery('#arcontactus').contactUs('hide');
      Tawk_API.showWidget();
      Tawk_API.maximize();
      tawkToInterval = setInterval(function() {
        checkTawkIsOpened();
      }, 100);
    }
    arcItem.class = 'msg-item-comments-alt-light';
    arcItem.title = "Tawk.to";
    //arcItem.subTitle = "";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M512 160h-96V64c0-35.3-28.7-64-64-64H64C28.7 0 0 28.7 0 64v160c0 35.3 28.7 64 64 64h32v52c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L224 288h128c35.3 0 64-28.7 64-64v-32h96c17.6 0 32 14.4 32 32v160c0 17.6-14.4 32-32 32h-64v49.6l-80.2-45.4-7.3-4.2H256c-17.6 0-32-14.4-32-32v-96l-32 18.1V384c0 35.3 28.7 64 64 64h96l108.9 61.6c2.2 1.6 4.7 2.4 7.1 2.4 6.2 0 12-4.9 12-12v-52h32c35.3 0 64-28.7 64-64V224c0-35.3-28.7-64-64-64zm-128 64c0 17.6-14.4 32-32 32H215.6l-7.3 4.2-80.3 45.4V256H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h288c17.6 0 32 14.4 32 32v160z"></path></svg>';
    arcItem.color = '#CA2CAF';
    arcItems.push(arcItem);
  }

  if (enablePopupExample) {
    var arcItem = {};
    arcItem.id = 'msg-item-9';
    arcItem.href = '_popup';
    arcItem.popupContent = jQuery('#arcu-popup-content-msg-item-20').html();
    jQuery('#arcu-popup-content-msg-item-20').remove();
    arcItem.class = 'msg-item-<i class="fas fa-info"></i>';
    arcItem.title = "Popup";
    //arcItem.subTitle = "";
    arcItem.icon = '<i class="fas fa-info"></i>';
    arcItem.color = '#A73C21';
    arcItems.push(arcItem);
    jQuery('#arcontactus').on('arcontactus.successCallbackRequest', function() {
      ga('send', 'event', 'contact', 'click', 'CallBack request');
    });
  }

  if (enableCallBackRequest) {
    var arcItem = {};
    arcItem.id = 'msg-item-9';
    arcItem.onClick = function(e) {
      ga('send', 'event', 'contact', 'click', 'CallBack request');
    }
    arcItem.class = 'msg-item-phone';
    arcItem.title = "Callback request";
    //arcItem.subTitle = "";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path></svg>';
    arcItem.href = 'callback';
    arcItem.color = '#4EB625';
    arcItems.push(arcItem);
  }

  if (enableZoho) {
    var arcItem = {};
    arcItem.id = 'msg-item-11';
    arcItem.onClick = function(e) {
      e.preventDefault();
      jQuery('#arcontactus').contactUs('closeMenu');
      if (typeof $zoho == 'undefined') {
        console.warn('Zoho SalesIQ integration is disabled in module configuration');
        return false;
      }
      jQuery('#arcontactus').contactUs('hide');
      $zoho.salesiq.floatwindow.visible('show');
    }
    arcItem.class = 'msg-item-comment-alt-smile-solid';
    arcItem.title = "Zoho SalesIQ";
    //arcItem.subTitle = "";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zM320 133.2c14.8 0 26.8 12 26.8 26.8s-12 26.8-26.8 26.8-26.8-12-26.8-26.8 12-26.8 26.8-26.8zm-128 0c14.8 0 26.8 12 26.8 26.8s-12 26.8-26.8 26.8-26.8-12-26.8-26.8 12-26.8 26.8-26.8zm164.2 140.9C331.3 303.3 294.8 320 256 320c-38.8 0-75.3-16.7-100.2-45.9-5.8-6.7-5-16.8 1.8-22.5 6.7-5.7 16.8-5 22.5 1.8 18.8 22 46.5 34.6 75.8 34.6 29.4 0 57-12.6 75.8-34.7 5.8-6.7 15.9-7.5 22.6-1.8 6.8 5.8 7.6 15.9 1.9 22.6z"></path></svg>';
    arcItem.color = '#A4C639';
    arcItems.push(arcItem);
  }

  if (enableZalo) {
    var arcItem = {};
    arcItem.id = 'msg-item-12';
    arcItem.class = 'msg-item-telegram-plane';
    arcItem.title = 'Zalo Chat';
    //arcItem.subTitle = "";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97.4 87.2"><path fill="currentColor" d="M78.4,42c-1.4,0-2.4,0.6-3.2,1.7c-0.7,1-1,2.2-1,3.7c0,1.5,0.3,2.7,1,3.7c0.8,1.2,1.8,1.7,3.2,1.7 c1.4,0,2.5-0.6,3.2-1.7c0.7-1,1-2.2,1-3.7c0-1.4-0.3-2.6-1-3.6C80.8,42.6,79.7,42,78.4,42z"></path><path fill="currentColor" d="M48.8,0C21.9,0,0,19.5,0,43.6c0,11.9,5.4,22.7,14,30.6c2.2,2-5.4,10.5-9,11.3c10.4,2.9,20.7-3.4,23.2-2.4 c6.2,2.6,13.2,4,20.5,4c26.9,0,48.7-19.5,48.7-43.6C97.5,19.5,75.7,0,48.8,0z M27.8,58.2H14.6c-3.1,0-4.6-1.1-4.6-3.3 c0-1,0.6-2.4,1.8-4l11.8-15.6h-8.5c-3.1,0-4.7-1-4.7-3c0-2,1.6-3,4.7-3h11.2c3.8,0,5.7,1.1,5.7,3.2c0,1-0.6,2.3-1.9,4L18.5,52.2 h9.3c3.1,0,4.7,1,4.7,3C32.5,57.2,30.9,58.2,27.8,58.2z M54.9,53.8c0,3.1-1.1,4.7-3.2,4.7c-1.4,0-2.4-0.7-3.1-2.2 c-1.3,1.6-3.1,2.4-5.4,2.4c-2.9,0-5.3-1.2-7.2-3.5c-1.7-2.2-2.5-4.8-2.5-7.8c0-3,0.9-5.6,2.7-7.8c1.9-2.3,4.3-3.5,7.3-3.5 c2.2,0,3.9,0.8,5.1,2.3c0.7-1.4,1.8-2,3.1-2c2.1,0,3.2,1.5,3.2,4.6V53.8z M64.7,53.8c0,3.1-1.1,4.7-3.2,4.7c-2.1,0-3.2-1.6-3.2-4.7 V31.9c0-3.1,1.1-4.7,3.2-4.7c2.1,0,3.2,1.6,3.2,4.7V53.8z M78.4,58.9c-3.2,0-5.9-1.1-7.9-3.3c-2-2.2-3-4.9-3-8.1s1-6,3-8.1 c2-2.2,4.7-3.3,7.9-3.3c3.3,0,5.9,1.1,7.9,3.3c1.9,2.1,2.9,4.9,2.9,8.1s-1,6-2.9,8.1C84.2,57.8,81.6,58.9,78.4,58.9z"></path><path fill="currentColor" d="M44.4,42.2c-1.3,0-2.4,0.5-3.1,1.6c-0.7,1-1,2.1-1,3.5c0,1.4,0.3,2.6,1,3.6c0.8,1.1,1.8,1.7,3.2,1.7 c1.3,0,2.4-0.6,3.1-1.7c0.6-1,1-2.2,1-3.6c0-1.4-0.3-2.5-1-3.5C46.7,42.8,45.7,42.2,44.4,42.2z"></path></svg>';
    arcItem.href = 'https://zalo.me/' + zalo;
    arcItem.color = '#018FE5';
    arcItems.push(arcItem);
  }

  if (enableTelegram) {
    var arcItem = {};
    arcItem.id = 'msg-item-13';
    arcItem.class = 'msg-item-telegram-plane';
    arcItem.title = 'Telegram';
    //arcItem.subTitle = "";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path></svg>';
    arcItem.href = 'https://zalo.me/' + zalo;
    arcItem.color = '#1EBEA5';
    arcItems.push(arcItem);
  }

  if (enableSMS) {
    var arcItem = {};
    arcItem.id = 'msg-item-14';
    arcItem.class = 'msg-item-sms';
    arcItem.title = 'SMS';
    //arcItem.subTitle = "";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/></svg>';
    arcItem.href = 'sms:' + phone;
    arcItem.color = '#4EB625';
    arcItems.push(arcItem);
  }

  if (enablePhone) {
    var arcItem = {};
    arcItem.id = 'msg-item-15';
    arcItem.class = 'msg-item-phone';
    arcItem.title = 'Phone';
    //arcItem.subTitle = "";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path></svg>';
    arcItem.href = 'tel:' + phone;
    arcItem.color = '#4EB625';
    arcItems.push(arcItem);
  }

  arcuOptions = {
    wordpressPluginVersion: '1.7.9',
    buttonIcon: '<svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Canvas" transform="translate(-825 -308)"><g id="Vector"><use xlink:href="#path0_fill0123" transform="translate(825 308)" fill="currentColor"></use></g></g><defs><path id="path0_fill0123" d="M 19 4L 17 4L 17 13L 4 13L 4 15C 4 15.55 4.45 16 5 16L 16 16L 20 20L 20 5C 20 4.45 19.55 4 19 4ZM 15 10L 15 1C 15 0.45 14.55 0 14 0L 1 0C 0.45 0 0 0.45 0 1L 0 15L 4 11L 14 11C 14.55 11 15 10.55 15 10Z"></path></defs></svg>',
    drag: false,
    mode: 'regular',
    buttonIconUrl: 'https://wp496.areama.net/wp-content/plugins/ar-contactus/res/img/msg.svg',
    showMenuHeader: false,
    menuHeaderText: "Need help? Contact us!",
    showHeaderCloseBtn: true,
    headerCloseBtnBgColor: '#008749',
    headerCloseBtnColor: '#FFFFFF',
    itemsIconType: 'rounded',
    align: 'right',
    reCaptcha: false,
    reCaptchaKey: '',
    countdown: 0,
    theme: '#00aeef',
    buttonText: "Liên hệ",
    buttonSize: 'small', //(large|medium|small)
    menuSize: 'small', //(large|small)
    phonePlaceholder: '+XXX-XX-XXX-XX-XX',
    callbackSubmitText: 'Waiting for call',
    errorMessage: 'Connection error. Please refresh the page and try again.',
    callProcessText: 'We are calling you to phone',
    callSuccessText: 'Thank you.<br />We are call you back soon.',
    iconsAnimationSpeed: 1000,
    iconsAnimationPause: 0,
    callbackFormText: 'Please enter your phone number<br />and we call you back soon',
    items: arcItems,
    ajaxUrl: 'https://wp496.areama.net/wp-admin/admin-ajax.php',
    promptPosition: 'left', //(top|left)
    callbackFormFields: {
      name: {
        name: "name",
        enabled: !0,
        required: !0,
        type: "text",
        label: "Please enter your name",
        placeholder: "Your full name"
      },
      email: {
        name: "email",
        enabled: !0,
        required: !1,
        type: "email",
        label: "Enter your email address",
        placeholder: "Optional field. Example: email@domain.com"
      },
      time: {
        name: "time",
        enabled: !0,
        required: !1,
        type: "dropdown",
        label: "Please choose schedule time",
        values: [{
          value: "asap",
          label: "Call me ASAP"
        },
          "00:00",
          "01:00",
          "02:00",
          "03:00",
          "04:00",
          "05:00",
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00"
        ]
      },
      phone: {
        name: "phone",
        enabled: !0,
        required: !0,
        type: "tel",
        label: "Please enter your phone number",
        placeholder: "+X-XXX-XXX-XX-XX"
      },
      description: {
        name: "description",
        enabled: !0,
        required: !1,
        type: "textarea",
        label: "Please leave a message with your request"
      }
    },
    action: 'arcontactus_request_callback'
  };
  jQuery('#arcontactus').contactUs(arcuOptions);

  Tawk_API.onLoad = function() {
    if (enableTawkTo) {
      if (!Tawk_API.isChatOngoing()) {
        Tawk_API.hideWidget();
      } else {
        jQuery('#arcontactus').contactUs('hide');
      }
    }
  };

  Tawk_API.onChatMinimized = function() {
    if (enableTawkTo) {
      Tawk_API.hideWidget();
      setTimeout(function() {
        Tawk_API.hideWidget();
      }, 100);
      jQuery('#arcontactus').contactUs('show');
    }
  };

  Tawk_API.onChatEnded = function() {
    if (enableTawkTo) {
      Tawk_API.hideWidget();
      jQuery('#arcontactus').contactUs('show');
    }
  };

  (function() {
    if (enableTawkTo) {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/5c583e196cb1ff3c14cb0b4f/default';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    }
  })();
  if (typeof FB == 'undefined' || typeof FB.CustomerChat == 'undefined') {
    console.warn('Facebook customer chat integration is disabled in module configuration');
  } else {
    FB.Event.subscribe('customerchat.dialogHide', function() {
      jQuery('#alotool-fb-chat').removeClass('active');
      jQuery('#arcontactus').contactUs('show');
    });

    FB.Event.subscribe('customerchat.dialogShow', function() {
      jQuery('#alotool-fb-chat').addClass('active');
      jQuery('#arcontactus').contactUs('hide');
    });
  }

  if (enableLiveChat) {
    lh_inst.chatClosedCallback = function() {
      jQuery('#arcontactus').contactUs('show');
      clearInterval(LHCInterval);
    };

    lh_inst.chatOpenedCallback = function() {
      jQuery('#arcontactus').contactUs('hide');
      LHCInterval = setInterval(function() {
        checkLHCisOpened();
      }, 100);
    };
  }

  ga('create', 'UA-28021323-7', 'auto');
});

function checkTawkIsOpened() {
  if (enableTawkTo) {
    if (Tawk_API.isChatMinimized()) {
      Tawk_API.hideWidget();
      jQuery('#arcontactus').contactUs('show');
      clearInterval(tawkToInterval);
    }
  }
};

var LHCChatOptions = {};
var LHCInterval = null;
LHCChatOptions.opt = {
  widget_height: 190,
  widget_width: 300,
  popup_height: 500,
  popup_width: 500
};

(function() {
  if (enableLiveChat) {
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    var refferer = (document.referrer) ? encodeURIComponent(document.referrer.substr(document.referrer.indexOf('://') + 1)) : '';
    var location = (document.location) ? encodeURIComponent(window.location.href.substring(window.location.protocol.length)) : '';
    po.src = '//clients.livehelperchat.com//chat/getstatus/(click)/internal/(ma)/br/(position)/bottom_right/(check_operator_messages)/true/(top)/350/(units)/pixels?r=' + refferer + '&l=' + location;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
  }
})();

function checkLHCisOpened() {
  if (enableLiveChat) {
    if (lh_inst.isMinimized) {
      jQuery('#arcontactus').contactUs('show');
      lh_inst.isMinimized = false;
      clearInterval(LHCInterval);
    }
  }
};

if (enableZoho) {
  var $zoho = $zoho || {};
  $zoho.salesiq = $zoho.salesiq || {
    widgetcode: "b2a99ecc2a580a9bd1c14a4ed7f228133025108d46c98f17e984e170ee763119",
    values: {},
    ready: function() {}
  };
  var d = document;
  s = d.createElement("script");
  s.type = "text/javascript";
  s.id = "zsiqscript";
  s.defer = true;
  s.src = "https://salesiq.zoho.eu/widget";
  t = d.getElementsByTagName("script")[0];
  t.parentNode.insertBefore(s, t);
  d.write("<div id='zsiqwidget'></div>");
  $zoho.salesiq.ready = function() {
    $zoho.salesiq.floatbutton.visible("hide");
    $zoho.salesiq.floatwindow.minimize(function() {
      jQuery('#arcontactus').contactUs('show');
    });
    $zoho.salesiq.floatwindow.close(function() {
      jQuery('#arcontactus').contactUs('show');
    });
  };
}
//]]>
