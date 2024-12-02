"use client";

import GoogleIcon from "../../../public/socialMediaIcons/google.svg";
import XIcon from "../../../public/socialMediaIcons/x.svg";
import FacebookIcon from "../../../public/socialMediaIcons/facebook.svg";
import GithubIcon from "../../../public/socialMediaIcons/github.svg";
import IconWrapper from "../IconWrapper/IconWrapper";
import { signIn } from "next-auth/react";
import { useState } from "react";

const SocialLoginIcons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentProvider, setCurrentProvider] = useState("");

  const handleLogin = async (provider: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setCurrentProvider(provider);

    await signIn(provider, { callbackUrl: "/" }).then(() => {
      setIsLoading(false);
    });
  };

  const renderIcon = (provider: string, Icon: React.ReactNode) => {
    return isLoading && currentProvider === provider ? (
      <span className="text-sm">Loading...</span>
    ) : (
      Icon
    );
  };

  return (
    <div className="flex justify-between">
      <IconWrapper loading={isLoading} onClick={() => handleLogin("google")}>
        {renderIcon("google", <GoogleIcon />)}
      </IconWrapper>
      <IconWrapper loading={isLoading} onClick={() => handleLogin("twitter")}>
        {renderIcon("twitter", <XIcon />)}
      </IconWrapper>
      <IconWrapper loading={isLoading} onClick={() => handleLogin("facebook")}>
        {renderIcon("facebook", <FacebookIcon />)}
      </IconWrapper>
      <IconWrapper loading={isLoading} onClick={() => handleLogin("github")}>
        {renderIcon("github", <GithubIcon />)}
      </IconWrapper>
    </div>
  );
};

export default SocialLoginIcons;
