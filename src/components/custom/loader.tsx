import { Oval } from "react-loader-spinner";

export default function Loader({
  width,
  height,
  color,
  secondaryColor,
  strokeWidth
}:{
  width?:string,
  height?:string,
  color?:string,
  secondaryColor?:string,
  strokeWidth?:string,
}) {
  return (
    <Oval
      visible={true}
      height={height || "30"}
      width={width || "30"}
      color={color || "hsl(0 0% 100%)"}
      ariaLabel="oval-loading"
      secondaryColor="hsl(0 0% 93%)"
      wrapperStyle={{}}
      wrapperClass=""
      strokeWidth={strokeWidth || 3}
    />
  );
}
