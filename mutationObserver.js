// let hasCalledRender = false;

// const renderButtonText = () => {
//     if (!hasCalledRender) {
//         optimizely.utils.waitUntil(() => {
//             return
//         })
//     }
// }

const config = { attributes: true, childList: true, subtree: true, attributeOldValue: true };

const callback = (mutationList, observer) => {
for (const mutation of mutationList) {
    // console.log("MUTATION ", mutation.type, mutation.target.attributes['data-testid'].value);
    if (mutation.type === "attributes" && mutation.target.attributes['data-testid'].value.includes("addToBag")) {
        console.log("button state changes")
        document.querySelector('[data-testid="pdpActionButton-addToBag-pvh-button"] span').textContent = "test"
    //     optimizely.utils.waitUntil(() => {
    //         return document.querySelector('[data-testid="pdpActionButton-addToBag-pvh-button"]');
    // })
    //     .then(() => {

    //         document.querySelector('[data-testid="pdpActionButton-addToBag-pvh-button"]').textContent = "test"
    //     })
    }
}
};

const target = document.querySelector('[data-testid*="pdpActionButton"]');
const observer = new MutationObserver(callback);
observer.observe(target, config);