import { useContext, useEffect, useState } from "react";

export const useUser = () => {
  const [chain, setChain] = useState<string>("Ethereum");
  const [id, setId] = useState<number>(0);
  return {
    chain,
    id,
    setId,
    setChain,
  };
};
