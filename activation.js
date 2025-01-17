function callbackFn(activate, options) {
    optimizely.utils.waitUntil(() => {
        return window &&
        window.__NEXT_DATA__ &&
        window.__NEXT_DATA__.page;
    }).then(() => {
        if (window.__NEXT_DATA__.page === "/pdp") {
            optimizely.utils.waitUntil(() => {
                return document.querySelectorAll('[class*="ProductSizeSelector_SizeList"]').length &&   
                document.querySelectorAll('[data-testid="ProductSize-component"] button').length;
            })
                .then(() => {
                    if (document.querySelector('[data-testid="ProductSize-component"] button').getAttribute('data-testid').indexOf('One Size') < 0) {
                        activate();
                    }
                })
        }
    });
}