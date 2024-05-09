import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function MultimediaElement({ content }) {
  console.log(content);

  const mediaToShow = () => {
    if (content.content.url.includes("cloudinary"))
      return <img src={content.content.url} />;
    return (
      <iframe
        width="560"
        height="315"
        src={content.content.url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    );
  };

  return (
    <Card className="w-min">
      <CardHeader>
        <CardTitle>{content.text}</CardTitle>
      </CardHeader>
      <CardContent>{mediaToShow()}</CardContent>
      <CardFooter>
        <p>{content.thematic.name}</p>
      </CardFooter>
    </Card>
  );
}
