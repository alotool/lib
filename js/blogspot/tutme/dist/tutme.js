//<![CDATA[
/*! Sticky-sidebar|v1.7.0|https://github.com/WeCodePixels/theia-sticky-sidebar */(function($){$.fn.theiaStickySidebar=function(options){var defaults={'containerSelector':'','additionalMarginTop':0,'additionalMarginBottom':0,'updateSidebarHeight':true,'minWidth':0,'disableOnResponsiveLayouts':true,'sidebarBehavior':'modern','defaultPosition':'relative','namespace':'TSS'};options=$.extend(defaults,options);options.additionalMarginTop=parseInt(options.additionalMarginTop)||0;options.additionalMarginBottom=parseInt(options.additionalMarginBottom)||0;tryInitOrHookIntoEvents(options,this);function tryInitOrHookIntoEvents(options,$that){var success=tryInit(options,$that);if(!success){console.log('TSS: Body width smaller than options.minWidth. Init is delayed.');$(document).on('scroll.'+options.namespace,function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that));$(window).on('resize.'+options.namespace,function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that))}}function tryInit(options,$that){if(options.initialized===true){return true}if($('body').width()<options.minWidth){return false}init(options,$that);return true}function init(options,$that){options.initialized=true;var existingStylesheet=$('#theia-sticky-sidebar-stylesheet-'+options.namespace);if(existingStylesheet.length===0){$('head').append($('<style id="theia-sticky-sidebar-stylesheet-'+options.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'))}$that.each(function(){var o={};o.sidebar=$(this);o.options=options||{};o.container=$(o.options.containerSelector);if(o.container.length==0){o.container=o.sidebar.parent()}o.sidebar.parents().css('-webkit-transform','none');o.sidebar.css({'position':o.options.defaultPosition,'overflow':'visible','-webkit-box-sizing':'border-box','-moz-box-sizing':'border-box','box-sizing':'border-box'});o.stickySidebar=o.sidebar.find('.theiaStickySidebar');if(o.stickySidebar.length==0){var javaScriptMIMETypes=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;o.sidebar.find('script').filter(function(index,script){return script.type.length===0||script.type.match(javaScriptMIMETypes)}).remove();o.stickySidebar=$('<div>').addClass('theiaStickySidebar').append(o.sidebar.children());o.sidebar.append(o.stickySidebar)}o.marginBottom=parseInt(o.sidebar.css('margin-bottom'));o.paddingTop=parseInt(o.sidebar.css('padding-top'));o.paddingBottom=parseInt(o.sidebar.css('padding-bottom'));var collapsedTopHeight=o.stickySidebar.offset().top;var collapsedBottomHeight=o.stickySidebar.outerHeight();o.stickySidebar.css('padding-top',1);o.stickySidebar.css('padding-bottom',1);collapsedTopHeight-=o.stickySidebar.offset().top;collapsedBottomHeight=o.stickySidebar.outerHeight()-collapsedBottomHeight-collapsedTopHeight;if(collapsedTopHeight==0){o.stickySidebar.css('padding-top',0);o.stickySidebarPaddingTop=0}else{o.stickySidebarPaddingTop=1}if(collapsedBottomHeight==0){o.stickySidebar.css('padding-bottom',0);o.stickySidebarPaddingBottom=0}else{o.stickySidebarPaddingBottom=1}o.previousScrollTop=null;o.fixedScrollTop=0;resetSidebar();o.onScroll=function(o){if(!o.stickySidebar.is(":visible")){return}if($('body').width()<o.options.minWidth){resetSidebar();return}if(o.options.disableOnResponsiveLayouts){var sidebarWidth=o.sidebar.outerWidth(o.sidebar.css('float')=='none');if(sidebarWidth+50>o.container.width()){resetSidebar();return}}var scrollTop=$(document).scrollTop();var position='static';if(scrollTop>=o.sidebar.offset().top+(o.paddingTop-o.options.additionalMarginTop)){var offsetTop=o.paddingTop+options.additionalMarginTop;var offsetBottom=o.paddingBottom+o.marginBottom+options.additionalMarginBottom;var containerTop=o.sidebar.offset().top;var containerBottom=o.sidebar.offset().top+getClearedHeight(o.container);var windowOffsetTop=0+options.additionalMarginTop;var windowOffsetBottom;var sidebarSmallerThanWindow=(o.stickySidebar.outerHeight()+offsetTop+offsetBottom)<$(window).height();if(sidebarSmallerThanWindow){windowOffsetBottom=windowOffsetTop+o.stickySidebar.outerHeight()}else{windowOffsetBottom=$(window).height()-o.marginBottom-o.paddingBottom-options.additionalMarginBottom}var staticLimitTop=containerTop-scrollTop+o.paddingTop;var staticLimitBottom=containerBottom-scrollTop-o.paddingBottom-o.marginBottom;var top=o.stickySidebar.offset().top-scrollTop;var scrollTopDiff=o.previousScrollTop-scrollTop;if(o.stickySidebar.css('position')=='fixed'){if(o.options.sidebarBehavior=='modern'){top+=scrollTopDiff}}if(o.options.sidebarBehavior=='stick-to-top'){top=options.additionalMarginTop}if(o.options.sidebarBehavior=='stick-to-bottom'){top=windowOffsetBottom-o.stickySidebar.outerHeight()}if(scrollTopDiff>0){top=Math.min(top,windowOffsetTop)}else{top=Math.max(top,windowOffsetBottom-o.stickySidebar.outerHeight())}top=Math.max(top,staticLimitTop);top=Math.min(top,staticLimitBottom-o.stickySidebar.outerHeight());var sidebarSameHeightAsContainer=o.container.height()==o.stickySidebar.outerHeight();if(!sidebarSameHeightAsContainer&&top==windowOffsetTop){position='fixed'}else if(!sidebarSameHeightAsContainer&&top==windowOffsetBottom-o.stickySidebar.outerHeight()){position='fixed'}else if(scrollTop+top-o.sidebar.offset().top-o.paddingTop<=options.additionalMarginTop){position='static'}else{position='absolute'}}if(position=='fixed'){var scrollLeft=$(document).scrollLeft();o.stickySidebar.css({'position':'fixed','width':getWidthForObject(o.stickySidebar)+'px','transform':'translateY('+top+'px)','left':(o.sidebar.offset().left+parseInt(o.sidebar.css('padding-left'))-scrollLeft)+'px','top':'0px'})}else if(position=='absolute'){var css={};if(o.stickySidebar.css('position')!='absolute'){css.position='absolute';css.transform='translateY('+(scrollTop+top-o.sidebar.offset().top-o.stickySidebarPaddingTop-o.stickySidebarPaddingBottom)+'px)';css.top='0px'}css.width=getWidthForObject(o.stickySidebar)+'px';css.left='';o.stickySidebar.css(css)}else if(position=='static'){resetSidebar()}if(position!='static'){if(o.options.updateSidebarHeight==true){o.sidebar.css({'min-height':o.stickySidebar.outerHeight()+o.stickySidebar.offset().top-o.sidebar.offset().top+o.paddingBottom})}}o.previousScrollTop=scrollTop};o.onScroll(o);$(document).on('scroll.'+o.options.namespace,function(o){return function(){o.onScroll(o)}}(o));$(window).on('resize.'+o.options.namespace,function(o){return function(){o.stickySidebar.css({'position':'static'});o.onScroll(o)}}(o));if(typeof ResizeSensor!=='undefined'){new ResizeSensor(o.stickySidebar[0],function(o){return function(){o.onScroll(o)}}(o))}function resetSidebar(){o.fixedScrollTop=0;o.sidebar.css({'min-height':'1px'});o.stickySidebar.css({'position':'static','width':'','transform':'none'})}function getClearedHeight(e){var height=e.height();e.children().each(function(){height=Math.max(height,$(this).height())});return height}})}function getWidthForObject(object){var width;try{width=object[0].getBoundingClientRect().width}catch(err){}if(typeof width==="undefined"){width=object.width()}return width}return this}})(jQuery);
/*! MenuIfy|v1.0.0|https://templateify.com */!function(a){a.fn.menuify=function(){return this.each(function(){var $t=a(this),b=$t.find('.LinkList ul > li').children('a'),c=b.length;for(var i=0;i<c;i++){var d=b.eq(i),h=d.text();if(h.charAt(0)!=='_'){var e=b.eq(i+1),j=e.text();if(j.charAt(0)==='_'){var m=d.parent();m.append('<ul class="sub-menu m-sub"/>');}}if(h.charAt(0)==='_'){d.text(h.replace('_',''));d.parent().appendTo(m.children('.sub-menu'));}}for(var i=0;i<c;i++){var f=b.eq(i),k=f.text();if(k.charAt(0)!=='_'){var g=b.eq(i+1),l=g.text();if(l.charAt(0)==='_'){var n=f.parent();n.append('<ul class="sub-menu2 m-sub"/>');}}if(k.charAt(0)==='_'){f.text(k.replace('_',''));f.parent().appendTo(n.children('.sub-menu2'));}}$t.find('.LinkList ul li ul').parent('li').addClass('has-sub');});}}(jQuery);
/*! Tabify |v1.0.0|https://templateify.com */!function(a){a.fn.tabify=function(b){b=jQuery.extend({onHover:false,animated:true,transition:'fadeInUp'},b);return this.each(function(){var e=a(this),c=e.children('[tab-ify]'),d=0,n='tab-animated',k='tab-active';if(b.onHover==true){var event='mouseenter'}else{var event='click'}e.prepend('<ul class="select-tab"></ul>');c.each(function(){if(b.animated==true){a(this).addClass(n)}e.find('.select-tab').append('<li><a href="javascript:;">'+a(this).attr('tab-ify')+'</a></li>')}).eq(d).addClass(k).addClass('tab-'+b.transition);e.find('.select-tab a').on(event,function(){var f=a(this).parent().index();a(this).closest('.select-tab').find('.active').removeClass('active');a(this).parent().addClass('active');c.removeClass(k).removeClass('tab-'+b.transition).eq(f).addClass(k).addClass('tab-'+b.transition);return false}).eq(d).parent().addClass('active')})}}(jQuery);
/*! Replace-text|v1.1.0|http://benalman.com/projects/jquery-replacetext-plugin */(function($){$.fn.replaceText=function(b,a,c){return this.each(function(){var f=this.firstChild,g,e,d=[];if(f){do{if(f.nodeType===3){g=f.nodeValue;e=g.replace(b,a);if(e!==g){if(!c&&/</.test(e)){$(f).before(e);d.push(f)}else{f.nodeValue=e}}}}while(f=f.nextSibling)}d.length&&$(d).remove()})}})(jQuery);

var configDefault = {
  avatar    : "//1.bp.blogspot.com/-8Jqpc6W9n-Q/Xt--Hk_iaaI/AAAAAAAAACE/WlTM504HbzQaRd40KF_ZvATU4JYXRiaCACK4BGAsYHg/w55-h55-p-k-no-nu/avatar-001.jpg",
  entryImage: "//1.bp.blogspot.com/-zia8weibM-w/Xt--HwlUn0I/AAAAAAAAACE/9yVPHBaeLrg_dKA_vXe8sq0Y7CeKX_htQCK4BGAsYHg/s72-c/entry-image-001.png",
};

!function ($) {
  $["fn"]["lazyalotool"] = function () {
    return this["each"](function () {
      var obj              = $(this),
          imagePlaceholder = obj["attr"]("data-image"),
          objW             = Math["round"](obj["width"]()),
          objH             = Math["round"](obj["height"]()),
          //imageSize = "/w" + objW + "-h" + objH + "-p-k-no-nu",
          imageSize        = "/w" + (objW > objH ? objW : objH),
          imageLoad        = "";
      if (imagePlaceholder["match"]("s72-c")) {
        imageLoad = imagePlaceholder["replace"]("/s72-c", imageSize);
      } else {
        if (imagePlaceholder["match"]("w72-h")) {
          imageLoad = imagePlaceholder["replace"]("/w72-h72-p-k-no-nu", imageSize);
        } else {
          imageLoad = imagePlaceholder;
        }
      }
      $(window)["on"]("load resize scroll", func);

      function func() {
        var wHeight    = $(window)["height"](),
            wScrollTop = $(window)["scrollTop"](),
            offsetTop  = obj["offset"]()["top"];
        if (wScrollTop + wHeight > offsetTop) {
          var image = new Image();
          image["onload"] = function () {
            obj["attr"]("style", "background-image:url(" + this["src"] + ")")["addClass"]("lazy-alotool");
          }, image["src"] = imageLoad;
        }
      }

      func();
    })
  }
}(jQuery);

$("#alotool-main-menu")["menuify"]();
$("#alotool-main-menu .widget")["addClass"]("show-menu");
$(".search-toggle")["on"]("click", function () {
  $("body")["toggleClass"]("search-active");
});
$(".blog-posts-title a.more,.related-title a.more")["each"](function () {
  var obj           = $(this),
      _showMoreText = showMoreText;
  if (_showMoreText != "") {
    obj["text"](_showMoreText);
  }
});
$(".follow-by-email-text")["each"](function () {
  var obj                = $(this),
      _followByEmailText = followByEmailText;
  if (_followByEmailText != "") {
    obj["text"](_followByEmailText);
  }
});
$(".post-body strike")["each"](function () {
  var obj       = $(this),
      textValue = obj["text"]()["trim"]();
  if (textValue == "$ads={1}") {
    obj["replaceWith"]("<div id=\"new-before-ad\"/>");
  }
  if (textValue == "$ads={2}") {
    obj["replaceWith"]("<div id=\"new-after-ad\"/>");
  }
});
$("#new-before-ad")["each"](function () {
  var obj = $(this);
  if (obj["length"]) {
    $("#before-ad")["appendTo"](obj);
  }
});
$("#new-after-ad")["each"](function () {
  var obj = $(this);
  if (obj["length"]) {
    $("#after-ad")["appendTo"](obj);
  }
});
$("#main-before-ad .widget")["each"](function () {
  var obj = $(this);
  if (obj["length"]) {
    obj["appendTo"]($("#before-ad"));
  }
});
$("#main-after-ad .widget")["each"](function () {
  var obj = $(this);
  if (obj["length"]) {
    obj["appendTo"]($("#after-ad"));
  }
});
$("#social-counter ul.social-icons li a")["each"](function () {
  var obj       = $(this),
      elCount   = obj["find"](".count"),
      textRaw   = obj["data"]("content")["trim"](),
      textArray = textRaw["split"]("$"),
      href      = textArray[0],
      text      = textArray[1];
  obj["attr"]("href", href);
  elCount["text"](text);
});
$(".avatar-image-container img")["attr"]("src", function (a, b) {
  b = b["replace"]("//img1.blogblog.com/img/blank.gif", configDefault.avatar);
  b = b["replace"]("//img1.blogblog.com/img/b16-rounded.gif", configDefault.avatar);
  b = b["replace"]("//resources.blogblog.com/img/blank.gif", configDefault.avatar);
  b = b["replace"]("//lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35", configDefault.avatar);
  return b;
});
$(".post-body a")["each"](function () {
  var obj      = $(this),
      txtRaw   = obj["text"]()["trim"](),
      txtArray = txtRaw["split"]("/"),
      a        = txtArray[0],
      b        = txtArray[1],
      c        = txtArray["pop"]();
  if (txtRaw["match"]("button")) {
    obj["addClass"]("button")["text"](a);
    if (b != "button") {
      obj["addClass"](b);
    }
    if (c != "button") {
      obj["addClass"]("colored-button")["css"]({
        "background-color": c
      });
    }
  }
});
$(".post-body strike")["each"](function () {
  var obj     = $(this),
      txtRaw  = obj["text"]()["trim"](),
      txtHtml = obj["html"]();
  if (txtRaw["match"]("contact-form")) {
    obj["replaceWith"]("<div class=\"contact-form\"/>");
    $(".contact-form")["append"]($("#ContactForm1"));
  }
  if (txtRaw["match"]("alert-success")) {
    obj["replaceWith"]("<div class=\"alert-message alert-success short-b\">" + txtHtml + "</div>");
  }
  if (txtRaw["match"]("alert-info")) {
    obj["replaceWith"]("<div class=\"alert-message alert-info short-b\">" + txtHtml + "</div>");
  }
  if (txtRaw["match"]("alert-warning")) {
    obj["replaceWith"]("<div class=\"alert-message alert-warning short-b\">" + txtHtml + "</div>");
  }
  if (txtRaw["match"]("alert-error")) {
    obj["replaceWith"]("<div class=\"alert-message alert-error short-b\">" + txtHtml + "</div>");
  }
  if (txtRaw["match"]("left-sidebar")) {
    obj["replaceWith"]("<style>.item #main-wrapper{float:right}.item #sidebar-wrapper{float:left}</style>");
  }
  if (txtRaw["match"]("right-sidebar")) {
    obj["replaceWith"]("<style>.item #main-wrapper{float:left}.item #sidebar-wrapper{float:right}</style>");
  }
  if (txtRaw["match"]("full-width")) {
    obj["replaceWith"]("<style>.item #main-wrapper{width:100%}.item #sidebar-wrapper{display:none}</style>");
  }
  if (txtRaw["match"]("code-box")) {
    obj["replaceWith"]("<pre class=\"code-box short-b\">" + txtHtml + "</pre>");
  }
  var b = $(".post-body .short-b")["find"]("b");
  b["each"](function () {
    var obj1 = $(this),
        txt  = obj1["text"]()["trim"]();
    if (txt["match"]("alert-success") || txt["match"]("alert-info") || txt["match"]("alert-warning") || txt["match"]("alert-error") || txt["match"]("code-box")) {
      obj1["replaceWith"]("");
    }
  });
});
$(".share-links .window-alotool,.entry-share .window-alotool")["on"]("click", function () {
  var obj          = $(this),
      dataURL      = obj["data"]("url"),
      dataWidth    = obj["data"]("width"),
      dataHeight   = obj["data"]("height"),
      screenWidth  = window["screen"]["width"],
      screenHeight = window["screen"]["height"],
      l            = Math["round"](screenWidth / 2 - dataWidth / 2),
      t            = Math["round"](screenHeight / 2 - dataHeight / 2),
      r            = window["open"](dataURL, "_blank", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=" + dataWidth + ",height=" + dataHeight + ",left=" + l + ",top=" + t);
  r["focus"]();
});
$(".share-links")["each"](function () {
  var obj = $(this),
      elA = obj["find"](".show-hid a");
  elA["on"]("click", function () {
    obj["toggleClass"]("show-hidden");
  });
});
$(".about-author .author-description span a")["each"](function () {
  var obj    = $(this),
      txtRaw = obj["text"]()["trim"](),
      href   = obj["attr"]("href");
  obj["replaceWith"]("<li class=\"" + txtRaw + "\"><a href=\"" + href + "\" title=\"" + txtRaw + "\" target=\"_blank\"/></li>");
  $(".author-description")["append"]($(".author-description span li"));
  $(".author-description")["addClass"]("show-icons");
});

function regxify(a) {
  var b = /[^{\}]+(?=})/g;
  return String(a["match"](b))["trim"]();
}

function msgError() {
  return "<span class=\"no-posts\">" + noResultsFound + "</span>";
}

function msgServerError() {
  return "<div class=\"no-posts error-503\">" + loadingFeedsError + "</div>";
}

function beforeLoader() {
  return "<div class=\"spinner-accordion spinner-accordion-mh\"> <div class=\"rect1\"></div> <div class=\"rect2\"></div> <div class=\"rect3\"></div> <div class=\"rect4\"></div> <div class=\"rect5\"></div> </div>";
}

$("#alotool-main-menu li")["each"](function (label) {
  var _obj            = $(this),
      obj             = _obj,
      elA             = _obj["find"]("a"),
      href            = elA["attr"]("href")["trim"](),
      textToLowerCase = href["toLowerCase"](),
      textArray       = href["split"]("$");
  textArray[1] != undefined ? label = regxify(textArray[1]) : label = "";
  if (textToLowerCase["match"]("getmega")) {
    obj["addClass"]("has-sub mega-menu");
  }
  ajaxMega(obj, "msimple", 5, label, textToLowerCase);
});
$("#featured .HTML .widget-content")["each"](function (label, color) {
  var obj             = $(this),
      textRaw         = obj["text"]()["trim"](),
      textToLowerCase = textRaw["toLowerCase"](),
      textArray       = textRaw["split"]("$");
  textArray[1] != undefined ? label = regxify(textArray[1]) : label = "";
  textArray[2] != undefined ? color = regxify(textArray[2]) : color = "";
  ajaxFeatured(obj, "featured", 4, label, textToLowerCase, color);
});
$(".block-posts .HTML .widget-content")["each"](function (results, label, type, color) {
  var obj             = $(this),
      textRaw         = obj["text"]()["trim"](),
      textToLowerCase = textRaw["toLowerCase"](),
      textArray       = textRaw["split"]("$");
  textArray[1] != undefined ? results = regxify(textArray[1]) : results = "";
  textArray[2] != undefined ? label = regxify(textArray[2]) : label = "";
  textArray[3] != undefined ? type = regxify(textArray[3]) : type = "";
  textArray[4] != undefined ? color = regxify(textArray[4]) : color = "";
  ajaxBlock(obj, type, results, label, textToLowerCase, color);
});
$(".widget-ready .HTML .widget-content")["each"](function (results, label, type) {
  var obj             = $(this),
      textRaw         = obj["text"]()["trim"](),
      textToLowerCase = textRaw["toLowerCase"](),
      textArray       = textRaw["split"]("$");
  textArray[1] != undefined ? results = regxify(textArray[1]) : results = "";
  textArray[2] != undefined ? label = regxify(textArray[2]) : label = "";
  textArray[3] != undefined ? type = regxify(textArray[3]) : type = "";
  ajaxWidget(obj, type, results, label, textToLowerCase);
});
$(".related-content")["each"](function () {
  var obj     = $(this),
      label   = obj["find"](".related-tag")["attr"]("data-label"),
      results = relatedPostsNum;
  ajaxRelated(obj, "related", results, label, "getrelated");
});

function getFeedUrl(type, results, label) {
  var feedUrl = "";
  switch (label) {
    case "recent":
      feedUrl = "/feeds/posts/default?alt=json&max-results=" + results;
      break;
    case "comments":
      if (type == "list") {
        feedUrl = "/feeds/comments/default?alt=json&max-results=" + results;
      } else {
        feedUrl = "/feeds/posts/default/-/" + label + "?alt=json&max-results=" + results;
      }
      break;
    default:
      feedUrl = "/feeds/posts/default/-/" + label + "?alt=json&max-results=" + results;
      break;
  }
  return feedUrl;
}

function getPostLink(entries, index) {
  var postLink = "";
  for (var i = 0; i < entries[index]["link"]["length"]; i++) {
    if (entries[index]["link"][i]["rel"] == "alternate") {
      postLink = entries[index]["link"][i]["href"];
      break;
    }
  }
  return postLink;
}

function getPostTitle(entries, index) {
  var postTitle = entries[index]["title"]["$t"];
  return postTitle;
}

function getFirstImage(t, firstImage) {
  var a = $("<div>")["html"](t),
      b = a["find"]("img:first")["attr"]("src"),
      c = b["lastIndexOf"]("/") || 0,
      d = b["lastIndexOf"]("/", c - 1) || 0,
      e = b["substring"](0, d),
      f = b["substring"](d, c),
      g = b["substring"](c);
  if (f["match"](/\/s[0-9]+/g) || f["match"](/\/w[0-9]+/g) || f == "/d") {
    f = "/w72-h72-p-k-no-nu";
  }
  firstImage = e + f + g;
  return firstImage;
}

function getPostImage(entries, index, postLink) {
  var t            = entries[index]["content"]["$t"];
  var thumbnailURL = "";
  if (entries[index]["media$thumbnail"]) {
    thumbnailURL = entries[index]["media$thumbnail"]["url"];
  } else {
    thumbnailURL = "https:" + configDefault.entryImage;
  }
  if (t["indexOf"](t["match"](/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g)) > -1) {
    if (t["indexOf"]("<img") > -1) {
      if (t["indexOf"](t["match"](/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g)) < t["indexOf"]("<img")) {
        postLink = thumbnailURL["replace"]("/default.", "/0.");
      } else {
        postLink = getFirstImage(t);
      }
    } else {
      postLink = thumbnailURL["replace"]("/default.", "/0.");
    }
  } else {
    if (t["indexOf"]("<img") > -1) {
      postLink = getFirstImage(t);
    } else {
      postLink = "https:" + configDefault.entryImage;
    }
  }
  return postLink;
}

function getPostAuthor(entries, index) {
  var authorName = entries[index]["author"][0]["name"]["$t"];
  if (authorName === "Unknown") {
    return "";
  }
  var postAuthor = "";
  if (messages["postAuthor"] == "true") {
    postAuthor = "<span class=\"entry-author\">" + authorName + "</span>";
  }
  return postAuthor;
}

function getPostDate(entries, index) {
  var published = entries[index]["published"]["$t"],
      a         = published["substring"](0, 4),
      b         = published["substring"](5, 7),
      c         = published["substring"](8, 10),
      d         = monthFormat[parseInt(b, 10) - 1] + " " + c + ", " + a;
  var postDate  = "";
  if (messages["postDate"] == "true") {
    postDate = "<span class=\"entry-time\"><time class=\"published\" datetime=\"" + published + "\">" + d + "</time></span>";
  }
  return postDate;
}

function getPostMeta(postAuthor, postDate) {
  var authorDate = "";
  if (messages["postAuthor"] == "true" || messages["postDate"] == "true") {
    authorDate = "<div class=\"entry-meta\">" + postAuthor + postDate + "</div>";
  }
  var _date = "";
  if (messages["postDate"] == "true") {
    _date = "<div class=\"entry-meta\">" + postDate + "</div>";
  }
  var postMeta = [authorDate,
    _date
  ];
  return postMeta;
}

function getPostLabel(entries, index) {
  var postLabel = "";
  if (entries[index]["category"] != undefined) {
    var label = entries[index]["category"][0]["term"];
    postLabel = "<span class=\"entry-category\">" + label + "</span>";
  }
  return postLabel;
}

function getPostLabelFix(label) {
  return "<span class=\"entry-category\">" + label + "</span>";
}

function getPostComments(entries, index, postLink) {
  var a         = entries[index]["author"][0]["name"]["$t"],
      b         = entries[index]["author"][0]["gd$image"]["src"]["replace"]("/s113", "/w55-h55-p-k-no-nu"),
      c         = entries[index]["title"]["$t"];
  var avatarURL = "";
  if (b["match"]("//img1.blogblog.com/img/blank.gif") || b["match"]("//img1.blogblog.com/img/b16-rounded.gif")) {
    avatarURL = configDefault.avatar;
  } else {
    avatarURL = b;
  }
  var postComments = "<article class=\"custom-item item-" + index + "\"><a class=\"entry-image-link cmm-avatar\" href=\"" + postLink + "\"><span class=\"entry-thumb\" data-image=\"" + avatarURL + "\"/></a><h2 class=\"entry-title\"><a href=\"" + postLink + "\">" + a + "</a></h2><p class=\"cmm-snippet excerpt\">" + c + "</p></article>";
  return postComments;
}

function getCustomStyle(type, label, color) {
  var customStyle = "";
  if (color != "") {
    if (type == "featured") {
      customStyle = ".id-" + type + "-" + label + " .entry-category{background-color:" + color + ";color:#fff}.id-" + type + "-" + label + " .loader:after{border-color:" + color + ";border-right-color:rgba(155,155,155,0.2)}";
    } else {
      customStyle = ".id-" + type + "-" + label + " .title-wrap:after,.id-" + type + "-" + label + " .entry-category{background-color:" + color + ";color:#fff}.id-" + type + "-" + label + " .title-wrap > a.more:hover,.id-" + type + "-" + label + " .entry-header:not(.entry-info) .entry-title a:hover{color:" + color + "}.id-" + type + "-" + label + " .loader:after{border-color:" + color + ";border-right-color:rgba(155,155,155,0.2)}";
    }
  }
  return customStyle;
}

function getAjax(obj, type, results, label, color) {
  switch (type) {
    case "msimple":
      ;
    case "featured":
      ;
    case "block":
      ;
    case "col-left":
      ;
    case "col-right":
      ;
    case "grid":
      ;
    case "videos":
      ;
    case "list":
      ;
    case "related":
      if (label == undefined) {
        label = "geterror404"
      }
      ;
      var feedUrl = getFeedUrl(type, results, label);
      $["ajax"]({
        url       : feedUrl,
        type      : "GET",
        dataType  : "json",
        cache     : true,
        beforeSend: function (response) {
          var customStyle = getCustomStyle(type, label, color);
          switch (type) {
            case "featured":
              $("#page-skin-2")["prepend"](customStyle);
              obj["html"](beforeLoader())["parent"]()["addClass"]("id-" + type + "-" + label + " show-alotool");
              break;
            case "block":
              ;
            case "grid":
              ;
            case "videos":
              $("#page-skin-2")["prepend"](customStyle);
              obj["html"](beforeLoader())["parent"]()["addClass"]("id-" + type + "-" + label + " show-alotool");
              break;
            case "col-left":
              $("#page-skin-2")["prepend"](customStyle);
              obj["html"](beforeLoader())["parent"]()["addClass"]("column-left block-column id-" + type + "-" + label + " show-alotool");
              break;
            case "col-right":
              $("#page-skin-2")["prepend"](customStyle);
              obj["html"](beforeLoader())["parent"]()["addClass"]("column-right block-column id-" + type + "-" + label + " show-alotool");
              break;
            case "list":
              obj["html"](beforeLoader());
              break;
            case "related":
              obj["html"](beforeLoader())["parent"]()["addClass"]("show-alotool");
              break
          }
        },
        success   : function (response) {
          var elStart = "";
          switch (type) {
            case "msimple":
              elStart = "<ul class=\"mega-widget\">";
              break;
            case "featured":
              elStart = "<div class=\"featured-posts\">";
              break;
            case "block":
              elStart = "<div class=\"block-posts-1\">";
              break;
            case "col-left":
              ;
            case "col-right":
              elStart = "<div class=\"column-posts\">";
              break;
            case "grid":
              elStart = "<div class=\"grid-posts-1\">";
              break;
            case "videos":
              elStart = "<div class=\"block-videos\">";
              break;
            case "list":
              elStart = "<div class=\"custom-widget\">";
              break;
            case "related":
              elStart = "<div class=\"related-posts\">";
              break;
          }
          ;
          var entries = response["feed"]["entry"];
          if (entries != undefined) {
            for (var i = 0, _entries = entries; i < _entries["length"]; i++) {
              var postLink   = getPostLink(_entries, i),
                  postTitle  = getPostTitle(_entries, i, postLink),
                  postImage  = getPostImage(_entries, i, postLink),
                  postAuthor = getPostAuthor(_entries, i),
                  postDate   = getPostDate(_entries, i),
                  postMeta   = getPostMeta(postAuthor, postDate),
                  postLabel  = getPostLabel(_entries, i);
              var elEnd      = "";
              switch (type) {
                case "msimple":
                  elEnd += "<article class=\"mega-item\"><div class=\"mega-content\"><a class=\"entry-image-link\" href=\"" + postLink + "\"><span class=\"entry-thumb\" data-image=\"" + postImage + "\"/></a><h2 class=\"entry-title\"><a href=\"" + postLink + "\">" + postTitle + "</a></h2>" + postMeta[1] + "</div></article>";
                  break;
                case "featured":
                  switch (i) {
                    case 0:
                      ;
                    case 1:
                      elEnd += "<article class=\"featured-item post item-" + i + "\"><div class=\"featured-item-inner\"><a class=\"entry-image-link before-mask\" href=\"" + postLink + "\"><span class=\"entry-thumb\" data-image=\"" + postImage + "\"/></a>" + postLabel + "<div class=\"entry-header entry-info\"><h2 class=\"entry-title\"><a href=\"" + postLink + "\">" + postTitle + "</a></h2>" + postMeta[0] + "</div></div></article>";
                      break;
                    default:
                      elEnd += "<article class=\"featured-item post item-" + i + "\"><div class=\"featured-item-inner\"><a class=\"entry-image-link before-mask\" href=\"" + postLink + "\"><span class=\"entry-thumb\" data-image=\"" + postImage + "\"/></a>" + postLabel + "<div class=\"entry-header entry-info\"><h2 class=\"entry-title\"><a href=\"" + postLink + "\">" + postTitle + "</a></h2>" + postMeta[1] + "</div></div></article>";
                      break;
                  }
                  ;
                  break;
                case "block":
                  switch (i) {
                    case 0:
                      elEnd += "<article class=\"block-item item-" + i + "\"><div class=\"block-inner\">" + getPostLabelFix(label) + "<a class=\"entry-image-link before-mask\" href=\"" + postLink + "\"><span class=\"entry-thumb\" data-image=\"" + postImage + "\"/></a><div class=\"entry-header entry-info\"><h2 class=\"entry-title\"><a href=\"" + postLink + "\">" + postTitle + "</a></h2>" + postMeta[0] + "</div></div></article>";
                      break;
                    default:
                      elEnd += "<article class=\"block-item item-" + i + "\"><a class=\"entry-image-link\" href=\"" + postLink + "\"><span class=\"entry-thumb\" data-image=\"" + postImage + "\"/></a><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"" + postLink + "\">" + postTitle + "</a></h2>" + postMeta[1] + "</div></article>";
                      break;
                  }
                  ;
                  break;
                case "col-left":
                  ;
                case "col-right":
                  switch (i) {
                    case 0:
                      elEnd += "<article class=\"column-item item-" + i + "\"><div class=\"column-inner\">" + postLabel + "<a class=\"entry-image-link before-mask\" href=\"" + postLink + "\"><span class=\"entry-thumb\" data-image=\"" + postImage + "\"/></a><div class=\"entry-header entry-info\"><h2 class=\"entry-title\"><a href=\"" + postLink + "\">" + postTitle + "</a></h2>" + postMeta[0] + "</div></div></article>";
                      break;
                    default:
                      elEnd += "<article class=\"column-item item-" + i + "\"><a class=\"entry-image-link\" href=\"" + postLink + "\"><span class=\"entry-thumb\" data-image=\"" + postImage + "\"/></a><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"" + postLink + "\">" + postTitle + "</a></h2>" + postMeta[1] + "</div></article>";
                      break;
                  }
                  ;
                  break;
                case "grid":
                  elEnd += "<article class=\"grid-item item-" + i + "\"><div class=\"entry-image\"><a class=\"entry-image-link\" href=\"" + postLink + "\"><span class=\"entry-thumb\" data-image=\"" + postImage + "\"/></a></div><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"" + postLink + "\">" + postTitle + "</a></h2>" + postMeta[1] + "</div></article>";
                  break;
                case "videos":
                  elEnd += "<article class=\"videos-item item-" + i + "\"><div class=\"entry-image\"><a class=\"entry-image-link\" href=\"" + postLink + "\"><span class=\"entry-thumb\" data-image=\"" + postImage + "\"/><span class=\"video-icon\"/></a></div><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"" + postLink + "\">" + postTitle + "</a></h2>" + postMeta[1] + "</div></article>";
                  break;
                case "list":
                  switch (label) {
                    case "comments":
                      var postComments = getPostComments(_entries, i, postLink);
                      elEnd += postComments;
                      break;
                    default:
                      elEnd += "<article class=\"custom-item item-" + i + "\"><a class=\"entry-image-link\" href=\"" + postLink + "\"><span class=\"entry-thumb\" data-image=\"" + postImage + "\"/></a><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"" + postLink + "\">" + postTitle + "</a></h2>" + postMeta[1] + "</div></article>";
                      break;
                  }
                  ;
                  break;
                case "related":
                  elEnd += "<article class=\"related-item post item-" + i + "\"><div class=\"entry-image\"><a class=\"entry-image-link\" href=\"" + postLink + "\"><span class=\"entry-thumb\" data-image=\"" + postImage + "\"/></a></div><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"" + postLink + "\">" + postTitle + "</a></h2>" + postMeta[1] + "</div></article>";
                  break;
              }
              ;
              elStart += elEnd
            }
          } else {
            switch (type) {
              case "msimple":
                elStart = "<ul class=\"mega-widget\">" + msgError() + "</ul>";
                break;
              default:
                elStart = msgError();
                break;
            }
            ;
          }
          ;
          switch (type) {
            case "msimple":
              elStart += "</ul>";
              obj["append"](elStart)["addClass"]("msimple");
              obj["find"]("a:first")["attr"]("href", function (a, s) {
                switch (label) {
                  case "recent":
                    s = s["replace"](s, "/search");
                    break;
                  default:
                    s = s["replace"](s, "/search/label/" + label);
                    break;
                }
                ;
                return s;
              });
              break;
            case "block":
              ;
            case "grid":
              ;
            case "col-left":
              ;
            case "col-right":
              ;
            case "videos":
              elStart += "</div>";
              obj["html"](elStart);
              break;
            default:
              elStart += "</div>";
              obj["html"](elStart);
              break;
          }
          ;
          obj["find"]("span.entry-thumb")["lazyalotool"]();
        },
        error     : function () {
          switch (type) {
            case "msimple":
              obj["append"]("<ul>" + msgServerError() + "</ul>");
              break;
            default:
              obj["html"](msgServerError());
              break;
          }
        }
      });
  }
}

function ajaxMega(obj, type, results, label, textToLowerCase) {
  if (textToLowerCase["match"]("getmega")) {
    if (type == "msimple") {
      return getAjax(obj, type, results, label);
    } else {
      obj["addClass"]("has-sub mega-menu")["append"]("<ul class=\"mega-widget\">" + msgError() + "</ul>");
    }
  }
}

function ajaxFeatured(obj, type, results, label, textToLowerCase, color) {
  if (textToLowerCase["match"]("getfeatured")) {
    if (type == "featured") {
      return getAjax(obj, type, results, label, color);
    } else {
      obj["html"](beforeLoader())["parent"]()["addClass"]("show-alotool");
      setTimeout(function () {
        obj["html"](msgError());
      }, 500);
    }
  }
}

function ajaxBlock(obj, type, results, label, textToLowerCase, color) {
  if (textToLowerCase["match"]("getblock")) {
    if (type == "block" || type == "col-left" || type == "col-right" || type == "grid" || type == "videos") {
      var temp          = showMoreText,
          _showMoreText = "";
      if (temp != "") {
        _showMoreText = temp;
      } else {
        _showMoreText = messages["showMore"];
      }
      ;
      obj["parent"]()["find"](".widget-title")["append"]("<a class=\"more\" href=\"/search/label/" + label + "\">" + _showMoreText + " <i class=\"fa fa-angle-double-right\" aria-hidden=\"true\"></i></a>");
      return getAjax(obj, type, results, label, color);
    } else {
      obj["html"](msgError())["parent"]()["addClass"]("show-alotool");
    }
  }
}

function ajaxWidget(obj, type, results, label, color) {
  if (color["match"]("getwidget")) {
    if (type == "list") {
      return getAjax(obj, type, results, label);
    } else {
      obj["html"](msgError());
    }
  }
}

function ajaxRelated(obj, type, results, label, color) {
  if (color["match"]("getrelated")) {
    return getAjax(obj, type, results, label);
  }
}

//---------- COMMENTS SYSTEM ----------//
$(".blog-post-comments")["each"](function () {
  var obj                 = $(this),
      _commentsSystem     = commentsSystem,
      classCommentsSystem = "comments-system-" + _commentsSystem;
  switch (_commentsSystem) {
    case "blogger":
      obj["addClass"](classCommentsSystem)["show"]();
      $(".entry-meta .entry-comments-link")["addClass"]("show");
      break;
    case "disqus":
      obj["addClass"](classCommentsSystem)["show"]();
      break;
    case "facebook":
      var elComments = "<div class=\"fb-comments\" data-width=\"100%\" data-href=\"" + bloggerCurrentURL + "\" order_by=\"time\" data-numposts=\"5\"></div>";
      obj["addClass"](classCommentsSystem)["find"]("#comments")["html"](elComments);
      obj["show"]();
      break;
    case "hide":
      obj["hide"]();
      break;
    default:
      obj["addClass"]("comments-system-default")["show"]();
      $(".entry-meta .entry-comments-link")["addClass"]("show");
      break;
  }
  ;
  var a = obj["find"](".comments .toplevel-thread > ol > .comment .comment-actions .comment-reply"),
      b = obj["find"](".comments .toplevel-thread > #top-continue");
  a["on"]("click", function () {
    b["show"]();
  });
  b["on"]("click", function () {
    b["hide"]();
  });
});

$(function () {
  $(".index-post .entry-image-link .entry-thumb, .PopularPosts .entry-image-link .entry-thumb, .FeaturedPost .entry-image-link .entry-thumb,.about-author .author-avatar")["lazyalotool"]();
  $(".mobile-logo")["each"](function () {
    var obj = $(this),
        a   = $("#main-logo .header-widget a")["clone"]();
    a["find"]("#h1-tag")["remove"]();
    a["appendTo"](obj);
  });
  $("#mobile-menu")["each"](function () {
    var obj = $(this),
        a   = $("#alotool-main-menu-nav")["clone"]();
    a["attr"]("id", "main-mobile-nav");
    a["find"](".getMega, .mega-widget, .mega-tab")["remove"]();
    a["find"](".complex-tabs")["replaceWith"](a["find"](".complex-tabs > ul.select-tab")["attr"]("class", "sub-menu m-sub"));
    a["find"](".mega-menu > a")["each"](function () {
      var obj1 = $(this),
          b    = obj1["attr"]("href")["trim"]()["toLowerCase"]();
      if (b["match"]("getmega")) {
        obj1["attr"]("href", "/search");
      }
    });
    a["find"](".mega-tabs ul li > a")["each"](function () {
      var obj2 = $(this),
          c    = obj2["text"]()["trim"]();
      obj2["attr"]("href", "/search/label/" + c);
    });
    a["appendTo"](obj);
    $(".show-mobile-menu, .hide-mobile-menu, .overlay")["on"]("click", function () {
      $("body")["toggleClass"]("nav-active");
    });
    $(".mobile-menu .has-sub")["append"]("<div class=\"submenu-toggle\"/>");
    $(".mobile-menu .mega-menu")["find"](".submenu-toggle")["remove"]();
    $(".mobile-menu .mega-tabs")["append"]("<div class=\"submenu-toggle\"/>");
    $(".mobile-menu ul li .submenu-toggle")["on"]("click", function (d) {
      if ($(this)["parent"]()["hasClass"]("has-sub")) {
        d["preventDefault"]();
        if (!$(this)["parent"]()["hasClass"]("show")) {
          $(this)["parent"]()["addClass"]("show")["children"](".m-sub")["slideToggle"](170);
        } else {
          $(this)["parent"]()["removeClass"]("show")["find"]("> .m-sub")["slideToggle"](170);
        }
      }
    });
  });
  $(".social-mobile")["each"](function () {
    var obj = $(this),
        a   = $("#about-section ul.social-footer")["clone"]();
    a["removeClass"]("social-bg-hover");
    a["appendTo"](obj);
  });
  $("#header-wrapper .headeralotool")["each"](function () {
    var obj = $(this);
    if (fixedMenu == true) {
      if (obj["length"] > 0) {
        var a = $(document)["scrollTop"](),
            b = obj["offset"]()["top"],
            c = obj["height"](),
            d = (b + c);
        $(window)["scroll"](function () {
          var e = $(document)["scrollTop"](),
              f = $("#footer-wrapper")["offset"]()["top"],
              g = (f - c);
          if (e < g) {
            if (e > d) {
              obj["addClass"]("is-fixed");
            } else {
              if (e <= 0) {
                obj["removeClass"]("is-fixed");
              }
            }
            if (e > a) {
              obj["removeClass"]("show");
            } else {
              obj["addClass"]("show");
            }
            ;
            a = $(document)["scrollTop"]();
          }
        });
      }
    }
  });
  $("#sidebar-wrapper-left,#main-wrapper,#sidebar-wrapper")["each"](function () {
    if (fixedSidebar == true) {
      $(this)["theiaStickySidebar"]({
        additionalMarginTop   : 30,
        additionalMarginBottom: 30
      });
    }
  });
  $("a#alotool")["attr"]("href", "")["text"]("Alotool")["attr"]("style", "visibility:visible!important;opacity:1!important;position:relative!important;z-index:1!important;font-size:10px!important;color:#fff!important;");
  setInterval(function () {
    if (!$("a#alotool:visible")["length"]) {
      window["location"]["href"] = "";
    }
  }, 1000);
  $(".back-top")["each"](function () {
    var obj = $(this);
    $(window)["on"]("scroll", function () {
      $(this)["scrollTop"]() >= 100 ? obj["fadeIn"](250) : obj["fadeOut"](250);
      obj["offset"]()["top"] >= $("#footer-wrapper")["offset"]()["top"] - 32 ? obj["addClass"]("on-footer") : obj["removeClass"]("on-footer");
    }), obj["click"](function () {
      $("html, body")["animate"]({
        scrollTop: 0
      }, 500);
    });
  });
  $("p.comment-content")["each"](function () {
    var a = $(this);
    a["replaceText"](/(https:\/\/\S+(\.png|\.jpeg|\.jpg|\.gif))/g, "<img src=\"$1\"/>");
    a["replaceText"](/(?:https:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g, "<iframe id=\"youtube\" width=\"100%\" height=\"358\" src=\"https://www.youtube.com/embed/$1\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>");
  });
  $("#load-more-link")["each"](function () {
    var obj  = $(this),
        load = obj["data"]("load");
    if (load) {
      $("#load-more-link")["show"]();
    }
    $("#load-more-link")["on"]("click", function (r) {
      $("#load-more-link")["hide"]();
      $["ajax"]({
        url       : load,
        success   : function (res) {
          var obj1 = $(res)["find"](".blog-posts");
          obj1["find"](".index-post")["addClass"]("post-animated post-fadeInUp");
          $(".blog-posts")["append"](obj1["html"]());
          load = $(res)["find"]("#load-more-link")["data"]("load");
          if (load) {
            $("#load-more-link")["show"]();
          } else {
            $("#load-more-link")["hide"]();
            $("#blog-pager .no-more")["addClass"]("show");
          }
          $(".index-post .entry-image-link .entry-thumb")["lazyalotool"]();
        },
        beforeSend: function () {
          $("#blog-pager .loading")["show"]();
        },
        complete  : function () {
          $("#blog-pager .loading")["hide"]();
        }
      });
      r["preventDefault"]();
    });
  });
});
//---------- CUSTOMIZE ----------//
// TODO

//]]>
