import { useContext, useEffect, useState } from "react";

export const useUser = () => {
  const [chain, setChain] = useState<string>("Ethereum");
  const [id, setId] = useState<number>(1);
  return {
    chain,
    id,
    setId,
    setChain,
  };
};
