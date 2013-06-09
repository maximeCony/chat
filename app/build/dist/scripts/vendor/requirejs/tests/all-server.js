/**
 * @license RequireJS Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

var skipDohSetup=!0,fs,vm,load,env;(function(){typeof Packages!="undefined"?env="rhino":typeof process!="undefined"&&(env="node",fs=require("fs"),vm=require("vm"),load=function(e){return vm.runInThisContext(require.makeNodeWrapper(fs.readFileSync(e,"utf8"),e))})})(),load("doh/runner.js"),load("doh/_"+env+"Runner.js"),load("simple-tests.js"),delete requirejs.s.contexts._,load("circular-tests.js"),delete requirejs.s.contexts._,load("relative/relative-tests.js"),delete requirejs.s.contexts._,load("relative/relativeBaseUrl-tests.js"),delete requirejs.s.contexts._,load("exports/exports-tests.js"),delete requirejs.s.contexts._,load("exports/moduleAndExports-tests.js"),delete requirejs.s.contexts._,load("anon/anon-tests.js"),delete requirejs.s.contexts._,load("packages/packages-tests.js"),delete requirejs.s.contexts._,load("plugins/sync-tests.js"),delete requirejs.s.contexts._,load("plugins/fromText/fromText-tests.js"),delete requirejs.s.contexts._,load("plugins/textDepend/textDepend-tests.js"),delete requirejs.s.contexts._,load("universal/universal-tests.js"),delete requirejs.s.contexts._,load("defineError/defineError-tests.js"),delete requirejs.s.contexts._,load("circular/circularPlugin-tests.js"),doh.run();