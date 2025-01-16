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
                    const buttonText = CX1405.getButtonText();
                    CX1405.renderButtonText(document.querySelector('[data-testid*="pdpActionButton"] [class*="ButtonText"]'), buttonText);
                    
                    // mobile sticky A2B button
                    if (document.querySelector('[data-testid*="stickyAddToBagButton"] [class*="StickyAddToBag_AddToBagButtonText"]')) {
                        const buttonText = CX1405.getButtonText();
                        CX1405.renderButtonText(document.querySelector('[data-testid="stickyAddToBagButton-addToBag-pvh-button"] [class*="StickyAddToBag_AddToBagButtonText"]'), buttonText);
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
    getButtonText: () => {
        let buttonText = '';
        const selectedSizes = JSON.stringify(CX1405.selectedSizes);

        if (!selectedSizes.includes("{}")) {
            const isInStock = CX1405.checkInStock();
            if (isInStock) {
                console.log(`button text = Add to bag`);
                buttonText = `Add to bag*`;
            } else {
                console.log(`button text = Notify me`);
                buttonText = `Notify me*`;
            }
            
        } else {
            console.log(`button text = Select a size`);
            buttonText = `Select a size*`;
        }
        return buttonText;
        /*
        - if all size params
            - if all size params are in stock
                - button text = "Add to bag"
            - else if all size params are oos
                - button text = "Notify me" 
        - else
            button text = "Select a size"
        */

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
    renderButtonText: (button, buttonText) => {
        button.textContent = buttonText;
    },
    init: () => {
        optimizely.utils.waitForElement('[class*="ProductSizeSelector_SizeList_"]')
            .then(() => {
                CX1405.observeSizeSelection();
            });

        optimizely.utils.observeSelector('[data-testid*="stickyAddToBagButton"] [class*="StickyAddToBag_AddToBagButtonText"]', stickyButton => {
            const buttonText = CX1405.getButtonText();
            CX1405.renderButtonText(stickyButton, buttonText);
        })
    }
}
CX1405.init();