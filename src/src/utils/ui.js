export const buildIcon = (icon) => (icon.match(/^fa/) ? icon : `fa fa-${icon}`);

export const buildImage = (uuid, { size, original } = {}) =>
	`https://ucarecdn.com/${uuid}/${
		original ? '' : size ? `-/scale_crop/${size}/center/` : `-/scale_crop/800x800/center/`
	}`;
