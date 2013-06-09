/*!
 * backbone.iobind - Backbone.sync replacement
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

define(["jquery","underscore","backbone"],function(e,t,n){n.sync=function(i,s,o){var u=t.extend({},o);u.url?u.url=t.result(u,"url"):u.url=t.result(s,"url")||r();var a=u.url.split("/"),f=a[0]!==""?a[0]:a[1];!u.data&&s&&(u.data=u.attrs||s.toJSON(o)||{}),u.patch===!0&&u.data.id==null&&s&&(u.data.id=s.id);var l=s.socket||n.socket||window.socket,c=e.Deferred();l.emit(f+":"+i,u.data,function(e,t){e?(o.error&&o.error(e),c.reject()):(o.success&&o.success(t),c.resolve())});var h=c.promise();return s.trigger("request",s,h,o),h};var r=function(){throw new Error('A "url" property or function must be specified')}});