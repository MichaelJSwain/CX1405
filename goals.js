optimizely.utils.waitForElement('[data-testid*="pdpActionButton"]')
    .then(button => {
        button.addEventListener('click', () => {
            if (button.textContent.toLowerCase() === 'select a size') {
                optimizely.sendAnalyticsEvents(`CX1405 - Clicks on Select size CTA`);
            }
        });
    });
optimizely.utils.observeSelector('[data-testid="selectSizeError"]', () => {
    optimizely.sendAnalyticsEvents("CX1405 - Please select a size message is shown");
});
optimizely.utils.waitForElement('[data-testid="pdp-size-guide"]', sizeGuide => {
    sizeGuide.addEventListener('click', () => {
        optimizely.sendAnalyticsEvents("CX1405 - Clicks on size guide");
    });
});