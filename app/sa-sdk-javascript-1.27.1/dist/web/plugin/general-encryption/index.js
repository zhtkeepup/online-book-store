(window.SensorsDataWebJSSDKPlugin=window.SensorsDataWebJSSDKPlugin||{}).GeneralEncryption=function(){"use strict";function n(n,e,t){if(e&&(n.plugin_name=e),t&&n.init){var r=n.init;n.init=function(o,a){function c(){r.call(n,o,a)}return i(o,n,e),o.readyState&&o.readyState.state>=3||!o.on?c():void o.on(t,c)}}return n}function i(n,i,e){function t(i,t){n.logger?n.logger.msg.apply(n.logger,t).module(e+""||"").level(i).log():n.log&&n.log.apply(n,t)}i.log=function(){t("log",arguments)},i.warn=function(){t("warn",arguments)},i.error=function(){t("error",arguments)}}function e(i,e,t){return n(i,e,t),i.plugin_version=o,i}var t,r,o="1.27.1",a={init:function(n,i){t=n,r=t._;var e=i&&i.encrypt_utils,o=window.console&&window.console.log||function(){};o=t&&t.log||o;var a=t.kit.encodeTrackData;return t&&t.kit&&a?r.isObject(e)&&r.isFunction(e.encryptEvent)&&r.isFunction(e.encryptSymmetricKeyWithPublicKey)&&r.isString(i.pub_key)&&r.isNumber(i.pkv)?(t.kit.encodeTrackData=function(n){try{var c=e.encryptEvent,l=e.encryptSymmetricKeyWithPublicKey,u=i.pkv,y=i.pub_key;if(r.isFunction(e.encryptEvent)){var p=c(n),s=t._.base64Encode(p),d={pkv:u,ekey:l(y),payloads:[s]},g=JSON.stringify(d),f=encodeURIComponent(g);return"data="+f}return a.call(t.kit,n)}catch(v){return o("Encrypted data exception."),a.call(t.kit,n)}},void o("GeneralEncryption Plugin initialized successfully.")):void o("GeneralEncryption Plugin initialization failed. parameter error."):void o("Web SDK initialization failed.")}},c=e(a,"GeneralEncryption","sdkReady");return c}();