const isSelected = [];

const getSelectedSize = () => {
    let res = '';
    isSelected.forEach(param => {
        res += `${Object.keys(param)[0]} `;
    })
    return res;
}

const renderButtonText = () => {
    
    const val = JSON.stringify(isSelected);
    console.log(val);
    
    if (!document.querySelector('[data-testid="pdpActionButton-itemAdded-pvh-button"]') && !document.querySelector('[data-testid*="pdpActionButton"][disabled]')) {
        if (!val.includes("{}")) {
            if (document.querySelector('[data-testid="pdpActionButton-notifyMe-pvh-button"]')) {
                document.querySelector('[data-testid*="pdpActionButton"] [class*="ProductActions_AddToBagButtonText"]').textContent = "NOTIFY ME";
            } else {
                const selectedSize = getSelectedSize();
                console.log('selected size ===> ', isSelected);
                console.log(document.querySelector('[data-testid*="pdpActionButton"] [class*="ButtonText"]'))
                optimizely.utils.waitForElement('[data-testid*="pdpActionButton"] [class*="ProductActions_AddToBagButtonText"]')
                    .then(elem => {
                        document.querySelector('[data-testid*="pdpActionButton"] [class*="ProductActions_AddToBagButtonText"]').textContent = `ADD TO BAG ・ SIZE ${selectedSize}`;
                    })
                    
                
                
            }
        } else {
            document.querySelector('[data-testid*="pdpActionButton"] [class*="ProductActions_AddToBagButtonText"]').textContent = "SELECT A SIZE";
        }
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
                        isSelected[idx][mutation.target.textContent] = mutation.target.classList.value.includes('ProductSize_IsOos') ? 'outOfStock' : 'inStock';
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