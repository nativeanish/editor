import { Image } from "@nextui-org/react";
interface props {
  src: string;
  alt?: string;
}
function Img(props: props) {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={props.src}
        alt={props.alt}
        className="aspect-video w-full p-4 m-2"
      />
    </div>
  );
}

export default Img;
