import { useGoPlus } from "@hooks/useGoPlus";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InputWithButton from "@components/Input";
import ScoreDisplay from "@components/ScoreDisplay";

import { ReactComponent as Twitter } from "@svg/twitter.svg";
import { ReactComponent as Discord } from "@svg/discord.svg";
import { ReactComponent as Globe } from "@svg/globe.svg";
const NFT = () => {
  const { getNftInfo } = useGoPlus();
  const [nftInfo, setNftInfo] = useState<any>(null);
  const [score, setScore] = useState<number>(0);
  const [scanner, setScanner] = useState<string>(
    "https://etherscan.io/address"
  );

  const [holderScore, setHolderScore] = useState<number>(0);
  const [verificationScore, setVerificationScore] = useState<number>(0);
  const [socialScore, setSocialScore] = useState<number>(0);
  const [technicalScore, setTechnicalScore] = useState<number>(0);
  const [scamScore, setScamScore] = useState<number>(0);

  const { address } = useParams();
  useEffect(() => {
    if (address) {
      getNftInfo("1", address).then((res) => {
        if (res === null) {
          alert("Invalid address");
          window.location.href = "/";
        }
        setNftInfo(res);
      });
    }
  }, [address]);

  useEffect(() => {
    setScore(
      holderScore +
        verificationScore +
        socialScore +
        technicalScore +
        (20 - scamScore)
    );
  }, [
    address,
    holderScore,
    verificationScore,
    socialScore,
    technicalScore,
    scamScore,
  ]);

  useEffect(() => {
    if (nftInfo) {
      setHolderScore(
        parseInt((nftInfo?.nft_owner_number / nftInfo?.nft_items) * 20 + "") %
          20
      );
      setVerificationScore(nftInfo.nft_verified * 20);
      let socialScore = 0;
      if (nftInfo?.discord_url) socialScore += 4;
      if (nftInfo?.twitter_url) socialScore += 4;
      if (nftInfo?.website_url) socialScore += 4;
      if (nftInfo?.medium_url) socialScore += 4;
      if (nftInfo?.github_url) socialScore += 4;
      setSocialScore(parseInt(socialScore + ""));

      let technicalScore = 0;
      if (nftInfo?.github_url) technicalScore += 5;
      if (!nftInfo?.oversupply_minting) technicalScore += 5;
      if (nftInfo?.metadata_frozen) technicalScore += 5;
      if (nftInfo?.restricted_approval === 0) technicalScore += 5;

      setTechnicalScore(technicalScore);

      let scamScore = 0;
      if (nftInfo?.malicious_nft_contract === 1) scamScore += 5;
      if (nftInfo?.privileged_burn.value === 1) scamScore += 5;
      if (nftInfo?.privileged_minting.value === 1) scamScore += 5;
      if (nftInfo?.transfer_without_approval.value === 1) scamScore += 5;

      setScamScore(scamScore);
    }
  }, [nftInfo]);

  return (
    <div className="w-full h-screen bg-[#3396FF] bg-opacity-10 relative overflow-auto">
      {!nftInfo && (
        <div className="absolute w-full h-screen bg-gray-300 bg-opacity-60">
          <svg
            aria-hidden="true"
            className="w-32 h-32 text-white animate-spin fill-blue-600 mx-auto my-64"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <div className="w-1/2 flex mx-auto flex-col">
        {/*<div className="text-center font-bold text-2xl">
          Type in address & Check your score!
        </div>
        <div className="text-center font-bold text-2xl">Want to try?</div>
        <InputWithButton
          buttonText="Submit"
          onButtonClick={async (value: any) => {
            const res = await getNftInfo("1", value);
            setNftInfo(res);
            setScore(90);
          }}
        />*/}
        {true && (
          <div className="flex mx-auto flex-col font-kanit">
            <div className="text-center text-3xl font-bold my-5">NFT Score</div>
            <ScoreDisplay score={score} />
            <div className="mx-auto py-5">
              <div className="text-center font-bold text-4xl">
                {nftInfo?.nft_name}
              </div>
              {nftInfo?.creator_address && (
                <a
                  href={`${scanner}/${nftInfo?.creator_address}`}
                  className="text-blue-800 underline mx-auto text-center"
                >
                  Who created this NFT?
                </a>
              )}
              <div className="flex flex-row gap-3 justify-center py-3">
                {nftInfo?.twitter_url && (
                  <a href={nftInfo?.twitter_url} target="_blank">
                    <Twitter className="w-8 h-8" />
                  </a>
                )}
                {nftInfo?.discord_url && (
                  <a href={nftInfo?.discord_url} target="_blank">
                    <Discord className="w-8 h-8" />
                  </a>
                )}
                {nftInfo?.website_url && (
                  <a href={nftInfo?.website_url} target="_blank">
                    <Globe className="w-8 h-8" />
                  </a>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5 w-96">
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <div className="font-bold">Holder Score</div>
                  <div className="ml-auto">{holderScore} / 20</div>
                </div>
                <div className="relative">
                  <div className="absolute w-full h-4 bg-yellow-300 rounded-[1000px]" />
                  <div
                    className={`relative w-[${
                      holderScore * 5
                    }%] h-4 bg-green-300 rounded-[1000px] z-20`}
                  />
                </div>
                <div className="py-3">
                  High holder score means that this NFT Contract is
                  decentralized!
                  <br />
                  Higher unique holders increases Holder score of this NFT.
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <div className="font-bold">Verification Score</div>
                  <div className="ml-auto">{verificationScore} / 20</div>
                </div>
                <div className="relative">
                  <div className="absolute w-full h-4 bg-yellow-300 rounded-[1000px]" />
                  <div
                    className={`relative w-[${
                      verificationScore * 5
                    }%] h-4 bg-green-300 rounded-[1000px] z-20`}
                  />
                </div>
                <div className="py-3">
                  Verification score means that this NFT is verified by GoPlus!
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <div className="font-bold">Social Score</div>
                  <div className="ml-auto">{socialScore} / 20</div>
                </div>
                <div className="relative">
                  <div className="absolute w-full h-4 bg-yellow-300 rounded-[1000px]" />
                  <div
                    className={`relative w-[${
                      socialScore * 5
                    }%] h-4 bg-green-300 rounded-[1000px] z-20`}
                  />
                </div>
                <div className="py-3">
                  Social score means that this NFT is socially active. <br />
                  we consider twitter, discord and website for social score.
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <div className="font-bold">Technical Score</div>
                  <div className="ml-auto">{technicalScore} / 20</div>
                </div>
                <div className="relative">
                  <div className="absolute w-full h-4 bg-yellow-300 rounded-[1000px]" />
                  <div
                    className={`relative w-[${
                      technicalScore * 5
                    }%] h-4 bg-green-300 rounded-[1000px] z-20`}
                  />
                </div>
                <div className="py-3">
                  Technical score means that this NFT is technically active.
                  <br />
                  we consider github stats and open source status.
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <div className="font-bold">Safe Score</div>
                  <div className="ml-auto">{20 - scamScore} / 20</div>
                </div>
                <div className="relative">
                  <div className="absolute w-full h-4 bg-yellow-300 rounded-[1000px]" />
                  <div
                    className={`relative w-[${
                      (20 - scamScore) * 5
                    }%] h-4 bg-green-300 rounded-[1000px] z-20`}
                  />
                </div>
                <div className="py-3">
                  Safe score considers that NFT does not have code that can
                  handle the user's asset in a malicious way.
                  <br />
                  We consider if the code has permissionless transfer or burn
                  contract
                </div>
              </div>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFT;
