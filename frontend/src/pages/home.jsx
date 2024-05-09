import { MultimediaElement } from "@/components/card/MultimediaElement";
import { useLoaderData } from "react-router-dom";

export function HomePage() {
  const backResponse = useLoaderData();

  return (
    <>
      {backResponse.data.data.map((mediaElement) => (
        <MultimediaElement key={mediaElement.id} content={mediaElement} />
      ))}
    </>
  );
}
