import { RequestConfig, history, useModel } from "@umijs/max";
import { message } from "antd";
import AvartarNode from "./layouts/avartar";
import { FIELD_NAMES } from "./constants/locale";

export async function getInitialState(): Promise<any> {
  try {
    return {};
  } catch (error) {
    console.log(error);
  }

}

export const layout = () => {
  const { adminInfo } = useModel('global');

  const { pathname } = history.location;
  if (pathname !== "/login" && adminInfo?.valid_flg !== 1) {
    history.push('/login');
  }
  return {
    layout: 'mix',
    avatarProps: {
      src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      size: 'small',
      render: (props: any, dom: any) => <AvartarNode avartarDom={dom} />
    },
    logo: require('@/assets/logo.png'),
    menu: {
      locale: false,
    },
    title: '',
    defaultCollapsed: false,
    pure: pathname === "/login" && true
  };
};


export const request: RequestConfig = {
  // timeout: 1000,
  errorConfig: {
    errorHandler: (error: any, otps: any) => {
      if (error.response) {
        let errorMessageArr;
        let errorMessageStr = '';
        if (typeof error.response?.data?.message === 'string') {
          errorMessageArr = [error.response?.data?.message]
        } else if (error.response?.data?.message instanceof Array) errorMessageArr = error.response?.data?.message;
        if (errorMessageArr.length > 0) {
          errorMessageArr.forEach((item: string) => {
            const itemArr = item.split(' ');
            const field = FIELD_NAMES.find(i => i.key === itemArr[0]);
            if (field && itemArr[1] === 'must' && itemArr[2] === 'be') {
              errorMessageStr += `${errorMessageStr ? ', ' + field.ja : field.ja} `;
            }
          });
          if (errorMessageStr.length > 0) {
            message.error(`${errorMessageStr}を確認ください！`)
          } else {
            message.error(errorMessageArr)
          };
        }
      } else if (error.request) {
        message.error("None response! Please retry.");
      }
    },
    errorThrower() {
    }
  },
  requestInterceptors: [],
  responseInterceptors: []
};