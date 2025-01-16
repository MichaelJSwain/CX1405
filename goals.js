optimizely.utils.waitForElement('[data-testid*="pdpActionButton"]')
    .then(button => {
        button.addEventListener('click', () => {
            if (button.textContent.toLowerCase() === 'add to bag') {
                console.log(`Clicks on Add to bag CTA`);
            } else if (button.textContent.toLowerCase() === 'select a size') {
                console.log(`Clicks on Select size CTA`);
            }
        })
    })