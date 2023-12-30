const Product = require('../models/product');


module.exports.productsList = async function (req, res) {
    try {
        const products = await Product.find({});
        return res.status(200).json({ products }); // Send products in the response
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' }); // Handle errors appropriately
    }
};


module.exports.createNewProduct = async function (req, res) {
    try {
        const newProduct = await Product.create({
            name: 'laptop',
            quantity: 10
        });

        console.log(`Product '${newProduct.name}' Added Successfully`);

        return res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};



module.exports.deleteProduct = async function (req, res) {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({ _id: productId });
        if (!product) throw "No such product exists.";
        await product.deleteOne({})

        console.log(`Deleted ${product.name} Successfully`)

        return res.status(200).json({ success: true, message: `Deleted ${product.name} successfully.` });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}



module.exports.updateProduct = async function (req, res) {
    try {
        const productId = req.params.id;
        const quantity = req.params.number;
        
        const product = await Product.findOneAndUpdate(
            { _id: productId },
            { quantity: quantity },
            { new: true } 
        );

        if (!product) {
            return res.status(404).json({ success: false, error: "No such product exists." });
        }

        return res.status(200).json({ success: true, message: `Updated quantity successfully.`, product });
    } catch (error) {
        // Handle errors and send an appropriate error response
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};