import { useState, useEffect } from 'react';
import { CountriesAPI, UniversitiesAPI, ExchangeUniversitiesAPI } from '@/apis';

/**
 * 회원가입 페이지용 드롭다운 목록 데이터를 관리하는 커스텀 훅
 * @description 본교, 파견국가, 파견학교 목록을 API에서 불러와 관리합니다.
 * @returns {Object} 드롭다운 데이터와 유틸리티 함수들
 */

export const useDropdownData = () => {
  // 목록 상태들
  const [univList, setUnivList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [exUnivList, setExUnivList] = useState([]);
  const [allExUnivs, setAllExUnivs] = useState([]); // 전체 파견학교 목록 저장

  const typeList = [
    { label: "교환학생", value: "EX" },
    { label: "방문학생", value: "VS" },
    { label: "기타", value: "OT" },
  ]

  // 초기 데이터 불러오기
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        // 모든 API를 병렬로 호출
        const [univRes, countryRes, exUnivRes] = await Promise.all([
          UniversitiesAPI.universities(),
          CountriesAPI.countries(),
          ExchangeUniversitiesAPI.exUniversities()
        ]);

        // 본교 목록 포맷팅
        const formattedUnivs = univRes.data
          .map(univ => ({
            label: univ.univ_name,
            value: univ.id
          }));
        setUnivList(formattedUnivs);

        // 파견 국가 목록 포맷팅
        const formattedCountries = countryRes.data
          .map(country => ({
            label: country.label,
            value: country.code
          }));
        setCountryList(formattedCountries);

        // 파견 학교 목록 저장
        setAllExUnivs(exUnivRes.data);
        
        // 초기에는 전체 파견학교 목록 표시
        const formattedExUnivs = exUnivRes.data.map(univ => ({
          label: univ.univ_name,
          value: univ.id
        }));
        setExUnivList(formattedExUnivs);

      } catch (err) {
        console.error("드롭다운 목록 불러오기 실패:", err);
      }
    };

    fetchDropdownData();
  }, []);

  // 국가별 파견학교 필터링 함수
  const filterExchangeUniversitiesByCountry = (countryValue) => {
    if (!countryValue) {
      // 국가 선택 안한 경우 전체 목록 표시
      const formattedExUnivs = allExUnivs.map(univ => ({
        label: univ.univ_name,
        value: univ.id
      }));
      setExUnivList(formattedExUnivs);
      return;
    }

    const countryCode = countryValue.value || countryValue; // 객체면 value 사용
    const filteredUnivs = allExUnivs
      .filter(univ => univ.country === countryCode)
      .map(univ => ({
        label: univ.univ_name,
        value: univ.id
      }));
    setExUnivList(filteredUnivs);
  };

  return {
    // 데이터
    univList,
    countryList,
    exUnivList,
    allExUnivs,
    typeList,
    // 유틸리티 함수
    filterExchangeUniversitiesByCountry
  };
};