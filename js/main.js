var ONE_DAY = 86400,
  ONE_MONTH = 30 * ONE_DAY,
  bannersnack_embed = bannersnack_embed || {},
  protocol = "file:" == window.location.protocol ? "http:" : "",
  reviveIntervalElement = document.getElementById("embed-float"),
  reviveInterval = ONE_MONTH;
reviveIntervalElement &&
  reviveIntervalElement.hasAttribute("data-revive") &&
  (reviveInterval = ONE_DAY);
(function (d) {
  var n = "html5" === bannersnack_embed.type,
    f;
  f = "banners/" + bannersnack_embed.hash + "/embed/index.html";
  f =
    "dev" === bannersnack_embed.env || "local" == bannersnack_embed.env
      ? n
        ? "//cdn.bannersnack.net/" + f + "?env=" + bannersnack_embed.env
        : protocol + "//cdn.bannersnack.net/preview/index.html"
      : n
      ? "//cdn.bannersnack.com/" + f
      : protocol + "//cdn.bannersnack.com/iframe/embed.html";
  (function (a, b) {
    function c() {
      if (!l) {
        l = !0;
        for (var a = 0; a < d.length; a++) d[a].fn.call(window, d[a].ctx);
        d = [];
      }
    }
    function e() {
      "complete" === document.readyState && c();
    }
    b = b || window;
    var d = [],
      l = !1,
      f = !1;
    b[a || "docReady"] = function (a, b) {
      l
        ? setTimeout(function () {
            a(b);
          }, 1)
        : (d.push({
            fn: a,
            ctx: b,
          }),
          "complete" === document.readyState
            ? setTimeout(c, 1)
            : f ||
              (document.addEventListener
                ? (document.addEventListener("DOMContentLoaded", c, !1),
                  window.addEventListener("load", c, !1))
                : (document.attachEvent("onreadystatechange", e),
                  window.attachEvent("onload", c)),
              (f = !0)));
    };
  })("docReady", this);
  var r,
    A,
    n = n
      ? ["t", "clickTag", "userId"]
      : "hash bgcolor wmode clickTag t useOnSW userId env".split(" ");
  for (A = 0; (r = n[A]); A++)
    d[r] &&
      ((f += 0 < f.indexOf("?") ? "&" : "?"),
      (f += r + "=" + encodeURIComponent(d[r])));
  var g = "bottom" == d["float"] || "top" == d["float"] ? d["float"] : "popup",
    p =
      d.align && "|left|center|right".indexOf(d.align.toLowerCase())
        ? d.align.toLowerCase()
        : "center",
    u =
      d.openon && "|exit|delay|function|load".indexOf(d.openon.toLowerCase())
        ? d.openon.toLowerCase()
        : "load",
    v = d.openparam ? d.openparam : "",
    t = d.animate && "off" == d.animate ? !1 : !0,
    w = isNaN(parseInt(d.alignOffset)) ? 10 : parseInt(d.alignOffset),
    k = "bs_" + d.hash + "_" + g.substr(0, 1) + p.substr(0, 1),
    n = "";
  r = window.navigator.userAgent.toLowerCase();
  /iphone|ipod|ipad/.test(r) &&
    (n = "width: 1px; min-width: 100%; max-width: 100%");
  var B =
      '<iframe src="' +
      f +
      '" width="' +
      d.width +
      '" height="' +
      d.height +
      '" frameborder="0" allowtransparency="true" scrolling="no" allow="autoplay" allowfullscreen style="' +
      n +
      ("top" == g ? "transform: translateZ(0)" : "") +
      '"></iframe>',
    x = function (a) {
      if (!F()) return !1;
      "function" != typeof a && (a = function () {});
      var b = function (b) {
        C();
        window.addEventListener &&
          (window.addEventListener("resize", C, !1),
          window.addEventListener("orientationchange", C, !1));
        "function" != typeof a && a(b);
        var c = b.onclick;
        b.onclick = function () {
          "function" == typeof c && c();
          G(d.hash, g, p, u);
        };
      };
      q();
      if (document.getElementsByClassName)
        for (
          var c = document.getElementsByClassName("bs-float-embed-cont-" + g),
            e = 0;
          e < c.length;
          e++
        )
          q(c[e]);
      "bottom" == g ? H(B, p, b) : "top" == g ? I(B, b) : J(B, b);
    },
    K = function () {
      var a;
      a = document.createElement("style");
      try {
        a.appendChild(document.createTextNode(""));
      } catch (e) {}
      (document.head ? document.head : document.body).appendChild(a);
      a = a.sheet ? a.sheet : a.styleSheet;
      var b = {};
      b["#" + k + " .bsb-close"] =
        "position:absolute;right:-1px;top:-1px;background:#fff;display:block;cursor:pointer";
      b["#" + k + " .bsb-close img"] =
        "opacity:1;border:4px solid #646464;border-top-width:5px;border-right-width:5px";
      b["#" + k + " .bsb-close:hover img"] = "opacity:0.8";
      b["#" + k + " > span"] =
        "position:relative;display:inline-block;font-size:0;overflow:hidden;background:" +
        d.bgcolor;
      b["#" + k + " iframe"] =
        "width:" +
        d.width +
        "px!important;max-width:" +
        d.width +
        "px!important;min-width:" +
        d.width +
        "px!important;";
      var c;
      if (a.insertRule) for (c in b) a.insertRule(c + " { " + b[c] + " }", 0);
      else for (c in b) a.addRule(c, b[c], 0);
    },
    L = function () {
      if (!d.urlTarget) return !0;
      var a = document.location.href;
      if (
        ("contains" == d.urlType && 0 <= a.indexOf(d.urlTarget)) ||
        ("ends" == d.urlType &&
          a.substr(a.length - d.urlTarget.length) == d.urlTarget) ||
        ("exact" == d.urlType && a == d.urlTarget) ||
        ("regexp" == d.urlType && a.match(new RegExp(d.urlTarget, "i")))
      )
        return !0;
    };
  this.docReady(function () {
    if (L()) {
      var a = M(d.hash, g, p, u);
      K();
      switch (u) {
        case "exit":
          (!1 === a || a >= reviveInterval) && N();
          break;
        case "delay":
          setTimeout(function () {
            if (!1 !== a && a < reviveInterval) return !0;
            x();
          }, 1e3 * parseFloat(v));
          break;
        case "function":
          var b = "function" == typeof window[v] ? window[v] : function () {};
          window[v] = function () {
            b();
            return x();
          };
          break;
        default:
          (!1 === a || a >= reviveInterval) &&
            x(function (a) {
              a.style.zIndex = 9999999;
            });
      }
    }
  });
  var O = function () {
      var a = document.createElement("p");
      a.style.width = "100%";
      a.style.height = "200px";
      var b = document.createElement("div");
      b.style.position = "absolute";
      b.style.top = "0px";
      b.style.left = "0px";
      b.style.visibility = "hidden";
      b.style.width = "200px";
      b.style.height = "150px";
      b.style.overflow = "hidden";
      b.appendChild(a);
      document.body.appendChild(b);
      var c = a.offsetWidth;
      b.style.overflow = "scroll";
      a = a.offsetWidth;
      c == a && (a = b.clientWidth);
      document.body.removeChild(b);
      return c - a;
    },
    y = function () {
      return (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      );
    },
    z = function () {
      return (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      );
    },
    N = function () {
      var a = null,
        b = null,
        c = null,
        d = null,
        m = null,
        l = null,
        f = O(),
        g = function (h) {
          d && 500 < h.timeStamp - d && (c = d = null);
          a = c;
          b = d;
          c = [h.clientX, h.clientY];
          d = h.timeStamp;
          m = a ? [2 * c[0] - a[0], 2 * c[1] - a[1]] : c;
          if (b) {
            h = a[0] - c[0];
            var k = a[1] - c[1];
            h = Math.sqrt(h * h + k * k) / Math.abs(d - b);
          } else h = 0;
          l = h;
          h = m;
          k = l;
          if (
            0 > h[1] ||
            (1 <= k && (0 > h[0] || h[0] > z() - f)) ||
            (1 <= k && h[1] > y())
          )
            document.removeEventListener
              ? document.removeEventListener("mousemove", g)
              : document.detachEvent("onmousemove", g),
              x();
          return !0;
        };
      document.addEventListener
        ? document.addEventListener("mousemove", g)
        : document.attachEvent("onmousemove", g);
    },
    D = function () {
      var a = document.body.getElementsByTagName("*"),
        b = 0;
      try {
        for (var c = 0; c < a.length; c++)
          if (-1 == a[c].className.toString().indexOf("bs-float-embed-cont")) {
            var d = parseInt,
              m;
            var l = a[c];
            m = l.currentStyle
              ? l.currentStyle.zIndex
              : document.defaultView && document.defaultView.getComputedStyle
              ? document.defaultView.getComputedStyle(l, "").zIndex
              : l.style.zIndex;
            var f = d(m);
            f > b && !isNaN(f) && (b = f);
          }
      } catch (g) {
        return 1;
      }
      return b;
    },
    J = function (a, b) {
      var c = E();
      c.style.left = "0px";
      c.style.zIndex = D() + 3;
      c.innerHTML =
        '<span style="border:15px solid #fff;">' +
        a +
        '<span href="#" class="bsb-close"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NzhGREVDNUNFNEJFNTExODYzM0Y3OThFNTc2OUY5RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxOEZGQ0I4RDRGQzAxMUU1OEZDQkRDQzRDRjk5NTFCNiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxOEZGQ0I4QzRGQzAxMUU1OEZDQkRDQzRDRjk5NTFCNiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1ICgxMi4weDIwMTAwMTE1IFsyMDEwMDExNS5tLjk5OCAyMDEwLzAxLzE1OjAyOjAwOjAwIGN1dG9mZjsgbSBicmFuY2hdKSAgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQyODgxRTA3Q0Y0QkU1MTFBNDAxQ0ZFNjYwMThDOEQ4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk3OEZERUM1Q0U0QkU1MTE4NjMzRjc5OEU1NzY5RjlFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+255RSAAAAIRQTFRFZGRk////tra2ZmZm+/v7yMjI19fXxcXFvb29zs7OvLy8bW1taGhom5ub/f39v7+/3Nzc5OTk5+fnr6+vdnZ2jIyMl5eX3t7ea2tr0NDQpKSkaWlpw8PDqampxsbGk5OT+Pj4oqKip6en9vb2wcHB5eXlzMzM+vr6c3NzsbGxq6urkJCQ6UeXDAAAAIBJREFUeNpkj+cSgkAMhLPkCh1UsABWsOH7v58H54kj+ZHNl0w2E6L/CLJvechNOqeaLXa4DJKkQWyENVa2vxZqSyzhub2jyB83+JPn636C/rkRLSGKCWuFsF1EDnmHJ5VCxR/ORucE0qKHcNTeHqzQkBvsTd5Idkb+dfbdW4ABAC66BHBvPiSTAAAAAElFTkSuQmCC"></span></span>';
      c.style.opacity = "0.1";
      c.onclick = function (a) {
        a = a || window.event;
        t
          ? ((c.style.opacity = "0"),
            setTimeout(function () {
              q(c);
            }, 300))
          : q(c);
        a.stopPropagation();
        return !1;
      };
      var e = y();
      c.style.paddingTop = Math.round((e - d.height - 30) / 2) + "px";
      c.style.height = e + "px";
      var m = function () {
        var a = y();
        c.style.height = a + "px";
        c.style.paddingTop = Math.round((a - d.height - 30) / 2) + "px";
      };
      document.body.appendChild(c);
      t
        ? ((c.style.transition = "opacity 0.3s ease-in-out"),
          setTimeout(function () {
            c.style.opacity = "1";
          }, 50))
        : (c.style.opacity = "1");
      m();
      window.addEventListener &&
        (window.addEventListener("resize", m, !1),
        window.addEventListener(
          "orientationchange",
          function () {
            m();
            setTimeout(m, 300);
          },
          !1
        ));
      b(c);
      return !0;
    },
    H = function (a, b, c) {
      var e = E();
      e.style.zIndex = D() + 2;
      e.style.height = "1px";
      e.style.overflow = "hidden";
      e.style.top = "";
      e.style.width = "auto";
      "center" == b &&
        ((e.style.left = "50%"), (e.style.marginLeft = -d.width / 2 + "px"));
      "right" == b && (e.style.right = w + "px");
      "left" == b && (e.style.left = w + "px");
      e.innerHTML =
        "<span>" +
        a +
        '<span href="#" class="bsb-close"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NzhGREVDNUNFNEJFNTExODYzM0Y3OThFNTc2OUY5RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxOEZGQ0I4RDRGQzAxMUU1OEZDQkRDQzRDRjk5NTFCNiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxOEZGQ0I4QzRGQzAxMUU1OEZDQkRDQzRDRjk5NTFCNiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1ICgxMi4weDIwMTAwMTE1IFsyMDEwMDExNS5tLjk5OCAyMDEwLzAxLzE1OjAyOjAwOjAwIGN1dG9mZjsgbSBicmFuY2hdKSAgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQyODgxRTA3Q0Y0QkU1MTFBNDAxQ0ZFNjYwMThDOEQ4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk3OEZERUM1Q0U0QkU1MTE4NjMzRjc5OEU1NzY5RjlFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+255RSAAAAIRQTFRFZGRk////tra2ZmZm+/v7yMjI19fXxcXFvb29zs7OvLy8bW1taGhom5ub/f39v7+/3Nzc5OTk5+fnr6+vdnZ2jIyMl5eX3t7ea2tr0NDQpKSkaWlpw8PDqampxsbGk5OT+Pj4oqKip6en9vb2wcHB5eXlzMzM+vr6c3NzsbGxq6urkJCQ6UeXDAAAAIBJREFUeNpkj+cSgkAMhLPkCh1UsABWsOH7v58H54kj+ZHNl0w2E6L/CLJvechNOqeaLXa4DJKkQWyENVa2vxZqSyzhub2jyB83+JPn636C/rkRLSGKCWuFsF1EDnmHJ5VCxR/ORucE0qKHcNTeHqzQkBvsTd5Idkb+dfbdW4ABAC66BHBvPiSTAAAAAElFTkSuQmCC"></span></span>';
      e.onclick = function (a) {
        a = a || window.event;
        t
          ? ((e.style.height = "1px"),
            setTimeout(function () {
              q(e);
            }, 300))
          : q(e);
        a.stopPropagation();
        return !1;
      };
      document.body.appendChild(e);
      t
        ? ((e.style.transition = "height 0.3s ease-in-out"),
          setTimeout(function () {
            e.style.height = d.height + "px";
          }, 50))
        : (e.style.height = d.height + "px");
      c(e);
      return !0;
    },
    I = function (a, b) {
      a =
        "<span>" +
        a +
        '<span href="#" class="bsb-close"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NzhGREVDNUNFNEJFNTExODYzM0Y3OThFNTc2OUY5RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxOEZGQ0I4RDRGQzAxMUU1OEZDQkRDQzRDRjk5NTFCNiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxOEZGQ0I4QzRGQzAxMUU1OEZDQkRDQzRDRjk5NTFCNiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1ICgxMi4weDIwMTAwMTE1IFsyMDEwMDExNS5tLjk5OCAyMDEwLzAxLzE1OjAyOjAwOjAwIGN1dG9mZjsgbSBicmFuY2hdKSAgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQyODgxRTA3Q0Y0QkU1MTFBNDAxQ0ZFNjYwMThDOEQ4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk3OEZERUM1Q0U0QkU1MTE4NjMzRjc5OEU1NzY5RjlFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+255RSAAAAIRQTFRFZGRk////tra2ZmZm+/v7yMjI19fXxcXFvb29zs7OvLy8bW1taGhom5ub/f39v7+/3Nzc5OTk5+fnr6+vdnZ2jIyMl5eX3t7ea2tr0NDQpKSkaWlpw8PDqampxsbGk5OT+Pj4oqKip6en9vb2wcHB5eXlzMzM+vr6c3NzsbGxq6urkJCQ6UeXDAAAAIBJREFUeNpkj+cSgkAMhLPkCh1UsABWsOH7v58H54kj+ZHNl0w2E6L/CLJvechNOqeaLXa4DJKkQWyENVa2vxZqSyzhub2jyB83+JPn636C/rkRLSGKCWuFsF1EDnmHJ5VCxR/ORucE0qKHcNTeHqzQkBvsTd5Idkb+dfbdW4ABAC66BHBvPiSTAAAAAElFTkSuQmCC"></span></span>';
      var c = E();
      c.style.zIndex = D() + 1;
      c.style.textAlign = "center";
      c.style.position = "absolute";
      c.style.bottom = "";
      c.style.height = "0px";
      c.style.left = "0px";
      c.style.overflow = "hidden";
      c.style.backgroundColor = d.bgcolor;
      var e = document.createElement("div");
      e.style.height = "0px";
      e.id = k + "_padding";
      e.className = "bs-float-embed-cont-padding";
      t &&
        ((c.style.transition = "height 0.3s ease-in-out"),
        (e.style.transition = "height 0.3s ease-in-out"));
      document.body.insertBefore(e, document.body.childNodes[0]);
      document.body.appendChild(c);
      setTimeout(function () {
        c.style.height = d.height + "px";
        e.style.height = d.height + "px";
        c.innerHTML = a;
        var f = c.getElementsByClassName("bsb-close")[0];
        f.onmousedown = function (a) {
          a.stopPropagation();
        };
        f.onclick = function (a) {
          c.style.height = "0px";
          e.style.height = "0px";
          G(d.hash, "top", "center", u);
          setTimeout(function () {
            q(c, e);
          }, 500);
          a.stopPropagation();
          return !1;
        };
        b(c);
      }, 50);
    },
    F = function () {
      var a = d.width,
        b = d.height;
      "popup" == g && ((a += 30), (b += 30));
      return a < z() && b < y() ? !0 : !1;
    },
    C = function () {
      var a = document.getElementById(k);
      if (!a) return !0;
      if (!F()) return q(), !0;
      "bottom" == g &&
        ("left" == p || "right" == p) &&
        0 < w &&
        d.width + w > z() &&
        (a.style[p] = z() - d.width + "px");
      return !0;
    },
    q = function (a, b) {
      a || (a = document.getElementById(k));
      !b && a && a.id && (b = document.getElementById(a.id + "_padding"));
      if (!a || !a.parentNode) return !1;
      a.parentNode.removeChild(a);
      b && b.parentNode && b.parentNode.removeChild(b);
      return !0;
    },
    E = function () {
      var a = document.createElement("div");
      a.style.textAlign = p;
      a.style.position = "fixed";
      a.style.top = "0px";
      a.style.bottom = "0px";
      a.style.width = "100%";
      a.style.boxSizing = "border-box";
      try {
        a.style.backgroundColor = "rgba(92, 92, 92, 0.8)";
      } catch (b) {
        a.style.backgroundColor = "rgb(92, 92, 92)";
      }
      a.style.fontSize = "0px";
      a.id = k;
      a.className = "bs-float-embed-cont bs-float-embed-cont-" + g;
      a.onmousedown = function (a) {
        a.stopPropagation();
      };
      a.getElementsByClassName ||
        (a.getElementsByClassName = function (a) {
          for (
            var c = [], d = this.getElementsByTagName("*"), f = 0;
            f < d.length;
            f++
          )
            -1 < (" " + d[f].className + " ").indexOf(" " + a + " ") &&
              c.push(d[f]);
          return c;
        });
      return a;
    },
    G = function (a, b, c, d) {
      a = a + "_" + b + "_" + c + "_" + d;
      (b = (b = localStorage.getItem("bsBannersOpened"))
        ? JSON.parse(b.toString())
        : !1) || (b = {});
      b[a] = Math.round(+new Date() / 1e3);
      b = JSON.stringify(b);
      localStorage.setItem("bsBannersOpened", b);
      return !0;
    },
    M = function (a, b, c, d) {
      a = a + "_" + b + "_" + c + "_" + d;
      return (b = (b = localStorage.getItem("bsBannersOpened"))
        ? JSON.parse(b.toString())
        : !1) && b[a]
        ? Math.round(+new Date() / 1e3) - b[a]
        : !1;
    };
})(bannersnack_embed);
