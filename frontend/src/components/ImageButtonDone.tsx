import { Image } from "@yamada-ui/react"

interface props {
  category_type_id:number;
  category_type_name:string;
}

export function ImageButtonDone(props:props) {
  const aryCategoryImage:string[] = ['/img_other.png', '/img_medicine.png', '/img_shopping.png', '/img_trash.png', '/img_mtg.png'];
  const imgSrc = aryCategoryImage[props.category_type_id - 1];

  return (
    <Image w={"88px"} h={"28px"} src={imgSrc} alt={props.category_type_name} />
  );
}