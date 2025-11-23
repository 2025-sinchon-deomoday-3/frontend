import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileAPI } from '@/apis';

/**
 * 프로필 유저 정보 데이터를 조회하는 커스텀 훅
 * @description 프로필 유저 정보 데이터를 API에서 불러와 관리합니다.
 * @returns {Object} 유저 데이터
 */
export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setProfile(null);
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await ProfileAPI.getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error("프로필 조회 에러:", err);
        // 인증 에러일 경우 로그인 페이지로 이동
        if (err?.detail?.includes('자격 인증데이터') || err?.response?.status === 401) {
          alert("로그인이 필요한 기능입니다");
          navigate('/login');
          return;
        }
        alert("프로필 조회를 실패했습니다.");
      }
    };
    fetchProfile();
  }, [navigate]);

  return { profile, setProfile };
};