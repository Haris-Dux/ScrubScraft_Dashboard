import { ProductsModel } from "../models/Products.Model.js";
import { verifyrequiredparams } from "../utils/Common.js";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "../utils/Firebase.js";
import { setMongoose } from "../utils/Mongoose.js";

export const addProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      sale_price,
      product_code,
      category,
      latest,
      trouserOptions
    } = req.body;

    const colors = JSON.parse(req.body.colors);
    const fabric_type = JSON.parse(req.body.fabric_type).map(item => ({
      ...item,
      price: parseFloat(item.price) || 0 
    }));
    const sizes = JSON.parse(req.body.sizes);

    await verifyrequiredparams(req.body, [
      "name",
      "description",
      "price",
      "sale_price",
      "product_code",
      "category",
      "colors",
      "sizes",
      "fabric_type",
      "latest",
    ]);

    if(trouserOptions){
      trouserOptions.forEach((item) => {
        const {name,price} = item;
        if(!name || !price) {
          throw new Error(`${name} trouser option must have a price`);
        }
      })
    }

    if (parseFloat(price) <= 0) {
      throw new Error("Price must be greater than 0");
    }
    if (parseFloat(sale_price) && parseFloat(sale_price) < 0) {
      throw new Error("Sale price must be 0 or greater");
    }
    if (parseFloat(sale_price) >= parseFloat(price)) {
      throw new Error("Sale price must be less than the original price");
    }
    if (parseFloat(sale_price) <= 0 && parseFloat(price) <= 0) {
      throw new Error("Both Sale price and Price cannot be 0");
    }

    const { primary, image2, image3, image4 } = req.files;
    if (!primary) throw new Error("Please provide a primary file");
    if (!image2) throw new Error("Please provide a file2 file");
    if (!image3) throw new Error("Please provide a file3 file");
    if (!image4) throw new Error("Please provide a file4 file");
    const uploadPromises = [
      uploadImageToFirebase(primary[0], "Scrub Images"),
      uploadImageToFirebase(image2[0], "Scrub Images"),
      uploadImageToFirebase(image3[0], "Scrub Images"),
      uploadImageToFirebase(image4[0], "Scrub Images"),
    ];
    const results = await Promise.all(uploadPromises);
    const imageData = results.map((result) => ({
      downloadURL: result.downloadURL,
      name: result.name,
      type: result.type,
    }));

    await ProductsModel.create({
      name,
      description,
      price,
      images: {
        primary: imageData[0],
        image2: imageData[1],
        image3: imageData[2],
        image4: imageData[3],
      },
      category,
      sale_price,
      latest,
      product_code,
      colors,
      sizes,
      fabric_type,
      trouserOptions
    });

    return res.status(200).json({success: true, message: "Product Added Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const {
      name,
      productId,
      description,
      price,
      sale_price,
      product_code,
      category,
      latest,
      colors,
      fabric_type,
      sizes
    } = req.body;


    const product = await ProductsModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    if (parseFloat(price) <= 0) {
      throw new Error("Price must be greater than 0");
    }
    if (parseFloat(sale_price) && parseFloat(sale_price) < 0) {
      throw new Error("Sale price must be 0 or greater");
    }
    if (parseFloat(sale_price) >= parseFloat(product.price)) {
      throw new Error("Sale price must be less than the original price");
    }
    if (parseFloat(sale_price) <= 0 && parseFloat(price) <= 0) {
      throw new Error("Both Sale price and Price cannot be 0");
    }

    let updateQuery = {};

    if (name) {
      updateQuery = { ...updateQuery, name };
    }
    if (description) {
      updateQuery = { ...updateQuery, description };
    }
    if (price) {
      updateQuery = { ...updateQuery, price };
    }
    if (sale_price) {
      updateQuery = { ...updateQuery, sale_price };
    }
    if (product_code) {
      updateQuery = { ...updateQuery, product_code };
    }
    if (category) {
      updateQuery = { ...updateQuery, category };
    }

    if (colors) {
      const data = JSON.parse(colors);
      updateQuery = { ...updateQuery, colors:data };
    }
    if (sizes) {
      const data = JSON.parse(sizes);
      updateQuery = { ...updateQuery, sizes:data };
    }
    if (fabric_type) {
      const data = JSON.parse(fabric_type);
      updateQuery = { ...updateQuery, fabric_type:data };
    }
  
    if (latest !== undefined) {
      const latestBoolean = latest === "true" ? true : false;
      updateQuery = { ...updateQuery, latest:latestBoolean };
    }

    let deletePromises = [];
    let imageData = { ...product.images };
    const { primary, image2, image3, image4 } = req.files;
    if (primary || image2 || image3 || image4) {
      const uploadPromises = [
        primary ? uploadImageToFirebase(primary[0], "Scrub Images") : null,
        image2 ? uploadImageToFirebase(image2[0], "Scrub Images") : null,
        image3 ? uploadImageToFirebase(image3[0], "Scrub Images") : null,
        image4 ? uploadImageToFirebase(image4[0], "Scrub Images") : null,
      ];

      const results = await Promise.all(uploadPromises);

      if (primary) {
        const primaryResult = results[0];
        if (primaryResult) {
          imageData.primary = {
            downloadURL: primaryResult.downloadURL,
            name: primaryResult.name,
            type: primaryResult.type,
          };
          if (
            primaryResult.downloadURL !== product.images.primary.downloadURL
          ) {
            deletePromises.push(
              deleteImageFromFirebase(product.images.primary.downloadURL)
            );
          }
        }
      };

      if (image2) {
        const image2Result = results[1];
        if (image2Result) {
          imageData.image2 = {
            downloadURL: image2Result.downloadURL,
            name: image2Result.name,
            type: image2Result.type,
          };
          if (image2Result.downloadURL !== product.images.image2.downloadURL) {
            deletePromises.push(
              deleteImageFromFirebase(product.images.image2.downloadURL)
            );
          }
        }
      };

      if (image3) {
        const image3Result = results[2];
        if (image3Result) {
          imageData.image3 = {
            downloadURL: image3Result.downloadURL,
            name: image3Result.name,
            type: image3Result.type,
          };
          if (image3Result.downloadURL !== product.images.image3.downloadURL) {
            deletePromises.push(
              deleteImageFromFirebase(product.images.image3.downloadURL)
            );
          }
        }
      };

      if (image4) {
        const image4Result = results[3];
        if (image4Result) {
          imageData.image4 = {
            downloadURL: image4Result.downloadURL,
            name: image4Result.name,
            type: image4Result.type,
          };
          if (image4Result.downloadURL !== product.images.image4.downloadURL) {
            deletePromises.push(
              deleteImageFromFirebase(product.images.image4.downloadURL)
            );
          }
        }
      };

      await Promise.all(deletePromises);

      updateQuery.images = imageData;
    }

    if (Object.keys(updateQuery).length === 0)
      throw new Error("No fileds Updated");
    await ProductsModel.findByIdAndUpdate({ _id: productId }, updateQuery);
    return res.status(200).json({ success: true, message: "Product Updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) throw new Error("Product Id not Found");
    const product = await ProductsModel.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    let deletePromises = [];
    deletePromises.push(
      deleteImageFromFirebase(product.images.primary.downloadURL)
    );
    deletePromises.push(
      deleteImageFromFirebase(product.images.image2.downloadURL)
    );
    deletePromises.push(
      deleteImageFromFirebase(product.images.image3.downloadURL)
    );
    deletePromises.push(
      deleteImageFromFirebase(product.images.image4.downloadURL)
    );
    await Promise.all(deletePromises);
    await ProductsModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Deleted Succesfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res, next) => {       
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 30;
    let name = req.query.name || "";
    let category = req.query.category || "All";
    let color = req.query.color || "";
    let size = req.query.size || ""
    let fabric_type = req.query.fabric_type || "";
   
 
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    };
  
    if (category !== "All") {
      query.category = category;
    };
    if (color) {
      query['colors.label'] = {$in:color} ;
    };
    if (size) {
      query.sizes = {$in:size} ; 
    };
    if (fabric_type) {
      query.fabric_type = {$in:fabric_type};
    };


    const productData = await ProductsModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await ProductsModel.countDocuments(query);
   

    const response = {
      totalPages: Math.ceil(total / limit),
      page,
      productData: productData,
    };
    setMongoose();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) throw new Error("Product Id Required");
    const product = await ProductsModel.findById(id);
    setMongoose();
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
