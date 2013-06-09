/*!
 * backbone.iobind - Model
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Version
 */

Backbone.Model.prototype.ioBindVersion="@VERSION",Backbone.Model.prototype.ioBind=function(e,t,n,r){var i=this._ioEvents||(this._ioEvents={}),s=this.url()+":"+e,o=this;"function"==typeof t&&(r=n,n=t,t=this.socket||window.socket||Backbone.socket);var u={name:e,global:s,cbLocal:n,cbGlobal:function(){var t=[e];t.push.apply(t,arguments),o.trigger.apply(o,t)}};return this.bind(u.name,u.cbLocal,r||o),t.on(u.global,u.cbGlobal),i[u.name]?i[u.name].push(u):i[u.name]=[u],this},Backbone.Model.prototype.ioUnbind=function(e,t,n){var r=this._ioEvents||(this._ioEvents={}),i=this.url()+":"+e;"function"==typeof t&&(n=t,t=this.socket||window.socket||Backbone.socket);var s=r[e];if(!_.isEmpty(s)){if(n&&"function"==typeof n){for(var o=0,u=s.length;o<u;o++)n==s[o].cbLocal&&(this.unbind(s[o].name,s[o].cbLocal),t.removeListener(s[o].global,s[o].cbGlobal),s[o]=!1);s=_.compact(s)}else this.unbind(e),t.removeAllListeners(i);s.length===0&&delete r[e]}return this},Backbone.Model.prototype.ioUnbindAll=function(e){var t=this._ioEvents||(this._ioEvents={});e||(e=this.socket||window.socket||Backbone.socket);for(var n in t)this.ioUnbind(n,e);return this};