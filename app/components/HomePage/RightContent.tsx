"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductSlider from "./ProductSlider";
import TechnicalService from "./TechnicalService";

interface RightContentProps {
  isMobile: boolean;
  isIPhoneSE: boolean;
  isIPadPro: boolean;
  isIPadAir: boolean;
}

function RightContent({ isMobile, isIPhoneSE, isIPadPro, isIPadAir }: RightContentProps) {
  return (
    <>
      <TechnicalService isMobile={isMobile} isIPhoneSE={isIPhoneSE} isIPadPro={isIPadPro} isIPadAir={isIPadAir} />
      <ProductSlider isMobile={isMobile} isIPhoneSE={isIPhoneSE} isIPadPro={isIPadPro} isIPadAir={isIPadAir} />
    </>
  );
}

export default RightContent;
