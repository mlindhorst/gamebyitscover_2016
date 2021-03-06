var factoryTextures = ["resources/Levels/Facility/FacilityBG.png"];
var mountainTextures = ["resources/Levels/Mountains/MountainsBG_01.png", "resources/Levels/Mountains/MountainsBG_02.png"];
var skyTextures = ["resources/Levels/Sky/AirBG_Sky.png"];
var waterTextures = ["resources/Levels/Water/WaterBG_Flattened.png"];
var cityTextures = ["resources/Levels/City/CityBG_01.png", "resources/Levels/City/CityBG_02.png", "resources/Levels/City/CityBG_03.png"];
 
function clearTextureCache(level){
	if(level == "factory")
					toDestroy = factoryTextures;
	else if(level == "mountain")
					toDestroy = mountainTextures;
	else if(level == "sky")
					toDestroy = skyTextures;
	else if (level == "water")
					toDestroy = waterTextures;
	else if (level == "city")
					toDestroy = cityTextures;

	for (i = 0; i < toDestroy.length; i++) {
					delete PIXI.utils.BaseTextureCache[toDestroy[i]];
	}
   
	for (i = 0; i < toDestroy.length; i++) {
					delete PIXI.utils.TextureCache[toDestroy[i]];
	}
}