import { PUBLIC_GOOGLE_CLIENT_ID, PUBLIC_ORIGIN } from '$env/static/public';

export const buildIcon = (icon) => (icon.match(/^fa/) ? icon : `fa fa-${icon}`);

export const buildImage = (uuid, { size, original } = {}) =>
	`https://ucarecdn.com/${uuid}/${
		original ? '' : size ? `-/scale_crop/${size}/center/` : `-/scale_crop/800x800/center/`
	}`;

export const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?scope=profile&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=${PUBLIC_ORIGIN}/profile/auth-success/&client_id=${PUBLIC_GOOGLE_CLIENT_ID}`;
