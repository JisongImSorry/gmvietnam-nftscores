import { GoPlus, ErrorCode } from "goplus-sdk-js";
import { useEffect, useState } from "react";

export const useGoPlus = () => {
  const app_key = "mBOMg20QW11BbtyH4Zh0";
  const app_secret = "V6aRfxlPJwN3ViJSIFSCdxPvneajuJsh";

  const [supportedChains, setSupportedChains] = useState([]);
  console.log(supportedChains);

  useEffect(() => {
    let timeout = 30; // set global request timeout
    GoPlus.config(app_key, app_secret, timeout);

    let api_name = GoPlus.API_NAMES.address_security;
    GoPlus.supportedChains(api_name).then((ret) => {
      if (ret.code != ErrorCode.SUCCESS) {
        console.error(ret.message);
      } else {
        setSupportedChains(ret.result);
      }
    });
  }, []);

  const getAddressInfo = async (chainId, address) => {
    let ret = await GoPlus.addressSecurity(chainId, address);
    if (ret.code != ErrorCode.SUCCESS) {
      console.error(ret.message);
      return null;
    } else {
      console.log(ret.result);
      return ret.result;
    }
  };

  const getApprovalInfo = async (chainId, address) => {
    let ret = await GoPlus.approvalSecurity(chainId, address);
    if (ret.code != ErrorCode.SUCCESS) {
      console.error(ret.message);
      return null;
    } else {
      console.log(ret.result);
      return ret.result;
    }
  };

  const getNftInfo = async (chainId, address) => {
    let ret = await GoPlus.nftSecurity(chainId, address);
    if (ret.code != ErrorCode.SUCCESS) {
      console.error(ret.message);
      return null;
    } else {
      console.log(ret.result);
      return ret.result;
    }
  };

  const getdappInfo = async (url) => {
    let ret = await GoPlus.dappSecurity(url);
    if (ret.code != ErrorCode.SUCCESS) {
      console.error(ret.message);
      return null;
    } else {
      console.log(ret.result);
      return ret.result;
    }
  };

  const getPhishing = async (url) => {
    let ret = await GoPlus.phishingSite(url);

    if (ret.code != ErrorCode.SUCCESS) {
      console.error(ret.message);
      return null;
    } else {
      console.log(ret.result);
      return ret.result;
    }
  };

  return {
    supportedChains,
    getAddressInfo,
    getApprovalInfo,
    getNftInfo,
    getdappInfo,
    getPhishing,
  };
};
