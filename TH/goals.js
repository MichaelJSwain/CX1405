optimizely.utils.waitForElement('[data-testid*="pdpActionButton"]')
    .then(button => {
        button.addEventListener('click', () => {
            if (button.textContent.toLowerCase() === 'select a size') {
                optimizely.sendAnalyticsEvents(`CX1045 - Clicks on Select size CTA`);
            }
        });
    });
optimizely.utils.observeSelector('[data-testid="selectSizeError"]', () => {
    optimizely.sendAnalyticsEvents("CX1045 - Please select a size message is shown");
});
optimizely.utils.waitForElement('[class*="PdpSizeGuide_SizeGuideButton"]')
    .then(sizeGuideButton => {
        sizeGuideButton.addEventListener('click', () => {
            optimizely.sendAnalyticsEvents("CX1045 - Clicks on size guide");
        });
    });