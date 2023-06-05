import * as Yup from 'yup';

export const itemValidationSchema = Yup.object().shape({
	category: Yup.string().required(),
	name: Yup.string().required().max(100),
	description: Yup.string().max(12000),
	zoom: Yup.number().min(0).required(),
	latitude: Yup.number().min(0).required(),
	longitude: Yup.number().min(0).required()
});
