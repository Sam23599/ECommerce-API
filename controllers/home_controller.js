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
    // req url should look like this - http://localhost:6200/products/create?product=Esla&quantity=16
    try {
        const product = req.query.product;
        const quantity = req.query.quantity;
        let newProduct = {};

        const existingProduct = await Product.findOne({ name: product });

        if (!product) {
            newProduct = await Product.create({
                name: 'Default',
                quantity: 1
            });
            message = 'No New Product Found. Creating Default Product';
        } else if (existingProduct) {
            newProduct = existingProduct;
            message = 'Product Already Existed. Returning Original Product';
        } else {
            newProduct = await Product.create({
                name: product,
                quantity: quantity,
            });
            message = 'New Product Created';
        }

        console.log(`Product '${newProduct.name}' Added Successfully`);

        return res.status(201).json({ success: true, message: message, product: newProduct });
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
    // req url should look like this - http://localhost:6200/products/659049c86c27b67a22575c3a/update_quantity?number=10
    try {
        const productId = req.params.id;
        const quantity = req.query.number;

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
        console.error(error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};