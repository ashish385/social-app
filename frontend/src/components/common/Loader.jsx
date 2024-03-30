import React from "react";
import styles from "./style.module.css";

const Loader = () => {
  return (
    <div className=" w-full h-screen flex flex-col justify-center items-center bg-black opacity-50  ">
      <span className={styles.loader}></span>
      <p className=" text-white mt-3 font-semibold">Loading...</p>
    </div>
  );
};

export default Loader;
