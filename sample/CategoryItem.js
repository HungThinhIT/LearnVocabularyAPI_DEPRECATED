var categoryDefaultObject = function(){
    const cardItem = [{description: "Default card", frontFace: "This is front-face", backFace: "And this is back-face"}]
    return [{name: "Default", isPublic: 0, cards: cardItem}]
}

module.exports = categoryDefaultObject;