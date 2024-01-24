// const GoogleApiKey = "AIzaSyDiJX0uQ5h-TSNMgTfmHUkDtGoQjHJknT4";
const GoogleApiKey = "AIzaSyB6iXDkP_2aajctOaESnhRT8iPMVFnONRA";
export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GoogleApiKey}`;

  //   `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lang}&zoom=13&size=400x200&maptype=roadmap
  //     &markers=color:red%7Clabel:S%7C${lat},${lang}&key=${GoogleApiKey}`;
  return imagePreviewUrl;
}
export async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GoogleApiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch address");
  }
  const data = await response.json();
  console.log("data", data);
  // const address = data.results[0].formatted_address;
  // return address;
}
