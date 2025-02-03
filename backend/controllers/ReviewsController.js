import { reviewsAndRatings } from "../models/ReviewsModel.js";
import { UserModel } from "../models/User.Model.js";
import { setMongoose } from "../utils/Mongoose.js";

export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) throw new Error("Review Id Not Found");
    await reviewsAndRatings.findByIdAndDelete(id);
    return res.status(201).json({ message: "Review deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;

    const reviewsData = await reviewsAndRatings
      .find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await reviewsAndRatings.countDocuments();
  
    const userIds = reviewsData.map((item) => item.userID);
    const userNames = await UserModel.find({ _id: { $in: userIds } });
    const userNamesMap = {};
    userNames.forEach(user => {
      userNamesMap[user._id] = user.name;
    });

    const reviewsWithNames = reviewsData.map(review => {
      const { _id, ...reviewWithoutId } = review.toObject();
      return {
          ...reviewWithoutId,
          id: review._id,
          name: userNamesMap[review.userID]
      };
  });
  const ratingCounts = await reviewsAndRatings.aggregate([
    {
      $group: {
        _id: '$rating',
        count: { $sum: 1 }
      }
    }
  ]);
  const ratingNumbers = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };
  ratingCounts.forEach(({ _id, count }) => {
    ratingNumbers[_id] = count;
  });

  const response = {
    totalPages: Math.ceil(total / limit),
    page,
    reviewsWithNames,
    totalReviews:total,
    ratings:ratingNumbers
  };
    setMongoose();
   
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({  error: error.message });
  }
};
