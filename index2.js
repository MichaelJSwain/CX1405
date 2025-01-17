const CX1405 = {
    selectedSizes: [],
    observeSizeSelection: () => {
        const sizeParams = document.querySelectorAll('[class*="ProductSizeSelector_SizeList_"]');

        sizeParams.forEach((param, idx) => {
            CX1405.selectedSizes.push({});

            const config = { attributes: true, childList: true, subtree: true, attributeOldValue: true };

            const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                
                if (mutation.type === "attributes" && mutation.target.classList.value.includes('SizeButton')) {
                    CX1405.setSelectedSizes(mutation, idx);
                    CX1405.renderButtonText();
                    
                    // mobile sticky A2B button
                    if (document.querySelector('[data-testid*="stickyAddToBagButton"] [class*="StickyAddToBag_AddToBagButtonText"]')) {
                        CX1405.renderButtonText();
                    }
                }
            }
            };

            const observer = new MutationObserver(callback);
            observer.observe(param, config);
                    })

                    // console.log(selectedSizes);
    },
    setSelectedSizes: (mutation, idx) => {
        if (mutation.target.classList.value.includes('SizeSelected')) {
            CX1405.selectedSizes[idx][mutation.target.textContent] = mutation.target.classList.value.includes('ProductSize_IsOos') ? 'outOfStock' : 'inStock';
        } else if (mutation.oldValue.includes('SizeSelected')) {
            delete CX1405.selectedSizes[idx][mutation.target.textContent];
        }
        // console.log("set selected size => ", CX1405.selectedSizes);
    },
    getSelectedSize: () => {
        let res = '';
        CX1405.selectedSizes.forEach(param => {
            res += `${Object.keys(param)[0]} `;
        })
        return res;
    },
    getButtonText: () => {
        let buttonText = '';
        const selectedSizes = JSON.stringify(CX1405.selectedSizes);
        const userSelection = CX1405.getSelectedSize();

        if (!selectedSizes.includes("{}")) {
            const isInStock = CX1405.checkInStock();
            if (isInStock) {
                console.log(`button text = Add to bag`);
                buttonText = `Add to bag - Size ${userSelection}`;
            } else {
                console.log(`button text = Notify me`);
                buttonText = `Notify me`;
            }
            
        } else {
            console.log(`button text = Select a size`);
            buttonText = `Select a size`;
        }
        return buttonText;
    },
    checkInStock: () => {
        let res = true;
        CX1405.selectedSizes.forEach(param => {
            if (JSON.stringify(param).includes('outOfStock')) {
                res = false;
            }
        });
        return res;
    },
    renderButtonText: () => {
        if (!document.querySelector('[data-testid="pdpActionButton-itemAdded-pvh-button"]')) {
            const buttonText = CX1405.getButtonText();
            if (document.querySelector('[data-testid*="pdpActionButton"] [class*="ButtonText"]')) {
                document.querySelector('[data-testid*="pdpActionButton"] [class*="ButtonText"]').textContent = buttonText;
            }
            if (document.querySelector('[data-testid*="stickyAddToBagButton"] [class*="StickyAddToBag_AddToBagButtonText"]')) {
                document.querySelector('[data-testid*="stickyAddToBagButton"] [class*="StickyAddToBag_AddToBagButtonText"]').textContent = buttonText;
            }
        }
    },
    observeButtonMutations: () => {
        const config = { attributes: true, childList: true, subtree: true, attributeOldValue: true };

        const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === "attributes" && mutation.target.attributes['data-testid'].value.includes("addToBag")) {
                if (mutation.attributeName === "data-testid") {
                    CX1405.renderButtonText();
                }
            }
        }
        };
        
        const target = document.querySelector('[data-testid*="pdpActionButton"]');
        const observer = new MutationObserver(callback);
        observer.observe(target, config);
    },
    init: () => {
   
        optimizely.utils.waitForElement('[class*="ProductSizeSelector_SizeList_"]')
            .then(() => {
                CX1405.observeSizeSelection();
                CX1405.observeButtonMutations();
                CX1405.renderButtonText();
            });

        optimizely.utils.observeSelector('[data-testid*="stickyAddToBagButton"] [class*="StickyAddToBag_AddToBagButtonText"]', stickyButton => {
            CX1405.renderButtonText();
        })
    }
}
CX1405.init();