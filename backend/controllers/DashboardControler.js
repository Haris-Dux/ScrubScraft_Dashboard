import { OrdersModel } from "../models/OrdersModel.js";
import { ProductsModel } from "../models/Products.Model.js";
import { stringify } from 'csv-stringify';


export const getPercentageOfOrderProgress = async (req, res, next) => {
  try {
    const ordersData = await OrdersModel.find({});
    if (!ordersData || ordersData.length === 0)
      throw new Error("No Orders Data");
    const statusCount = {
      Pending: 0,
      Delivered: 0,
      Dispatched: 0,
      Cancelled: 0,
    };
    ordersData.forEach((orders) => {
      const progress = orders.orderProgress;
      if (statusCount[progress] !== undefined) {
        statusCount[progress] += 1;
      }
    });
    const totalOrders = ordersData.length;

    const statusPercentage = {
      Pending: Math.round((statusCount.Pending / totalOrders) * 100 * 10) / 10,
      Delivered:
        Math.round((statusCount.Delivered / totalOrders) * 100 * 10) / 10,
      Dispatched:
        Math.round((statusCount.Dispatched / totalOrders) * 100 * 10) / 10,
      Cancelled:
        Math.round((statusCount.Cancelled / totalOrders) * 100 * 10) / 10,
    };

    return res.status(200).json(statusPercentage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSalesStatistics = async (req, res, next) => {
  try {
    // Step 1: Retrieve all orders from the database
    const ordersData = await OrdersModel.find({ orderProgress: "Delivered" });
    if (!ordersData || ordersData.length === 0) {
      throw new Error("No Orders Data");
    }

    // Step 2: Calculate total sales
    const totalSales = ordersData.reduce(
      (acc, order) => acc + order.totalAmount,
      0
    );

    // Step 3: Calculate sales for different time periods (e.g., last month vs. current month)
    const currentDate = new Date();
    const lastMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const currentMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    const lastMonthSales = ordersData
      .filter(
        (order) =>
          new Date(order.createdAt) >= lastMonthDate &&
          new Date(order.createdAt) < currentMonthDate
      )
      .reduce((acc, order) => acc + order.totalAmount, 0);

    const currentMonthSales = ordersData
      .filter((order) => new Date(order.createdAt) >= currentMonthDate)
      .reduce((acc, order) => acc + order.totalAmount, 0);

    // Step 4: Calculate percentage increase or decrease in sales
    const salesDifference = currentMonthSales - lastMonthSales;
    const sign = salesDifference > 0 ? "+" : salesDifference < 0 ? "-" : "";
    const formattedDifference = `${sign}${salesDifference}`;

    // Step 5: Return the calculated statistics as a response
    const salesStatistics = {
      totalSales,
      lastMonthSales,
      currentMonthSales,
      salesDifference: formattedDifference,
    };

    res.status(200).json(salesStatistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMonthlyOrdersDifference = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const startOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const TotalOrders = await OrdersModel.countDocuments();
      const currentMonthOrders = await OrdersModel.countDocuments({
      createdAt: { $gte: startOfCurrentMonth, $lt: currentDate }
    });

    res.status(200).json({
      currentMonthOrders,
      TotalOrders
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderCountsByMonth = async (req, res, next) => {
  try {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

  
    const orderCounts = await OrdersModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfYear, $lte: endOfYear }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      }
    ]);

    const countsByMonth = {};
    orderCounts.forEach(item => {
      countsByMonth[item._id] = item.count;
    });

    for (let i = 1; i <= 12; i++) {
      if (!countsByMonth[i]) {
        countsByMonth[i] = 0;
      }
    };
    res.status(200).json(countsByMonth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const downloadProductsCsvFile = async (req, res, next) => {
try {
  const productsData = await ProductsModel.find();

  if (!productsData.length) {
    throw new Error("No products data")
  };

   const formattedData = productsData.map(p => ({
    id:p._id.toString(),
    title: p.name,
    description: p.description,
    availability:'In Stock',
    price:p.sale_price > 0 ? p.sale_price : p.price,
    image_link:p.images.primary.downloadURL,
    google_product_category:'Apparel & Accessories > Clothing',
    fb_product_category:'Clothing & Accessories > Clothing',
    quantity_to_sell_on_facebook:1000,
    condition :"new",
    link:"https://scrubscraft.shop/products"
   
  }));

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');

  stringify(formattedData, {
    header: true,
    columns: [
      { key: 'id', header: 'id' },
      { key: 'title', header: 'title' },
      { key: 'description', header: 'description' },
      { key: 'availability', header: 'availability' },
      { key: 'price', header: 'price' },
      { key: 'image_link', header: 'image_link' },
      { key: 'google_product_category', header: 'google_product_category' },
      { key: 'fb_product_category', header: 'fb_product_category' },
      { key: 'quantity_to_sell_on_facebook', header: 'quantity_to_sell_on_facebook1' },
      { key: 'link', header: 'link' },
      { key: 'condition', header: 'condition' },


    ],
  }).pipe(res);

  
} catch (error) {
  return res.status(400).json({error:error.message})
}
}