$(document).ready(function(){var e=Backbone.Collection.extend({url:function(){return"/library"}}),t,n={title:"The Tempest",author:"Bill Shakespeare",length:123};module("Backbone.sync",_.extend(new Environment,{setup:function(){Environment.prototype.setup.apply(this,arguments),t=new e,t.create(n,{wait:!1})},teardown:function(){Environment.prototype.teardown.apply(this,arguments),Backbone.emulateHTTP=!1}})),test("read",4,function(){t.fetch(),equal(this.ajaxSettings.url,"/library"),equal(this.ajaxSettings.type,"GET"),equal(this.ajaxSettings.dataType,"json"),ok(_.isEmpty(this.ajaxSettings.data))}),test("passing data",3,function(){t.fetch({data:{a:"a",one:1}}),equal(this.ajaxSettings.url,"/library"),equal(this.ajaxSettings.data.a,"a"),equal(this.ajaxSettings.data.one,1)}),test("create",6,function(){equal(this.ajaxSettings.url,"/library"),equal(this.ajaxSettings.type,"POST"),equal(this.ajaxSettings.dataType,"json");var e=JSON.parse(this.ajaxSettings.data);equal(e.title,"The Tempest"),equal(e.author,"Bill Shakespeare"),equal(e.length,123)}),test("update",7,function(){t.first().save({id:"1-the-tempest",author:"William Shakespeare"}),equal(this.ajaxSettings.url,"/library/1-the-tempest"),equal(this.ajaxSettings.type,"PUT"),equal(this.ajaxSettings.dataType,"json");var e=JSON.parse(this.ajaxSettings.data);equal(e.id,"1-the-tempest"),equal(e.title,"The Tempest"),equal(e.author,"William Shakespeare"),equal(e.length,123)}),test("update with emulateHTTP and emulateJSON",7,function(){t.first().save({id:"2-the-tempest",author:"Tim Shakespeare"},{emulateHTTP:!0,emulateJSON:!0}),equal(this.ajaxSettings.url,"/library/2-the-tempest"),equal(this.ajaxSettings.type,"POST"),equal(this.ajaxSettings.dataType,"json"),equal(this.ajaxSettings.data._method,"PUT");var e=JSON.parse(this.ajaxSettings.data.model);equal(e.id,"2-the-tempest"),equal(e.author,"Tim Shakespeare"),equal(e.length,123)}),test("update with just emulateHTTP",6,function(){t.first().save({id:"2-the-tempest",author:"Tim Shakespeare"},{emulateHTTP:!0}),equal(this.ajaxSettings.url,"/library/2-the-tempest"),equal(this.ajaxSettings.type,"POST"),equal(this.ajaxSettings.contentType,"application/json");var e=JSON.parse(this.ajaxSettings.data);equal(e.id,"2-the-tempest"),equal(e.author,"Tim Shakespeare"),equal(e.length,123)}),test("update with just emulateJSON",6,function(){t.first().save({id:"2-the-tempest",author:"Tim Shakespeare"},{emulateJSON:!0}),equal(this.ajaxSettings.url,"/library/2-the-tempest"),equal(this.ajaxSettings.type,"PUT"),equal(this.ajaxSettings.contentType,"application/x-www-form-urlencoded");var e=JSON.parse(this.ajaxSettings.data.model);equal(e.id,"2-the-tempest"),equal(e.author,"Tim Shakespeare"),equal(e.length,123)}),test("read model",3,function(){t.first().save({id:"2-the-tempest",author:"Tim Shakespeare"}),t.first().fetch(),equal(this.ajaxSettings.url,"/library/2-the-tempest"),equal(this.ajaxSettings.type,"GET"),ok(_.isEmpty(this.ajaxSettings.data))}),test("destroy",3,function(){t.first().save({id:"2-the-tempest",author:"Tim Shakespeare"}),t.first().destroy({wait:!0}),equal(this.ajaxSettings.url,"/library/2-the-tempest"),equal(this.ajaxSettings.type,"DELETE"),equal(this.ajaxSettings.data,null)}),test("destroy with emulateHTTP",3,function(){t.first().save({id:"2-the-tempest",author:"Tim Shakespeare"}),t.first().destroy({emulateHTTP:!0,emulateJSON:!0}),equal(this.ajaxSettings.url,"/library/2-the-tempest"),equal(this.ajaxSettings.type,"POST"),equal(JSON.stringify(this.ajaxSettings.data),'{"_method":"DELETE"}')}),test("urlError",2,function(){var e=new Backbone.Model;raises(function(){e.fetch()}),e.fetch({url:"/one/two"}),equal(this.ajaxSettings.url,"/one/two")}),test("#1052 - `options` is optional.",0,function(){var e=new Backbone.Model;e.url="/test",Backbone.sync("create",e)}),test("Backbone.ajax",1,function(){Backbone.ajax=function(e){strictEqual(e.url,"/test")};var e=new Backbone.Model;e.url="/test",Backbone.sync("create",e)}),test("Call provided error callback on error.",1,function(){var e=new Backbone.Model;e.url="/test",Backbone.sync("read",e,{error:function(){ok(!0)}}),this.ajaxSettings.error()}),test("Use Backbone.emulateHTTP as default.",2,function(){var e=new Backbone.Model;e.url="/test",Backbone.emulateHTTP=!0,e.sync("create",e),strictEqual(this.ajaxSettings.emulateHTTP,!0),Backbone.emulateHTTP=!1,e.sync("create",e),strictEqual(this.ajaxSettings.emulateHTTP,!1)}),test("Use Backbone.emulateJSON as default.",2,function(){var e=new Backbone.Model;e.url="/test",Backbone.emulateJSON=!0,e.sync("create",e),strictEqual(this.ajaxSettings.emulateJSON,!0),Backbone.emulateJSON=!1,e.sync("create",e),strictEqual(this.ajaxSettings.emulateJSON,!1)}),test("#1756 - Call user provided beforeSend function.",4,function(){Backbone.emulateHTTP=!0;var e=new Backbone.Model;e.url="/test";var t={setRequestHeader:function(e,t){strictEqual(e,"X-HTTP-Method-Override"),strictEqual(t,"DELETE")}};e.sync("delete",e,{beforeSend:function(e){return ok(e===t),!1}}),strictEqual(this.ajaxSettings.beforeSend(t),!1)})});