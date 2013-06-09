/*!
 * backbone.iobind - Model
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Version
 */

/*!
 * backbone.iobind - Collection
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

define(["jquery","underscore","backbone"],function(e,t,n){n.Model.prototype.ioBindVersion="0.4.6",n.Model.prototype.ioBind=function(e,t,r,i){var s=this._ioEvents||(this._ioEvents={}),o=this.url()+":"+e,u=this;"function"==typeof t&&(i=r,r=t,t=this.socket||window.socket||n.socket);var a={name:e,global:o,cbLocal:r,cbGlobal:function(){var t=[e];t.push.apply(t,arguments),u.trigger.apply(u,t)}};return this.bind(a.name,a.cbLocal,i||u),t.on(a.global,a.cbGlobal),s[a.name]?s[a.name].push(a):s[a.name]=[a],this},n.Model.prototype.ioUnbind=function(e,r,i){var s=this._ioEvents||(this._ioEvents={}),o=this.url()+":"+e;"function"==typeof r&&(i=r,r=this.socket||window.socket||n.socket);var u=s[e];if(!t.isEmpty(u)){if(i&&"function"==typeof i){for(var a=0,f=u.length;a<f;a++)i==u[a].cbLocal&&(this.unbind(u[a].name,u[a].cbLocal),r.removeListener(u[a].global,u[a].cbGlobal),u[a]=!1);u=t.compact(u)}else this.unbind(e),r.removeAllListeners(o);u.length===0&&delete s[e]}return this},n.Model.prototype.ioUnbindAll=function(e){var t=this._ioEvents||(this._ioEvents={});e||(e=this.socket||window.socket||n.socket);for(var r in t)this.ioUnbind(r,e);return this},n.Collection.prototype.ioBindVersion="0.4.6",n.Collection.prototype.ioBind=function(e,t,r,i){var s=this._ioEvents||(this._ioEvents={}),o=this.url+":"+e,u=this;"function"==typeof t&&(i=r,r=t,t=this.socket||window.socket||n.socket);var a={name:e,global:o,cbLocal:r,cbGlobal:function(){var t=[e];t.push.apply(t,arguments),u.trigger.apply(u,t)}};return this.bind(a.name,a.cbLocal,i),t.on(a.global,a.cbGlobal),s[a.name]?s[a.name].push(a):s[a.name]=[a],this},n.Collection.prototype.ioUnbind=function(e,r,i){var s=this._ioEvents||(this._ioEvents={}),o=this.url+":"+e;"function"==typeof r&&(i=r,r=this.socket||window.socket||n.socket);var u=s[e];if(!t.isEmpty(u)){if(i&&"function"==typeof i){for(var a=0,f=u.length;a<f;a++)i==u[a].cbLocal&&(this.unbind(u[a].name,u[a].cbLocal),r.removeListener(u[a].global,u[a].cbGlobal),u[a]=!1);u=t.compact(u)}else this.unbind(e),r.removeAllListeners(o);u.length===0&&delete s[e]}return this},n.Collection.prototype.ioUnbindAll=function(e){var t=this._ioEvents||(this._ioEvents={});e||(e=this.socket||window.socket||n.socket);for(var r in t)this.ioUnbind(r,e);return this}});