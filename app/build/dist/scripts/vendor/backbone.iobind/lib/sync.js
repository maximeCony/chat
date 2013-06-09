/*!
 * backbone.iobind - Backbone.sync replacement
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

Backbone.sync=function(e,t,n){var r=_.extend({},n);r.url?r.url=_.result(r,"url"):r.url=_.result(t,"url")||urlError();var i=r.url.split("/"),s=i[0]!==""?i[0]:i[1];!r.data&&t&&(r.data=r.attrs||t.toJSON(n)||{}),r.patch===!0&&r.data.id==null&&t&&(r.data.id=t.id);var o=t.socket||Backbone.socket||window.socket,u=$.Deferred();o.emit(s+":"+e,r.data,function(e,t){e?(n.error&&n.error(e),u.reject()):(n.success&&n.success(t),u.resolve())});var a=u.promise();return t.trigger("request",t,a,n),a};var urlError=function(){throw new Error('A "url" property or function must be specified')};