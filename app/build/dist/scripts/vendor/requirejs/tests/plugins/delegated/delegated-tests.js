require.config({baseUrl:requirejs.isBrowser?"./":"./plugins/fromTextEvalError",paths:{refine:"../fromText/refine",text:"../../../../text/text"},map:{"*":{r:"refine"}}}),require(["delegated!r!a"],function(e){doh.register("pluginsDelegated",[function(n){n.is("a",e.name)}]),doh.run()});