
import mongoose from 'mongoose';

const productCollection = 'Products';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users',
        default: null // Por defecto, el producto no tiene dueño (owner)
    }
});

export const productModel = mongoose.model(productCollection, productSchema);
