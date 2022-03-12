import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { message } from 'antd';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */


// guest path list 
const guestPath = [  //pages(first level)  without authoritation  for guests...
  { path: '/homePage' },
  { path: '/' },
  { path: loginPath }
]
const thisPathDontNeedLogin = (path) => {

  // map() return a new list 
  for (var i = 0; i < guestPath.length; i++) {
    let pathStr = path.split('/')
    let guestPStr = guestPath[i].path.split('/')
    console.log(pathStr,guestPStr)
    if (pathStr[1] === guestPStr[1]) {
      return true
    }
  }
  return false
}

export async function getInitialState() {

  const fetchUserInfo = async () => {

    const msg = await queryCurrentUser();

    return msg.data;
  }

  const currentUser = await fetchUserInfo();
  return {
    fetchUserInfo,
    currentUser,
    settings: {},
  };
}
// ProLayout 支持的api https://procomponents.ant.design/components/layout

export const layout = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      // content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login
      console.log('page changing')
      console.log(initialState)
      console.log(location.pathname)
      console.log(!initialState?.currentUser?.isLogin)
      console.log(location.pathname !== loginPath)
      console.log('this path dont need a login',thisPathDontNeedLogin(location.pathname))

      if (!initialState?.currentUser?.isLogin  && !thisPathDontNeedLogin(location.pathname)) {
        console.log('user didnt login')
        message.error('Please login first !!!')
        history.push(loginPath);
      }
    },
    links: isDev
      ? []
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
    layout: 'top',
  };
};




import { notification } from 'antd';
import { extend } from 'umi-request';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });

  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};

const request = extend({
  errorHandler,
  credentials: 'include',
})


request.interceptors.request.use((url, options) => {
  const url_str = url.split('/')
  // console.log(url_str[3])
  // console.log(url_str[4])
  if (url_str[3] == 'users' && url_str[4] == 'signin') {
    console.log('user sign in!!!')
    return {
      url: url,
      options: { ...options }
    }
  } else {
    // request with cookies except the login in request
    return {
      url: url,
      options: {
        ...options,
        headers: {
          Authorization: 'Bearer'
        },
        credentials: 'include',
      }
    }
  }

})