
// exporting the replacetemplate function in a comman js module way (module.js)
module.exports = (template , product) => {
    let output = template.replace(/{@productname}/g, product.productName);
    output = output.replace(/{@image}/g, product.image);
    output = output.replace(/{@from}/g, product.from);
    output = output.replace(/{@nutrients}/g, product.nutrients);
    output = output.replace(/{@quantity}/g, product.quantity);
    output = output.replace(/{@price}/g, product.price);
    output = output.replace(/{@description}/g, product.description);
    output = output.replace(/{@id}/g, product.id);
    if(!product.organic) output = output.replace(/{@organic}/g, 'not-organic')
    // by now all the placeholders in the template will be replaced by the properties of the product object.
    return output
}