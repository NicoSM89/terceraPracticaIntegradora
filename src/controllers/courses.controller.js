import { courseService } from "../repositories/services.js";
import { productService } from "../repositories/services.js";

export const getAllCourses = async (req, res) => {
  let courses = await courseService.getAllCourses();
  res.send({ status: "success", payload: courses });
};

export const createCourse = async(req,res)=>{
    const {title,description} = req.body;
    let newCourse = {
        title,
        description,
        users:[],
        teacher:'sin asignar'
    }
    const result = await courseService.createCourse(newCourse);
    res.send({status:"success",payload:result});
}

export const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user._id; // ID del usuario que realiza la solicitud
  const newData = req.body; // Nuevos datos del producto a actualizar

  try {
      // Obtener el producto por ID
      const product = await productService.getProductById(productId);

      // Verificar si el usuario tiene permisos para modificar el producto
      if (product.owner.toString() !== userId.toString()) {
          return res.status(403).json({ status: "error", message: "No tienes permiso para modificar este producto" });
      }

      // Actualizar el producto
      const updatedProduct = await productService.updateProduct(productId, newData);

      return res.status(200).json({ status: "success", payload: updatedProduct });
  } catch (error) {
      return res.status(500).json({ status: "error", message: "Error al actualizar el producto", error: error });
  }
};

// Función para eliminar un producto
export const deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user._id; // ID del usuario que realiza la solicitud

  try {
      // Obtener el producto por ID
      const product = await productService.getProductById(productId);

      // Verificar si el usuario tiene permisos para eliminar el producto
      if (product.owner.toString() !== userId.toString()) {
          return res.status(403).json({ status: "error", message: "No tienes permiso para eliminar este producto" });
      }

      // Eliminar el producto
      await productService.deleteProduct(productId);

      return res.status(200).json({ status: "success", message: "Producto eliminado correctamente" });
  } catch (error) {
      return res.status(500).json({ status: "error", message: "Error al eliminar el producto", error: error });
  }
};