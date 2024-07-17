import { DEFAULT_NAME } from '@/constants';
import { verifyAdminInfoToken } from '@/services/admin-infos/AdminInfosController';
import { useEffect, useState } from 'react';

export default () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);

  const [adminInfo, setAdminInfo] = useState<AdminInfosAPI.AdminInfoVerify>();
  const [adminInfoFull, setAdminInfoFull] = useState<AdminInfosAPI.AdminInfo>({});
  const token = localStorage.getItem("adminInfoToken") || '';
  useEffect(() => {
    if (token) {
      (
        async () => {
          const res = await verifyAdminInfoToken({ token });
          if (res?.valid_flg === 1) setAdminInfo(res);
        }
      )()
    }
  }, []);

  const setAdminInfoToken = (token: string) => {
    localStorage.setItem('adminInfoToken', token)
  };
  const removeAdminInfoToken = () => localStorage.removeItem('adminInfoToken');
  return {
    name,
    setName,
    adminInfo,
    adminInfoFull,
    setAdminInfoFull,
    setAdminInfoToken,
    removeAdminInfoToken,
  };
};
