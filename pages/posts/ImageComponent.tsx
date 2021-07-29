import Image from "next/image";

const ImageComponent = ({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) => {
  return <Image src={src} width={width || "600"} height={height || "400"} />;
};
export default ImageComponent;
