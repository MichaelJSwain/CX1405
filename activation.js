function callbackFn(activate, options) {
    optimizely.utils.waitUntil(() => {
        return window &&
        window.__NEXT_DATA__ &&
        window.__NEXT_DATA__.page;
    }).then(() => {
        if (window.__NEXT_DATA__.page === "/pdp") {
            optimizely.utils.waitForElement('[data-testid*="button-size"]')
                .then(sizeButton => {
                    if (sizeButton.getAttribute('data-testid').indexOf('One Size') < 0) {
                        activate();
                    }
                })
        }
    });
}