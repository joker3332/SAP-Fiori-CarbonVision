sap.ui.define(["sap/fe/core/AppComponent"], function(AppComponent) {
	"use strict";
	return AppComponent.extend("aichatbot.Component", {
		metadata: { manifest: "json" }
	});
});

sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("aichatbot.Controller", {
        onInit: function () {
            // Your initialization logic here
            this.initializeChatAI();
        },

        initializeChatAI: function () {
            new ChatAI({
                container: '.chat-ai',
                api_key: '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',
                model: 'gpt-3.5-turbo',
                max_tokens: 500
            });
        }
    });
});

/* eslint no-undef:0 */