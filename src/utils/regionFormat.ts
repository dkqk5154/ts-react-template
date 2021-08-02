import { RegionLabelProps } from 'config/region';

export interface SelectAddressCity {
	city: string;
	label: RegionLabelProps;
}

export const selectAddressCity = (address?: string) => {
	let userLocation = { city: 'seoulAndGyeonggiDo', label: '서울경기' };
	if (address?.split('서울').length >= 2) {
		userLocation.city = 'seoulAndGyeonggiDo';
		userLocation.label = '서울경기';
	} else if (address?.split('경기').length >= 2) {
		userLocation.city = 'seoulAndGyeonggiDo';
		userLocation.label = '서울경기';
	} else if (address?.split('충남').length >= 2) {
		userLocation.city = 'chungnam';
		userLocation.label = '충남';
	} else if (address?.split('전북').length >= 2) {
		userLocation.city = 'jeonbuk';
		userLocation.label = '전북';
	} else if (address?.split('전남').length >= 2) {
		userLocation.city = 'jeonnam';
		userLocation.label = '전남';
	} else if (address?.split('강원').length >= 2) {
		userLocation.city = 'gangwon';
		userLocation.label = '강원';
	} else if (address?.split('충북').length >= 2) {
		userLocation.city = 'chungbuk';
		userLocation.label = '충북';
	} else if (address?.split('경북').length >= 2) {
		userLocation.city = 'gyeongbuk';
		userLocation.label = '경북';
	} else if (address?.split('경남').length >= 2) {
		userLocation.city = 'gyeongnam';
		userLocation.label = '경남';
	} else if (address?.split('제주').length >= 2) {
		userLocation.city = 'jeju';
		userLocation.label = '제주';
	}
	return userLocation as SelectAddressCity;
};
