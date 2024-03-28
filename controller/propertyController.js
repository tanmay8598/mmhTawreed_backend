const asyncHandler = require("express-async-handler");
const { DeleteObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const Properties = require("../models/property/propertiesModel");

const config = {
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
};
const s3 = new S3Client(config);

const createProperty = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    image,
    location,
    details,
    price,
    type,
    propertyType,
    bathroom,
    rooms,
    size,

    status,
    propertyManager,
  } = req.body;

  const property = Properties.create({
    name,
    description,
    image,
    location: {
      type: "Point",
      coordinates: [location.lang, location.lat],
    },
    details,
    price,
    propertyType,
    bathroom,
    rooms,
    size,
    type,
    status,
    propertyManager,
  });
  if (property) {
    res.status(201).json(property);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});
const updateProperty = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    image,
    location,
    details,
    price,
    type,
    status,
    id,
  } = req.body;
  const property = await Properties.findById(id);
  if (property) {
    property.name = name;
    property.description = description;
    property.image = image ? image : property.image;
    property.status = status;
    property.type = type;
    property.details = details;
    property.price = price;
    property.location = location;

    const updatedProperty = await property.save();

    res.json(updatedProperty);
  } else {
    res.status(404);
    throw new Error("Property not found");
  }
});
const deleteProperty = asyncHandler(async (req, res) => {
  const subid = req.query.id;
  const sub = await Properties.findById(subid);

  const f1 = sub.image;

  f1.map(async (file) => {
    const fileName = file.split("//")[1].split("/")[1];

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: fileName,
    });
    const response = await s3.send(command);
  });

  await Properties.deleteOne({ _id: req.query.id });
  res.json("deleted");
});
const getAllProperties = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 30;
  const count = await Properties.countDocuments({});
  var pageCount = Math.floor(count / 20);
  if (count % 20 !== 0) {
    pageCount = pageCount + 1;
  }
  const products = await Properties.find({})
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .skip(pageSize * (page - 1))
    .populate("propertyManager");

  res.json({ products, pageCount });
});
const getActiveProperties = asyncHandler(async (req, res) => {
  const { type, status, price, min, max } = req.query;
  const minprice = price ? min : 0;
  const maxprice = price ? max : 2500000;
  const filter = {
    type,
    status,
    minprice,
    maxprice,
    rating: ratings,
  };
  const asArray = Object.entries(filter);
  const filtered = asArray.filter(([key, value]) => value);
  const justStrings = Object.fromEntries(filtered);
  const pageSize = 20;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Properties.countDocuments({
    $and: [
      justStrings,
      { sell_price: { $gte: minprice } },
      { sell_price: { $lte: maxprice } },
    ],
  });
  var pageCount = Math.floor(count / 20);
  if (count % 20 !== 0) {
    pageCount = pageCount + 1;
  }
  const products = await Properties.find({
    $and: [
      justStrings,
      { sell_price: { $gte: minprice } },
      { sell_price: { $lte: maxprice } },
    ],
  })
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .skip(pageSize * (page - 1))
    .populate("propertyManager");

  res.json({ products, pageCount });
});

const getPropertyById = asyncHandler(async (req, res) => {
  const product = await Properties.findById(req.query.propertyId).populate(
    "propertyManager"
  );
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Property not found");
  }
});
const getPropertyByType = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 30;
  const count = await Properties.countDocuments({});
  var pageCount = Math.floor(count / 20);
  if (count % 20 !== 0) {
    pageCount = pageCount + 1;
  }
  const product = await Properties.find({ type: req.query.type })
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .skip(pageSize * (page - 1))
    .populate("propertyManager");
  if (product) {
    res.json({ product, pageCount });
  } else {
    res.status(404);
    throw new Error("Property not found");
  }
});

const searchProperty = asyncHandler(async (req, res) => {
  const products = await Properties.aggregate([
    {
      $search: {
        index: "default",
        text: {
          query: req.query.Query,
          path: ["name", "details", "description"],
        },
      },
    },
  ]);

  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Property not found");
  }
});

module.exports = {
  createProperty,
  updateProperty,
  deleteProperty,
  getActiveProperties,
  getAllProperties,
  getPropertyById,
  searchProperty,
  getPropertyByType,
};
