const CX1405 = {
    copy: {
        gb: {
            prompt: 'Select A Size',
            a2b: 'Add To Bag',
            notify: 'Notify Me'
        },
        nl: {
            prompt: 'Selecteer een maat',
            a2b: 'Toevoegen',
            notify: 'Waarschuw mij'
        },
        de: {
            prompt: 'Wähle eine Größe aus',
            a2b: 'Hinzufügen',
            notify: 'Benachrichtigen Sie mich'
        },
        fr: {
            prompt: 'Sélectionnez une taille',
            a2b: 'Ajouter Au Panier',
            notify: "M'informer"
        },
        it: {
            prompt: 'Seleziona una taglia',
            a2b: 'Aggiungi Al Carrello',
            notify: 'Avvisami'
        },
        es: {
            prompt: 'Selecciona una talla',
            a2b: 'Añadir A La Cesta',
            notify: 'Notifícame'
        },
        pl: {
            prompt: 'Wybierz rozmiar',
            a2b: 'Dodaj Do Koszyka',
            notify: 'Powiadom mnie'
        }
    }[window.__NEXT_DATA__.props.pageProps.initialState.currentStore.target],
    sizeParams: [],
    observeSizeSelection: () => {
        const sizeParams = document.querySelectorAll('[class*="ProductSizeSelector_SizeList_"]');

        sizeParams.forEach((param, idx) => {
            CX1405.sizeParams.push({});

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
                    });
    },
    setSelectedSizes: (mutation, idx) => {
        if (mutation.target.classList.value.includes('SizeSelected')) {
            CX1405.sizeParams[idx][mutation.target.textContent] = mutation.target.classList.value.includes('ProductSize_IsOos') ? 'outOfStock' : 'inStock';
        } else if (mutation.oldValue.includes('SizeSelected')) {
            delete CX1405.sizeParams[idx][mutation.target.textContent];
        }
    },
    getButtonText: () => {
        let buttonText = '';
        const selectedSizes = JSON.stringify(CX1405.sizeParams);

        if (!selectedSizes.includes("{}")) {
            const isInStock = CX1405.checkInStock();
            buttonText = isInStock ? CX1405.copy.a2b : CX1405.copy.notify;
        } else {
            buttonText = CX1405.copy.prompt;
        }
        return buttonText;
    },
    checkInStock: () => {
        let res = true;
        CX1405.sizeParams.forEach(param => {
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
        CX1405.observeSizeSelection();
        CX1405.observeButtonMutations();
        CX1405.renderButtonText();

        optimizely.utils.observeSelector('[data-testid*="stickyAddToBagButton"] [class*="StickyAddToBag_AddToBagButtonText"]', stickyButton => {
            CX1405.renderButtonText();
        });
    }
};
CX1405.init();