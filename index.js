const isSelected = [];

const renderButtonText = () => {
    console.log('is selected => ', JSON.stringify(isSelected));
    const val = JSON.stringify(isSelected);
    if (!val.includes("{}")) {
        if (val.includes("oos")) {
            document.querySelector('[data-testid*="pdpActionButton"] [class*="ProductActions_AddToBagButtonText"]').textContent = "NOTIFY ME";
        } else {
            document.querySelector('[data-testid*="pdpActionButton"] [class*="ProductActions_AddToBagButtonText"]').textContent = "ADD TO BAG";
        }
    } else {
        document.querySelector('[data-testid*="pdpActionButton"] [class*="ProductActions_AddToBagButtonText"]').textContent = "SELECT A SIZE";
    }
}

optimizely.utils.waitForElement('[class*="ProductSizeSelector_SizeList_"]')
    .then(() => {
        const sizeParams = document.querySelectorAll('[class*="ProductSizeSelector_SizeList_"]');

        sizeParams.forEach((param, idx) => {
            isSelected.push({});
            const config = { attributes: true, childList: true, subtree: true, attributeOldValue: true };

            const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                
                if (mutation.type === "attributes" && mutation.target.classList.value.includes('SizeButton')) {
                    
                    if (mutation.target.classList.value.includes('SizeSelected')) {
                        isSelected[idx][mutation.target.textContent] = mutation.target.classList.value.includes('ProductSize_IsOos') ? 'oos' : 'is';
                    } else if (mutation.oldValue.includes('SizeSelected')) {
                        
                        delete isSelected[idx][mutation.target.textContent];
                        
                    }
                    renderButtonText();
                }
            }
            };

            const observer = new MutationObserver(callback);
            observer.observe(param, config);
                    })

        renderButtonText();
    })