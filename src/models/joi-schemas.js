import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };
  
  export const DetailSpec = Joi.object({
    _id: Joi.string().required(),
    locationid: Joi.string().required(),
    title: Joi.string().required(),
    postcode: Joi.string().allow('').optional(),
    latitude: Joi.number().min(-90).max(90).when('postcode', { is: '', then: Joi.required(), otherwise: Joi.allow(null) }),
    longitude: Joi.number().min(-180).max(180).when('postcode', { is: '', then: Joi.required(), otherwise: Joi.allow(null) }),
    distance: Joi.string().valid('<1km', '1-3km', '3-5km', '5-8km', '8-10km', '10-13km', '13-15km', '>15km').required(),
    duration: Joi.string().valid('<1hr', '1-2hrs', '2-3hrs', '3-4hrs', '4-5hrs', '5-6hrs', '>6hrs').required()
    });
  
  
    export const LocationSpec = Joi.object({
      _id: Joi.string().required(), 
      title: Joi.string().required(),
      userid: Joi.string().optional(), 
      imagePath: Joi.string().default('images/default.jpg'),
      isSetLocation: Joi.boolean().default(true),
      description: Joi.string().optional()
    });
  