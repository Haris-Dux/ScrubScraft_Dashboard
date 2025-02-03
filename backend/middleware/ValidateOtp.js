
export const validateOneMinuteExpiry = async (timestamp) => {
    try {
     const currentTime = new Date();
     var difference = (timestamp - currentTime.getTime())/1000;
     difference /= 60;
     if(Math.abs(difference) > 1){
         return true;
     }
     return false;
    } catch (error) {
     res.status(401).json({message:error.message})
    }
 };
 
 export const validateOtp = async (timestamp) => {
     try {
      const currentTime = new Date();
      var difference = (timestamp - currentTime.getTime())/1000;
      difference /= 60;
      if(Math.abs(difference) > 15){
          return true;
      }
      return false;
     } catch (error) {
      res.status(401).json({message:error.message})
     }
  }